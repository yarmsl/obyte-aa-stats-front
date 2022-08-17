/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiGetDef } from 'lib/api';
import { Client } from 'obyte';
import { TRootState } from 'store';
import { showSnackBar } from 'store/SnackStack';
import { updateDefinedData } from './Obyte.reducer';

let obyte: Client;

function getObyteClient(): Client {
  if (!obyte) {
    obyte = new Client();
  }
  return obyte;
}

const getXYAssetsInfo = async (
  address: string,
  client: Client
): Promise<{ xAsset: string; yAsset: string } | undefined> => {
  try {
    const info = await client.api.getDefinition(address);
    if (
      'params' in info[1] &&
      'x_asset' in info[1].params &&
      'y_asset' in info[1].params
    )
      return { xAsset: info[1].params.x_asset, yAsset: info[1].params.y_asset };
    return undefined;
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message);
    throw new Error('getXYAssetsInfo error');
  }
};

const getDefData = async (
  address: string,
  client: Client
): Promise<IDefinition> => {
  try {
    const res = await client.api.getDefinition(address);
    if ('base_aa' in res[1]) {
      const def = await client.api.getDefinition(res[1].base_aa);
      return apiGetDef<IDefinition>(def[1].doc_url);
    }
    if ('doc_url' in res[1]) return apiGetDef<IDefinition>(res[1].doc_url);
    throw new Error('doc_url or base_aa is absent');
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message);
    throw new Error('getDefFData error');
  }
};

const getDefAddresses = async (
  addresses: IRenderAATvl[],
  client: Client
): Promise<IBaseAAData[]> => {
  const res = addresses.map(async (address) => {
    const temp = await client.api.getDefinition(address.address);
    if ('base_aa' in temp[1]) {
      return { address, base_aa: temp[1].base_aa as string };
    }
    return { address, base_aa: address.address };
  });
  const adressesArr = await Promise.all(res);
  const baseArr = [...new Set(adressesArr.map((a) => a.base_aa))];

  const res2 = baseArr.map(async (base) => {
    const addrss = adressesArr
      .filter((a) => a.base_aa === base)
      .map(async (a) => {
        const assets = await getXYAssetsInfo(a.address.address, client);
        if (assets)
          return {
            address: a.address.address,
            tvl: a.address.usd_balance,
            xAsset: assets.xAsset,
            yAsset: assets.yAsset,
          };
        return { address: a.address.address, tvl: a.address.usd_balance };
      });
    return {
      base_aa: base,
      addresses: (await Promise.all(addrss)) as IAddressWithTvl[],
    };
  });
  return Promise.all(res2);
};

export const obyteApi = createApi({
  reducerPath: 'obyteApi',
  baseQuery: fetchBaseQuery({
    mode: 'cors',
  }),
  endpoints: (build) => ({
    getTestData: build.query<unknown, string>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getObyteClient();
          const assetData = await socket.api.getAssetMetadata(arg);
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
    getDefinitions: build.query<
      IDefinedBaseAAData[],
      IGetTopAACombinedByTypeRes[]
    >({
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
            (accu: IGetTopAACombinedByTypeRes[], curr) => {
              if (definedAddresses.includes(curr.address)) {
                return accu;
              }
              return accu.concat(curr);
            },
            []
          );

          const baseAAs = await getDefAddresses(undefinedAddresses, socket);

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
  useGetTestDataQuery,
} = obyteApi;
