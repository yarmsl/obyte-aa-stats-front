/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Client } from 'obyte';
import { isEmpty } from 'ramda';

import { TRootState } from 'store';
import { getAssetsMetadata } from 'store/AAstats';
import { showSnackBar } from 'store/SnackStack';

import { updateDefinedData } from './Obyte.reducer';
import {
  getBaseAAsWithAssetMetadata,
  getBaseAAWithSymbolsByObyte,
  getBaseAAwithUndefinedSymbols,
  getDefAddresses,
  getDefData,
  getDefinedAddresses,
  getUndefinedAddresses,
} from './utils';

let obyte: Client;

function getObyteClient(): Client {
  if (!obyte) {
    obyte = new Client();
  }
  return obyte;
}

export const obyteApi = createApi({
  reducerPath: 'obyteApi',
  baseQuery: fetchBaseQuery({
    mode: 'cors',
  }),
  endpoints: (build) => ({
    getSymbol: build.query<unknown, { address: string }>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getObyteClient();
          const data = await getDefAddresses(
            [{ address: arg.address, usd_balance: 0 }],
            socket
          );
          updateCachedData(() => data);
          await cacheEntryRemoved;
          socket.close();
        } catch (e) {
          dispatch(
            showSnackBar({
              message: e instanceof Error ? e.message : 'assets query error',
              title: 'Assets Query',
              severity: 'error',
            })
          );
        }
      },
    }),
    getDefinition: build.query<IDefinition | undefined, string>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getObyteClient();

          const defData = await getDefData(arg, socket);
          updateCachedData((data) => ({ ...data, ...defData }));
          await cacheEntryRemoved;
          socket.close();
        } catch (e) {
          dispatch(
            showSnackBar({
              message:
                e instanceof Error ? e.message : 'definition query error',
              title: 'Definition Query',
              severity: 'error',
            })
          );
        }
      },
    }),
    getDefinitions: build.query<IDefinedBaseAAData[], IRenderAATvl[]>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, getState }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getObyteClient();

          const { obyte: obyteSlice, aaStats } = getState() as TRootState;
          const { definedData } = obyteSlice;
          const { assetsMetadata } = aaStats;

          const baseAAs = await getDefAddresses(
            getUndefinedAddresses(arg, getDefinedAddresses(definedData)),
            socket
          );

          const saftyAssetsMetaData = isEmpty(assetsMetadata)
            ? await dispatch(getAssetsMetadata()).unwrap()
            : assetsMetadata;

          const baseAAsWithAssetMetadata = getBaseAAsWithAssetMetadata(
            baseAAs,
            saftyAssetsMetaData
          );

          if (baseAAsWithAssetMetadata.length > 0) {
            dispatch(updateDefinedData(baseAAsWithAssetMetadata));
          }

          const baseAAWithSymbolsByObyte = await Promise.all(
            getBaseAAWithSymbolsByObyte(
              getBaseAAwithUndefinedSymbols(baseAAsWithAssetMetadata),
              socket
            )
          );

          if (baseAAWithSymbolsByObyte.length > 0) {
            dispatch(updateDefinedData(baseAAWithSymbolsByObyte));
          }

          const defData = baseAAs.map(async (base) => ({
            ...base,
            definition: await getDefData(base.base_aa, socket),
          }));

          const response = await Promise.allSettled(defData);
          const result = response.reduce((accu: IDefinedBaseAAData[], curr) => {
            if (curr.status === 'fulfilled') {
              return accu.concat({
                ...curr.value,
                definition: {
                  description: curr.value.definition.description,
                  homepage_url: curr.value.definition.homepage_url,
                  source_url: curr.value.definition.source_url,
                },
              });
            }
            return accu;
          }, []);

          if (result.length > 0) {
            dispatch(updateDefinedData(result));
          }
          await cacheEntryRemoved;
          socket.close();
        } catch (e) {
          dispatch(
            showSnackBar({
              message:
                e instanceof Error ? e.message : 'definition query error',
              title: 'Definitions Query',
              severity: 'error',
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetDefinitionQuery,
  useGetDefinitionsQuery,
  useGetSymbolQuery,
} = obyteApi;
