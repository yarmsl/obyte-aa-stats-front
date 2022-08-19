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
            ...state.definedData[ap.base_aa].addresses,
            ...ap.addresses,
          ];
          const uniqAddresses = [...new Set(allData.map((a) => a.address))];
          state.definedData[ap.base_aa].addresses = uniqAddresses.map(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (address) => allData.find((data) => data.address === address)!
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
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     aastatsAPI.endpoints.getTopAAbyTvl.matchFulfilled,
  //     (state, action) => {
  //       const addresses = action.payload.map((ap) => ap.address);
  //       console.log(addresses);
  //       // state.addresses = [...new Set(state.addresses.concat(addresses))];
  //     }
  //   );
  // },
});

export const { updateDefinedData } = ObyteSlice.actions;
export const { reducer: ObyteReducer } = ObyteSlice;
