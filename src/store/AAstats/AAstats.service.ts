import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiKey } from 'conf/constants';

export const aastatsAPI = createApi({
  reducerPath: 'aastatsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: apiKey,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ['Address', 'TvlForAddress', 'TopAA', 'TopAssets'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getStatsForOneAddress: build.query<IAddress[], IAAStatsAddressReq>({
      query: (request) => ({
        url: 'address',
        method: 'POST',
        body: request,
      }),
      providesTags: ['Address'],
    }),
    getTvlOverTimeForOneAddress: build.query<IAddress[], IAAStatsTvlReq>({
      query: (request) => ({
        url: 'address/tvl',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TvlForAddress'],
    }),
    getTopAAbyTvl: build.query<IAddress[], IAAStatsTopAAbyTvlReq>({
      query: (request) => ({
        url: 'top/aa/tvl',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TopAA'],
    }),
    getTopAAbyType: build.query<IAddress[], IAAStatsTopAAbyTypeReq>({
      query: ({ asset, from, to, timeframe, limit, type }) => ({
        url: `top/aa/${type}`,
        method: 'POST',
        body: { asset, from, to, timeframe, limit },
      }),
      providesTags: ['TopAA'],
    }),
    getTopAssetsByMarketCap: build.query<IAsset[], IAAStatsTopAssetsReq>({
      query: (request) => ({
        url: 'top/asset/market_cap',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TopAssets'],
    }),
    getTopAssetsByAmountIn: build.query<IAsset[], IAAStatsTopAssetsReq>({
      query: (request) => ({
        url: 'top/asset/amount_in',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TopAssets'],
    }),
  }),
});

export const {
  useGetStatsForOneAddressQuery,
  useGetTvlOverTimeForOneAddressQuery,
  useGetTopAAbyTvlQuery,
  useGetTopAAbyTypeQuery,
  useGetTopAssetsByMarketCapQuery,
  useGetTopAssetsByAmountInQuery,
} = aastatsAPI;
