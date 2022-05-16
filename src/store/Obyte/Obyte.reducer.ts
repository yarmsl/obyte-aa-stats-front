import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
          state.definedData[ap.base_aa].addresses = Array.from(
            new Set([
              ...state.definedData[ap.base_aa].addresses,
              ...ap.addresses,
            ])
          );
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
