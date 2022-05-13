import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ModalStackReducer } from './ModalStack';
import { UIReducer } from './UI';
import { TokenMiddleware } from './Auth/Auth.middleware';
import { SnackStackReducer } from './SnackStack';
import { aastatsAPI } from './AAstats';

const UIPersistConfig = {
  key: 'ui',
  storage,
  whitelist: [
    'darkMode',
    'homeLayouts',
    'agentLayouts',
    'totalGraphPeriodControls',
    'totalGraphActivitiesControls',
    'agentsTablePeriodControls',
    'aaTopTableSortType',
    'asset',
  ],
};

const rootReducer = combineReducers({
  modalStack: ModalStackReducer,
  snackStack: SnackStackReducer,
  ui: persistReducer(UIPersistConfig, UIReducer),
  [aastatsAPI.reducerPath]: aastatsAPI.reducer,
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      TokenMiddleware,
      aastatsAPI.middleware
    ),
});

export const persistor = persistStore(appStore);
export type TRootState = ReturnType<typeof appStore.getState>;
export type AppStore = typeof appStore;
export type TAppDispatch = ThunkDispatch<TRootState, null, AnyAction>;
export const useAppDispatch = (): TAppDispatch => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export default appStore;
