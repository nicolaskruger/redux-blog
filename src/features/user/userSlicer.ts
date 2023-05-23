import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AppState } from "../../store";
import axios from "axios";

type User = {
  name: string;
  id: string;
};

type UserState = {
  users: EntityState<User>;
  state: "loading" | "success" | "fail";
};

const userAdapter = createEntityAdapter<User>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => b.name.localeCompare(a.name),
});

const initialState: UserState = {
  state: "loading",
  users: userAdapter.getInitialState(),
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
        userAdapter.addMany(state.users, action.payload);
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.state = "fail";
      });
  },
});

export const userSelector = userAdapter.getSelectors<AppState>(
  (state) => state.user.users
);

export const selectUserMap = (state: AppState) => state.user.users.entities;

export const selectUsers = (state: AppState) => userSelector.selectAll(state);

export const selectUserById = (id: string) => (state: AppState) =>
  userSelector.selectById(state, id);

export default userSlicer.reducer;
