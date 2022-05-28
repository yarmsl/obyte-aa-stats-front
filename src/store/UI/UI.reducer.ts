import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shortPeriodsUiControls, longPeriodsUiControls } from 'conf/uiControls';
import { equals } from 'ramda';
import { aastatsAPI } from 'store/AAstats';
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
    increaseAgentsTableDataLimit: (
      state: UIState,
      action: PayloadAction<number>
    ) => {
      state.agentsTableDataLimit += action.payload;
    },
    handleAgentsTableSortType: (
      state: UIState,
      action: PayloadAction<topAATypes>
    ) => {
      state.agentsTableSortType = action.payload;
    },
    handleAgentsTableSortByTvl: (
      state: UIState,
      action: PayloadAction<boolean>
    ) => {
      state.agentsTableSortByTvl = action.payload;
    },
    handleAsset: (state: UIState, action: PayloadAction<UiAssetTypes>) => {
      state.asset = action.payload;
    },
    handleAgentGraphActivitiesControls: (
      state: UIState,
      action: PayloadAction<IUiSelects<IAddressGraphData>[]>
    ) => {
      state.agentGraphActivitiesControls = action.payload;
    },
    handleAgentGraphPeriodControl: (
      state: UIState,
      action: PayloadAction<number>
    ) => {
      state.agentGraphPeriodControl =
        [...longPeriodsUiControls, ...shortPeriodsUiControls].find(
          (ctrl) => ctrl.value === action.payload
        ) || initialState.totalGraphPeriodControls;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      aastatsAPI.endpoints.getStatsForOneAddress.matchFulfilled,
      (state, action) => {
        const incomeAssets = Array.from(
          new Set(action.payload.map((ap) => ap.asset).filter((a) => a != null))
        );
        if (!equals(state.assets, incomeAssets)) {
          state.assets = incomeAssets;
        }
        if (
          !incomeAssets.some((asset) => asset === state.asset) &&
          state.asset !== 'all' &&
          state.asset !== null
        ) {
          state.asset = 'all';
        }
      }
    );
    builder.addMatcher(
      aastatsAPI.endpoints.getTvlOverTimeForOneAddress.matchFulfilled,
      (state, action) => {
        const incomeAssets = Array.from(
          new Set(action.payload.map((ap) => ap.asset).filter((a) => a != null))
        );
        if (!equals(state.assets, incomeAssets)) {
          state.assets = incomeAssets;
        }
        if (
          !incomeAssets.some((asset) => asset === state.asset) &&
          state.asset !== 'all' &&
          state.asset !== null
        ) {
          state.asset = 'all';
        }
      }
    );
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
  increaseAgentsTableDataLimit,
  handleAgentsTableSortType,
  handleAgentsTableSortByTvl,
  handleAsset,
  handleAgentGraphActivitiesControls,
  handleAgentGraphPeriodControl,
} = UISlice.actions;
export const { reducer: UIReducer } = UISlice;
