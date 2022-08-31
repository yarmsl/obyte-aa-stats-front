import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'store';

const aaStatsSelector = (state: TRootState): IAAstatsSlice => state.aaStats;

export const assetMetaDataSelector = createSelector(
  aaStatsSelector,
  (aaStats) => aaStats.assetsMetadata
);

export const getAssetNameSelector = createSelector(
  assetMetaDataSelector,
  (assetsMetadata) => (assetMetadata?: string) => {
    if (assetMetadata === 'base') return 'GBYTE';
    const found = assetsMetadata.find(
      (data) => data.metadata_key === assetMetadata
    );
    if (found) return found.name;

    return assetMetadata?.substring(0, 5) || '';
  }
);
