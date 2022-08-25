import { createSelector } from '@reduxjs/toolkit';
import { templates } from 'conf/aaTemplates';
import { TRootState } from 'store';
import { getAssetNameSelector } from 'store/AAstats';

const obyteSelector = (state: TRootState): IObyteSlice => state.obyte;

export const definedDataSelector = createSelector(
  obyteSelector,
  (obyte) => obyte.definedData
);

export const dd4Table = createSelector(
  definedDataSelector,
  getAssetNameSelector,
  (dd, getName) =>
    Object.keys(dd).map((baseaa) => ({
      baseaa,
      addresses: dd[baseaa].addresses.map((a) => ({
        ...a,
        xAsset: a.xAsset ? `${getName(a.xAsset)} (${a.xAsset})` : 'no data',
        yAsset: a.yAsset ? `${getName(a.yAsset)} (${a.yAsset})` : 'no data',
      })),
      description: dd[baseaa].definition.description,
    }))
);

export const definitionByAddressSelector = createSelector(
  definedDataSelector,
  (definedData) => (address: string) =>
    Object.keys(definedData)
      .map((baseaa) => ({ ...definedData[baseaa], base_aa: baseaa }))
      .find((def) => def.addresses.some((a) => a.address === address))
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
  definitionByAddressSelector,
  getAssetNameSelector,
  (getDefinition, getAssetName) =>
    (address: string): string => {
      const definedData = getDefinition(address);
      if (definedData) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const addressData = definedData.addresses.find(
          (a) => a.address === address
        )!;
        const { xAsset, yAsset } = addressData;
        if (xAsset || (xAsset && yAsset)) {
          const xSymbol = getAssetName(xAsset);
          const ySymbol = getAssetName(yAsset);
          if (templates[definedData.base_aa])
            return templates[definedData.base_aa](xSymbol, ySymbol);
          return definedData.definition.description;
        }
        return definedData.definition.description;
      }
      return address;
    }
);

export const fullFlattenDefinedDataSelector = createSelector(
  definedDataSelector,
  descriptionByAddressSelector,
  (definedData, getDescription): ILabeledAddress[] =>
    Object.keys(definedData).reduce(
      (labeledAddresses: ILabeledAddress[], curr) =>
        labeledAddresses.concat(
          definedData[curr].addresses.map((address) => ({
            tvl: address.tvl,
            address: address.address,
            label: getDescription(address.address),
          }))
        ),
      []
    )
);
