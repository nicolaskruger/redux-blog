import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";
import blogReducer from "./features/blog/blogSlice";
import userReducer from "./features/user/userSlicer";

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, blog: blogReducer, user: userReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
