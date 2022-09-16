import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAssetsKeysArray } from './utils';

const initialState: IObyteSlice = {
  definedData: {},
};

export const ObyteSlice = createSlice({
  name: 'obyte',
  initialState,
  reducers: {
    updateDefinedData: (
      state: IObyteSlice,
      action: PayloadAction<IDefinedBaseAAData[]>
    ) => {
      action.payload.forEach((incomingData) => {
        if (incomingData.base_aa in state.definedData) {
          const cachedData = new Map(
            state.definedData[incomingData.base_aa].addresses.map(
              (addressEntity) => [addressEntity.address, addressEntity]
            )
          );
          incomingData.addresses.forEach((addressEntity) => {
            const assetKeys = getAssetsKeysArray(addressEntity);
            const cachedAddressInfo = cachedData.get(addressEntity.address);
            if (cachedAddressInfo) {
              assetKeys.forEach((key) => {
                if (!cachedAddressInfo[key].symbol && addressEntity[key].symbol)
                  cachedData.set(
                    addressEntity.address,
                    Object.assign(cachedAddressInfo, {
                      [key]: addressEntity[key],
                    })
                  );
              });
              if (cachedAddressInfo.tvl === -1 && addressEntity.tvl !== -1)
                cachedData.set(
                  addressEntity.address,
                  Object.assign(cachedAddressInfo, { tvl: addressEntity.tvl })
                );
            } else cachedData.set(addressEntity.address, addressEntity);
          });
          state.definedData[incomingData.base_aa].addresses = [
            ...cachedData.values(),
          ];
          if (!state.definedData[incomingData.base_aa].definition.description)
            state.definedData[incomingData.base_aa].definition =
              incomingData.definition;
        } else {
          state.definedData[incomingData.base_aa] = {
            addresses: incomingData.addresses,
            definition: incomingData.definition,
          };
        }
      });
    },
  },
});

export const { updateDefinedData } = ObyteSlice.actions;
export const { reducer: ObyteReducer } = ObyteSlice;
