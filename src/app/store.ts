import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/sach/booksSlice';
import { gioiHanMuonMiddleware } from '../features/sach/gioiHanMuonMiddleware';

export function taoStore() {
  return configureStore({
    reducer: { sach: booksReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gioiHanMuonMiddleware),
  });
}

export const store = taoStore();
export type AppStore = ReturnType<typeof taoStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
