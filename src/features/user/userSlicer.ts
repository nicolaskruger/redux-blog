import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../store";

type User = {
  name: string;
  id: string;
};

const initialState: { users: User[] } = {
  users: [
    {
      name: "nicolas",
      id: "0",
    },
    {
      name: "ana",
      id: "1",
    },
    {
      name: "morcego",
      id: "2",
    },
    {
      name: "jett",
      id: "3",
    },
  ],
};

export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const selectUsers = (state: AppState) => state.user.users;

export const selectUserMap = (state: AppState) =>
  state.user.users.reduce((acc, curr) => {
    return { ...acc, [curr.id]: curr };
  }, {} as { [key: string]: User });

export const selectUserById = (id: string) => (state: AppState) =>
  state.user.users.find((user) => user.id === id);

export default userSlicer.reducer;
