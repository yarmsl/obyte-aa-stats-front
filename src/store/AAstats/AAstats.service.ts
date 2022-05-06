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
  tagTypes: [
    'Address',
    'TvlForAddress',
    'TotalTvl',
    'TotalActivity',
    'TopAA',
    'TopAAbyTvl',
    'TopAssets',
  ],
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
    getTotalTvlOverTime: build.query<ITotalTvl[], IAAStatsTotalTvl>({
      query: (request) => ({
        url: 'total/tvl',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TotalTvl'],
    }),
    getTotalActivityOverTime: build.query<
      ITotalActivity[],
      IAAStatsTotalActivity
    >({
      query: (request) => ({
        url: 'total/activity',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TotalActivity'],
    }),
    getTopAAbyTvl: build.query<topAAbyTvlRes[], IAAStatsTopAAbyTvlReq>({
      query: (request) => ({
        url: 'top/aa/tvl',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TopAAbyTvl'],
    }),
    getTopAAbyType: build.query<IAddress[], IAAStatsTopAAbyTypeReq>({
      query: ({ asset, from, to, timeframe, limit, type }) => ({
        url: `top/aa/${type}`,
        method: 'POST',
        body: { asset, from, to, timeframe, limit },
      }),
      providesTags: ['TopAA'],
    }),
    getTopAssets: build.query<IAsset[], IAAStatsTopAssetsReq>({
      query: ({ limit, period, type }) => ({
        url: `top/asset/${type}`,
        method: 'POST',
        body: { limit, period },
      }),
      providesTags: ['TopAssets'],
    }),
  }),
});

export const {
  useGetStatsForOneAddressQuery,
  useGetTvlOverTimeForOneAddressQuery,
  useGetTotalTvlOverTimeQuery,
  useGetTotalActivityOverTimeQuery,
  useGetTopAAbyTvlQuery,
  useGetTopAAbyTypeQuery,
  useGetTopAssetsQuery,
} = aastatsAPI;
