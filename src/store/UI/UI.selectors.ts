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

export const ishomeLayoutsCache = createSelector(
  homeLayoutsCacheSelector,
  (cache) => 'sm' in cache
);

export const totalGraphControlValue = createSelector(
  uiSelector,
  (ui) => ui.totalGraphPeriodControls.value
);

export const totalGraphActivityControl = createSelector(
  uiSelector,
  (ui) => ui.totalGraphActivitiesControls
);

export const assetSelector = createSelector(uiSelector, (ui) => ui.asset);

export const aaTopTableSortTypeSelector = createSelector(
  uiSelector,
  (ui) => ui.aaTopTableSortType
);

export const agentLayoutsSelector = createSelector(
  uiSelector,
  (ui) => ui.agentLayouts
);

export const agentLayoutsCacheSelector = createSelector(
  uiSelector,
  (ui) => ui.agentLayoutsCache
);
