import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'store';

const uiSelector = (state: TRootState): UIState => state.ui;

export const homeLayoutsSelector = createSelector(
  uiSelector,
  (ui) => ui.homeLayouts
);

const homeLayoutsCacheSelector = createSelector(
  uiSelector,
  (ui) => ui.homeLayoutsCache
);

export const ishomeLayoutsCache = createSelector(
  homeLayoutsCacheSelector,
  (cache) => 'sm' in cache
);
