/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Client } from 'obyte';
import { TRootState } from 'store';
import { showSnackBar } from 'store/SnackStack';
import { updateDefinedData } from './Obyte.reducer';
import { getDefAddresses, getDefData } from './utils';

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
    getSymbol: build.query<unknown, { address: string; asset: string }>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getObyteClient();
          const assetData = await socket.api.getSymbolByAsset(
            arg.address,
            arg.asset
          );
          updateCachedData(() => assetData);
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
        {
          cacheDataLoaded,
          cacheEntryRemoved,
          updateCachedData,
          dispatch,
          getState,
        }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getObyteClient();

          const { definedData } = (getState() as TRootState).obyte;
          const definedAddresses = Object.keys(definedData).reduce(
            (res: string[], key) =>
              res.concat(definedData[key].addresses.map((a) => a.address)),
            []
          );

          const undefinedAddresses = arg.reduce(
            (accu: IRenderAATvl[], curr) => {
              if (definedAddresses.includes(curr.address)) {
                return accu;
              }
              return accu.concat(curr);
            },
            []
          );

          const baseAAs = await getDefAddresses(undefinedAddresses, socket);

          if (baseAAs.length > 0) {
            dispatch(updateDefinedData(baseAAs));
            updateCachedData((data) => data.concat(baseAAs));
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
            updateCachedData((data) => data.concat(result));
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
  useLazyGetSymbolQuery,
} = obyteApi;
