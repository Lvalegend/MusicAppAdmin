import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import accountReducer from './features/accountSlice';
import songReducer from './features/songSlice';
import singerReducer from './features/singerSlice';
import categoryReducer from './features/categorySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      authState: authReducer,
      accoutState: accountReducer,
      songState: songReducer,
      singerState: singerReducer,
      categoryState: categoryReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
