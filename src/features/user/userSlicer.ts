import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import axios from "axios";

type User = {
  name: string;
  id: string;
};

type UserState = { users: User[]; state: "loading" | "success" | "fail" };

const initialState: UserState = {
  state: "loading",
  users: [],
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get<User[]>("/api/user");
  return response.data;
});

export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.state = "success";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.state = "fail";
      });
  },
});

export const selectUsers = (state: AppState) => state.user.users;

export const selectUserMap = (state: AppState) =>
  state.user.users.reduce((acc, curr) => {
    return { ...acc, [curr.id]: curr };
  }, {} as { [key: string]: User });

export const selectUserById = (id: string) => (state: AppState) =>
  state.user.users.find((user) => user.id === id);

export default userSlicer.reducer;
