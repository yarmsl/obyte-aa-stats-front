import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'store';

const aaStatsSelector = (state: TRootState): IAAstatsSlice => state.aaStats;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const aaStatsApiSelector = (state: TRootState) => state.aastatsAPI;

export const assetMetaDataSelector = createSelector(
  aaStatsSelector,
  (aaStats) => aaStats.assetsMetadata
);

export const isAssetMetaDataSelector = createSelector(
  assetMetaDataSelector,
  (assetMetaData) => !!assetMetaData
);

export const aaStatsApiQueriesSelector = createSelector(
  aaStatsApiSelector,
  (aaStatsApi) => aaStatsApi.queries
);

export const topAAbyTVLSelector = createSelector(
  aaStatsApiQueriesSelector,
  (aaStatsApiQueries): IRenderAATvl[] => {
    if (Object.hasOwn(aaStatsApiQueries, 'getTopAAbyTvl({})'))
      return (
        (aaStatsApiQueries['getTopAAbyTvl({})']?.data as IRenderAATvl[]) || []
      );

    return [];
  }
);

export const getTvlByAddressSelector = createSelector(
  topAAbyTVLSelector,
  (topAAbyTVL) => (address: string) =>
    topAAbyTVL.find((agent) => agent.address === address)?.usd_balance || -1
);
