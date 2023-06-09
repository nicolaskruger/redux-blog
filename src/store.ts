import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";
import blogReducer from "./features/blog/blogSlice";
import userReducer from "./features/user/userSlicer";
import notifyReducer from "./features/notification/notificationSlicer";
import { useDispatch } from "react-redux";
import { apiSlice } from "./features/api/apiSlicer";

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      blog: blogReducer,
      user: userReducer,
      notify: notifyReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
