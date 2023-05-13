import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../store";

export type Post = {
  title: string;
  content: string;
};

type Blog = {
  posts: Post[];
};

const initialState: Blog = {
  posts: [
    {
      title: "naruto",
      content: "rasengan",
    },
    {
      title: "sasuke",
      content: "shidory",
    },
  ],
};

const blogSlicer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    post: (state, action: PayloadAction<Post>) => {
      state.posts = [...state.posts, action.payload];
    },
  },
});

export const { post } = blogSlicer.actions;

export const selectPost = (state: AppState) => state.blog.posts;

export default blogSlicer.reducer;
