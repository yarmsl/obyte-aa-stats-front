import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shortPeriodsUiControls, longPeriodsUiControls } from 'conf/uiControls';
import { initialState } from './initialState';

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    toggleDarkMode: (state: UIState) => {
      state.darkMode = !state.darkMode;
    },
    cacheHomeLayout: (
      state: UIState,
      action: PayloadAction<ReactGridLayout.Layouts>
    ) => {
      state.homeLayoutsCache = action.payload;
    },
    clearCacheHomeLayout: (state: UIState) => {
      state.homeLayoutsCache = {};
    },
    saveHomeLayout: (state: UIState) => {
      if ('sm' in state.homeLayoutsCache) {
        state.homeLayouts = state.homeLayoutsCache;
        state.homeLayoutsCache = {};
      }
    },
    cacheAgentLayout: (
      state: UIState,
      action: PayloadAction<ReactGridLayout.Layouts>
    ) => {
      state.agentLayoutsCache = action.payload;
    },
    clearCacheAgentLayout: (state: UIState) => {
      state.agentLayoutsCache = {};
    },
    saveAgentLayout: (state: UIState) => {
      if ('sm' in state.agentLayoutsCache) {
        state.agentLayouts = state.agentLayoutsCache;
        state.agentLayoutsCache = {};
      }
    },
    handleTotalGraphPeriodControl: (
      state: UIState,
      action: PayloadAction<number>
    ) => {
      state.totalGraphPeriodControls =
        [...longPeriodsUiControls, ...shortPeriodsUiControls].find(
          (ctrl) => ctrl.value === action.payload
        ) || initialState.totalGraphPeriodControls;
    },
    handleTotalGraphActivitiesControls: (
      state: UIState,
      action: PayloadAction<IUiSelects<ITotalWithTvlActivity>[]>
    ) => {
      state.totalGraphActivitiesControls = action.payload;
    },
    handleAgentsTablePeriodControl: (
      state: UIState,
      action: PayloadAction<number>
    ) => {
      state.agentsTablePeriodControls =
        shortPeriodsUiControls.find((ctrl) => ctrl.value === action.payload) ||
        initialState.agentsTablePeriodControls;
    },
    handleAsset: (
      state: UIState,
      action: PayloadAction<assetsTypes | null>
    ) => {
      state.asset = action.payload;
    },
    handleAAtopTableSortType: (
      state: UIState,
      action: PayloadAction<topAATypes>
    ) => {
      state.aaTopTableSortType = action.payload;
    },
  },
});

export const {
  toggleDarkMode,
  cacheHomeLayout,
  saveHomeLayout,
  clearCacheHomeLayout,
  cacheAgentLayout,
  saveAgentLayout,
  clearCacheAgentLayout,
  handleTotalGraphPeriodControl,
  handleTotalGraphActivitiesControls,
  handleAgentsTablePeriodControl,
  handleAsset,
  handleAAtopTableSortType,
} = UISlice.actions;
export const { reducer: UIReducer } = UISlice;
