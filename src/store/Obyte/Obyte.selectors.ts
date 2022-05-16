import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'store';

const obyteSelector = (state: TRootState): IObyteSlice => state.obyte;

export const definedDataSelector = createSelector(
  obyteSelector,
  (obyte) => obyte.definedData
);

export const definitionByAddressSelector = createSelector(
  definedDataSelector,
  (definedData) => (address: string) =>
    Object.keys(definedData)
      .map((baseaa) => definedData[baseaa])
      .find((def) => def.addresses.some((a) => a === address))?.definition || {
      description: address,
    }
);
