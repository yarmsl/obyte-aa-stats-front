import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    cacheHomeLayout: (
      state,
      action: PayloadAction<ReactGridLayout.Layouts>
    ) => {
      state.homeLayoutsCache = action.payload;
    },
    clearCacheHomeLayout: (state) => {
      state.homeLayoutsCache = {};
    },
    saveHomeLayout: (state) => {
      if ('sm' in state.homeLayoutsCache) {
        state.homeLayouts = state.homeLayoutsCache;
        state.homeLayoutsCache = {};
      }
    },
  },
});

export const {
  toggleDarkMode,
  cacheHomeLayout,
  saveHomeLayout,
  clearCacheHomeLayout,
} = UISlice.actions;
export const { reducer: UIReducer } = UISlice;
