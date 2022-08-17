import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAssetsMetadata } from '.';

const initialState: IAAstatsSlice = {
  assetsMetadata: [],
};

export const AAstatsSlice = createSlice({
  name: 'AAstats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAssetsMetadata.fulfilled,
      (state, action: PayloadAction<IAssetMetaData[]>) => {
        state.assetsMetadata = action.payload;
      }
    );
  },
});

export const { reducer: AAstatsReducer } = AAstatsSlice;
