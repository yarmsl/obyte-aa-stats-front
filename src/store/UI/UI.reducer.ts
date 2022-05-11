import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { totalGraphPeriodUiControls } from 'conf/uiControls';
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
    handleTotalGraphPeriodControl: (state, action: PayloadAction<number>) => {
      state.totalGraphPeriodControls =
        totalGraphPeriodUiControls.find(
          (ctrl) => ctrl.value === action.payload
        ) || initialState.totalGraphPeriodControls;
    },
    handleTotalGraphActivitiesControls: (
      state,
      action: PayloadAction<IUiSelects<ITotalActivity>[]>
    ) => {
      state.totalGraphActivitiesControls = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  cacheHomeLayout,
  saveHomeLayout,
  clearCacheHomeLayout,
  handleTotalGraphPeriodControl,
  handleTotalGraphActivitiesControls,
} = UISlice.actions;
export const { reducer: UIReducer } = UISlice;
