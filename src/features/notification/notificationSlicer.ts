import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { AppState } from "../../store";
import axios from "axios";
import { add, subDays } from "date-fns";

export type Notify = {
  id: string;
  info: string;
  date: string;
  userId: string;
  read: boolean;
};

const notifyAdapter = createEntityAdapter<Notify>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = notifyAdapter.getInitialState();

const filledState = notifyAdapter.addOne(initialState, {
  id: nanoid(),
  info: "first msg",
  date: subDays(new Date(), 12).toISOString(),
  userId: "0",
  read: true,
});

const notifySelector = notifyAdapter.getSelectors<AppState>(
  (state) => state.notify
);

export const fetchLastNotify = createAsyncThunk(
  "notify/fetchLastNotify",
  async (_, { getState }) => {
    const state = getState() as AppState;

    const notify = notifySelector.selectAll(state);
    const [lastNotification] = notify;

    const response = await axios.get<Notify[]>("/api/notify", {
      params: {
        since: lastNotification.date,
      },
    });

    return response.data;
  }
);

const notifySlicer = createSlice({
  name: "notify",
  initialState: filledState,
  reducers: {
    readAllNotification: (state) => {
      state.ids.forEach((id) => {
        state.entities[id]!.read = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLastNotify.fulfilled, (state, action) => {
      notifyAdapter.addMany(state, action.payload);
    });
  },
});

export const { readAllNotification } = notifySlicer.actions;

export default notifySlicer.reducer;

export const selectNotify = (state: AppState) =>
  notifySelector.selectAll(state);

export const selectCountNotificationToRead = (state: AppState) =>
  notifySelector.selectAll(state).filter(({ read }) => !read).length;
