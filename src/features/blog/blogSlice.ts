import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { AppState } from "../../store";

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  like: number;
  rocket: number;
  joy: number;
  look: number;
};

type Blog = {
  posts: Post[];
};

const initialState: Blog = {
  posts: [
    {
      id: "1",
      title: "naruto",
      content: "rasengan",
      like: 0,
      joy: 0,
      look: 0,
      rocket: 0,
      author: "Nícolas Krüger",
    },
    {
      id: "2",
      title: "sasuke",
      content: "shidory",
      like: 0,
      joy: 0,
      look: 0,
      rocket: 0,
      author: "Nícolas Krüger",
    },
  ],
};

type AddPost = Pick<Post, "title" | "author" | "content">;

type EditPost = Pick<Post, "id" | "title" | "content">;

type ReactPost = {
  id: string;
  reaction: keyof Pick<Post, "joy" | "like" | "rocket" | "look">;
};

const blogSlicer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    post: (state, action: PayloadAction<AddPost>) => {
      const newPost: Post = {
        ...action.payload,
        id: nanoid(),
        joy: 0,
        like: 0,
        look: 0,
        rocket: 0,
      };

      state.posts = [...state.posts, newPost];
    },
    edit: (state, action: PayloadAction<EditPost>) => {
      const { id, ...newPost } = action.payload;

      state.posts = state.posts.map((post) => {
        if (post.id === id)
          return {
            ...post,
            ...newPost,
          };
        return post;
      });
    },
    react: (state, action: PayloadAction<ReactPost>) => {
      const { id, reaction } = action.payload;

      state.posts = state.posts.map((post) => {
        if (post.id === id)
          return {
            ...post,
            [reaction]: post[reaction] + 1,
          };
        return post;
      });
    },
  },
});

export const { post, edit, react } = blogSlicer.actions;

export const selectPost = (state: AppState) => state.blog.posts;

export const selectPostId = (id: string) => (state: AppState) =>
  state.blog.posts.find((post) => post.id === id);

export default blogSlicer.reducer;
