import { Serie } from '@nivo/line';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiKey } from 'conf/constants';
import {
  transformTopAA,
  transformTopAAByTvl,
  transformTotalActivity,
  transformTotalTvl,
  transformTvlValues,
} from './AAstats.transform';

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
    getTotalTvlOverTime: build.query<Serie[], IAAStatsTotalTvl>({
      query: ({ from, to, asset, timeframe }) => ({
        url: 'total/tvl',
        method: 'POST',
        body:
          timeframe === 'daily'
            ? { from: from * 24, to: to * 24, asset }
            : { from, to, asset },
      }),
      providesTags: ['TotalTvl'],
      transformResponse: (data: ITotalTvl[] | undefined, _, arg) =>
        transformTotalTvl(data, arg.timeframe, arg.conf),
    }),
    getTotalTvlValues: build.query<ITotalTvl[], IAAStatsTotalTvlValuesReq>({
      query: (request) => ({
        url: 'total/tvl',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TotalTvl'],
      transformResponse: (data: ITotalTvl[] | undefined) =>
        transformTvlValues(data),
    }),
    getTotalActivityOverTime: build.query<Serie[], IAAStatsTotalActivity>({
      query: ({ asset, from, to, timeframe }) => ({
        url: 'total/activity',
        method: 'POST',
        body: { asset, from, to, timeframe },
      }),
      providesTags: ['TotalActivity'],
      transformResponse: (data: ITotalActivity[] | undefined, _, arg) =>
        transformTotalActivity(data, arg.slices, arg.timeframe),
    }),
    getTopAAbyTvl: build.query<IRenderAATvl[], IAAStatsTopAAbyTvlReq>({
      query: (request) => ({
        url: 'top/aa/tvl',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TopAAbyTvl'],
      transformResponse: (data: topAAbyTvlRes[] | undefined) =>
        transformTopAAByTvl(data),
    }),
    getTopAAbyType: build.query<IRenderAddress[], IAAStatsTopAAbyTypeReq>({
      query: ({ asset, from, to, timeframe, limit, type }) => ({
        url: `top/aa/${type}`,
        method: 'POST',
        body: { asset, from, to, timeframe, limit },
      }),
      providesTags: ['TopAA'],
      transformResponse: (data: IAddress[] | undefined) => transformTopAA(data),
    }),
    getTopAssets: build.query<IAsset[], IAAStatsTopAssetsReq>({
      query: (request) => ({
        url: 'top/asset/tvl',
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
  useGetTotalTvlOverTimeQuery,
  useGetTotalTvlValuesQuery,
  useGetTotalActivityOverTimeQuery,
  useGetTopAAbyTvlQuery,
  useGetTopAAbyTypeQuery,
  useGetTopAssetsQuery,
} = aastatsAPI;
