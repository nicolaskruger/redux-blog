import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { AppState } from "../../store";
import { selectUserById, selectUserMap } from "../user/userSlicer";
import { parseISO, formatDistanceToNow } from "date-fns";
import axios from "axios";

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
  state: "loading" | "success" | "fail";
  posts: EntityState<Post>;
};

const blogAdapter = createEntityAdapter<Post>({
  selectId: (a) => a.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: Blog = {
  state: "loading",
  posts: blogAdapter.getInitialState(),
};

export type AddPost = Pick<Post, "title" | "authorId" | "content">;

type EditPost = Pick<Post, "id" | "title" | "content">;

type ReactPost = {
  id: string;
  reaction: keyof Pick<Post, "joy" | "like" | "rocket" | "look">;
};

export const fetchPost = createAsyncThunk("blog/fetchPost", async () => {
  const response = await axios.get<Post[]>("/api/post");
  return response.data;
});

export const addPost = createAsyncThunk(
  "blog/addPost",
  async (newPost: AddPost) => {
    const response = await axios.post<Post>("/api/post", newPost);
    return response.data;
  }
);

const blogSlicer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    post: {
      reducer: (state, action: PayloadAction<Post>) => {
        blogAdapter.addOne(state.posts, action.payload);
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

      const existsEntity = state.posts.entities[id];

      if (existsEntity) {
        existsEntity.title = newPost.title;
        existsEntity.content = newPost.content;
      }
    },
    react: (state, action: PayloadAction<ReactPost>) => {
      const { id, reaction } = action.payload;

      const existsEntity = state.posts.entities[id];

      if (existsEntity) {
        existsEntity[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        blogAdapter.addMany(state.posts, action.payload);
        state.state = "success";
      })
      .addCase(fetchPost.rejected, (state) => {
        state.state = "fail";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        blogAdapter.addOne(state.posts, action.payload);
      });
  },
});

export const { post, edit, react } = blogSlicer.actions;

const postsSelector = blogAdapter.getSelectors<AppState>(
  (state) => state.blog.posts
);

const differenceBetweenNow = (timestamp: string) => {
  const date = parseISO(timestamp);

  return `${formatDistanceToNow(date)} ago`;
};
export const selectPost = (state: AppState) => {
  const userMap = selectUserMap(state);

  return postsSelector
    .selectAll(state)
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
  const post = postsSelector.selectById(state, id);

  if (!post) return null;

  const postView: ViewPost = {
    ...post,
    date: differenceBetweenNow(post.date),
    authorName: selectUserById(post!.id).name,
  };

  return postView;
};

export const selectPostByAuthorId = (id: string) => (state: AppState) => {
  const posts = postsSelector
    .selectAll(state)
    .filter((post) => post.authorId === id);
  return posts.map(
    (post): Omit<ViewPost, "authorName"> => ({
      ...post,
      date: differenceBetweenNow(post.date),
    })
  );
};

export const selectPostByUser = createSelector(
  [
    (state: AppState) => postsSelector.selectAll(state),
    (state: AppState, userId: string) => userId,
    selectUserMap,
  ],
  (posts, userId, user) =>
    posts
      .filter((post) => post.authorId === userId)
      .map(
        (post): ViewPost => ({
          ...post,
          authorName: user[userId]?.name,
        })
      )
);

export default blogSlicer.reducer;
