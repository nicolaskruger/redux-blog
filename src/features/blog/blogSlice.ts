import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { AppState } from "../../store";
import { selectUserById, selectUserMap } from "../user/userSlicer";
import { parseISO, formatDistanceToNow } from "date-fns";

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  like: number;
  rocket: number;
  joy: number;
  look: number;
  date: string;
};

export type ViewPost = Omit<Post, "authorId"> & {
  authorName: string;
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
      authorId: "0",
      date: new Date(new Date().getTime() - 5 * 60000).toISOString(),
    },
    {
      id: "2",
      title: "sasuke",
      content: "shidory",
      like: 0,
      joy: 0,
      look: 0,
      rocket: 0,
      authorId: "1",
      date: new Date(new Date().getTime() - 10 * 60000).toISOString(),
    },
  ],
};

type AddPost = Pick<Post, "title" | "authorId" | "content">;

type EditPost = Pick<Post, "id" | "title" | "content">;

type ReactPost = {
  id: string;
  reaction: keyof Pick<Post, "joy" | "like" | "rocket" | "look">;
};

const blogSlicer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    post: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      },
      prepare: (post: AddPost): { payload: Post } => {
        return {
          payload: {
            ...post,
            id: nanoid(),
            joy: 0,
            like: 0,
            rocket: 0,
            look: 0,
            date: new Date().toISOString(),
          },
        };
      },
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

const differenceBetweenNow = (timestamp: string) => {
  const date = parseISO(timestamp);

  return `${formatDistanceToNow(date)} ago`;
};
export const selectPost = (state: AppState) => {
  const userMap = selectUserMap(state);

  return [...state.blog.posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(
      (post): ViewPost => ({
        ...post,
        date: differenceBetweenNow(post.date),
        authorName: userMap[post.authorId]?.name,
      })
    );
};

export const selectPostId = (id: string) => (state: AppState) => {
  const post = state.blog.posts.find((post) => post.id === id);

  if (!post) return null;

  const postView: ViewPost = {
    ...post,
    date: differenceBetweenNow(post.date),
    authorName: selectUserById(post!.id).name,
  };

  return postView;
};
export default blogSlicer.reducer;
