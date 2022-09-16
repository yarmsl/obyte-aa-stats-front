import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiKey } from 'conf/constants';
import { apiGet } from 'lib/api';

export const getAssetsMetadata = createAsyncThunk<AssetsResponseType, void>(
  'AAstats/getAssetsMetadata',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGet<AssetsResponseType>(`${apiKey}assets`);
      return response;
    } catch (e) {
      return rejectWithValue(new Error('Get Assets Metadata error'));
    }
  }
);
