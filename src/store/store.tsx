import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameReducer from './GameSlice';

const rootReducer = combineReducers({
  gameReducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
