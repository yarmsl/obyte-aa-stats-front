import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiKey } from 'conf/constants';
import { apiGet } from 'lib/api';
import { transformGetAssets } from './AAstats.transform';

export const getAssetsMetadata = createAsyncThunk<IAssetMetaData[], void>(
  'AAstats/getAssetsMetadata',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGet<AssetsResponseType>(`${apiKey}assets`);
      return transformGetAssets(response);
    } catch (e) {
      return rejectWithValue(new Error('Get Assets Metadata error'));
    }
  }
);
