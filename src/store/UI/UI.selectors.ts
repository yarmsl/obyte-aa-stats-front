import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'store';

const uiSelector = (state: TRootState): UIState => state.ui;

export const darkModeSelector = createSelector(uiSelector, (ui) => ui.darkMode);

export const homeLayoutsSelector = createSelector(
  uiSelector,
  (ui) => ui.homeLayouts
);

export const homeLayoutsCacheSelector = createSelector(
  uiSelector,
  (ui) => ui.homeLayoutsCache
);

export const totalGraphControlValue = createSelector(
  uiSelector,
  (ui) => ui.totalGraphPeriodControls.value
);

export const totalGraphActivityControl = createSelector(
  uiSelector,
  (ui) => ui.totalGraphActivitiesControls
);

export const totalGraphTimeframeSelector = createSelector(
  totalGraphActivityControl,
  ([control]) => control.timeframe || 'daily'
);

export const agentsTableControl = createSelector(
  uiSelector,
  (ui) => ui.agentsTablePeriodControls
);

export const assetSelector = createSelector(uiSelector, (ui) => ui.asset);

export const agentsTableSortTypeSelector = createSelector(
  uiSelector,
  (ui) => ui.agentsTableSortType
);

export const agentsTableSortByTvlSelector = createSelector(
  uiSelector,
  (ui) => ui.agentsTableSortByTvl
);

export const agentLayoutsSelector = createSelector(
  uiSelector,
  (ui) => ui.agentLayouts
);

export const agentLayoutsCacheSelector = createSelector(
  uiSelector,
  (ui) => ui.agentLayoutsCache
);

export const agentsTableDataLimitSelector = createSelector(
  uiSelector,
  (ui) => ui.agentsTableDataLimit
);

export const agentGraphActivitiesControlsSelector = createSelector(
  uiSelector,
  (ui) => ui.agentGraphActivitiesControls
);

export const agentGraphTimeframeSelector = createSelector(
  agentGraphActivitiesControlsSelector,
  ([control]) => control.timeframe || 'daily'
);

export const agentGraphPeriodControlValueSelector = createSelector(
  uiSelector,
  (ui) => ui.agentGraphPeriodControl.value
);

export const agentGraphTypeSelector = createSelector(
  agentGraphActivitiesControlsSelector,
  ([control]) => control.type
);
