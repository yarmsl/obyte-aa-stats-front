import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiGetDef } from 'lib/api';
import { Client } from 'obyte';
import { showSnackBar } from 'store/SnackStack';
import { updateDefinedData } from './Obyte.reducer';

let obyte: Client;

function getObyteClient(): Client {
  if (!obyte) {
    obyte = new Client();
  }
  return obyte;
}

const getDefData = async (
  address: string,
  client: Client
): Promise<IDefinition> => {
  const res = await client.api.getDefinition(address);
  if ('base_aa' in res[1]) {
    const def = await client.api.getDefinition(res[1].base_aa);
    return apiGetDef<IDefinition>(def[1].doc_url);
  }
  return apiGetDef<IDefinition>(res[1].doc_url);
};

const getDefAddresses = async (
  addresses: string[],
  client: Client
): Promise<IBaseAAData[]> => {
  const res = addresses.map(async (address) => {
    const temp = await client.api.getDefinition(address);
    if ('base_aa' in temp[1]) {
      return { address, base_aa: temp[1].base_aa as string };
    }
    return { address, base_aa: address };
  });
  const adressesArr = await Promise.all(res);
  const baseArr = Array.from(new Set(adressesArr.map((a) => a.base_aa)));
  return baseArr.map((base) => {
    const addrss = adressesArr
      .filter((a) => a.base_aa === base)
      .map((a) => a.address);
    return { base_aa: base, addresses: addrss };
  });
};

export const obyteApi = createApi({
  reducerPath: 'obyteApi',
  baseQuery: fetchBaseQuery({
    mode: 'cors',
  }),
  endpoints: (build) => ({
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
    getDefinitions: build.query<IDefinedBaseAAData[], string[]>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getObyteClient();
          const baseAAs = await getDefAddresses(arg, socket);

          const defData = baseAAs.map(async (base) => ({
            ...base,
            definition: await getDefData(base.base_aa, socket),
          }));
          const response = await Promise.allSettled(defData);
          const result = response.reduce((accu: IDefinedBaseAAData[], curr) => {
            if (curr.status === 'fulfilled') {
              return accu.concat(curr.value);
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

export const { useGetDefinitionQuery, useGetDefinitionsQuery } = obyteApi;
