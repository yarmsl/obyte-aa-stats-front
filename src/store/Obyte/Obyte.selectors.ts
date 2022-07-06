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
      .find((def) => def.addresses.some((a) => a === address))
);

export const safetyDefinitionByAddressSelector = createSelector(
  definitionByAddressSelector,
  (def) => (address: string) => {
    const defData = def(address);
    if (defData) {
      return defData.definition;
    }
    return { description: address };
  }
);

export const descriptionByAddressSelector = createSelector(
  safetyDefinitionByAddressSelector,
  (definition) => (address: string) => definition(address).description
);

export const addressesSelector = createSelector(
  obyteSelector,
  (obyte) => obyte.addresses
);

export const isAddressesInCacheSelector = createSelector(
  definitionByAddressSelector,
  addressesSelector,
  (getDef, addresses) =>
    addresses.length > 0 ? addresses.every((address) => getDef(address)) : true
);

export const fullFlattenDefinedDataSelector = createSelector(
  definedDataSelector,
  (definedData): ILabeledAddress[] =>
    Object.keys(definedData).reduce(
      (labeledAddresses: ILabeledAddress[], curr) =>
        labeledAddresses.concat(
          {
            address: curr,
            label: definedData[curr].definition.description,
          },
          definedData[curr].addresses.map((address) => ({
            address,
            label: definedData[curr].definition.description,
          }))
        ),
      []
    )
);
