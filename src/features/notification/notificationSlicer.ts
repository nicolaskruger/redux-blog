import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import axios from "axios";
import { add, subDays } from "date-fns";

export type Notify = {
  info: string;
  date: string;
  userId: string;
};

const initialState: Notify[] = [
  {
    info: "first msg",
    date: subDays(new Date(), 12).toISOString(),
    userId: "0",
  },
];

export const fetchLastNotify = createAsyncThunk(
  "notify/fetchLastNotify",
  async (_, { getState }) => {
    const notify = selectNotify(getState() as AppState);
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
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLastNotify.fulfilled, (state, action) => {
      return [...state, ...action.payload].sort((a, b) =>
        b.date.localeCompare(a.date)
      );
    });
  },
});

export default notifySlicer.reducer;

export const selectNotify = (state: AppState) => state.notify;
