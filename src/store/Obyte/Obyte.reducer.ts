import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { aastatsAPI } from 'store/AAstats';

const initialState: IObyteSlice = {
  definedData: {},
  addresses: [],
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
  extraReducers: (builder) => {
    builder.addMatcher(
      aastatsAPI.endpoints.getTopAAbyType.matchFulfilled,
      (state, action) => {
        const addresses = action.payload.map((ap) => ap.address);
        state.addresses = Array.from(
          new Set(state.addresses.concat(addresses))
        );
      }
    );
  },
});

export const { updateDefinedData } = ObyteSlice.actions;
export const { reducer: ObyteReducer } = ObyteSlice;
