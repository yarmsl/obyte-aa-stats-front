import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { aastatsAPI } from 'store/AAstats';

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
      action.payload.forEach((ap) => {
        if (ap.base_aa in state.definedData) {
          const allData = [
            ...ap.addresses,
            ...state.definedData[ap.base_aa].addresses,
          ];

          const hash = new Map();
          allData.forEach((data) => {
            hash.set(
              data.address,
              Object.assign(hash.get(data.address) || {}, data)
            );
          });

          state.definedData[ap.base_aa].addresses = [...hash.values()];
          state.definedData[ap.base_aa].definition = ap.definition;
        } else {
          state.definedData[ap.base_aa] = {
            addresses: ap.addresses,
            definition: ap.definition,
          };
        }
      });
    },
  },
});

export const { updateDefinedData } = ObyteSlice.actions;
export const { reducer: ObyteReducer } = ObyteSlice;
