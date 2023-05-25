import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../blog/blogSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/fakeApi" }),
  endpoints: (builder) => ({
    getPost: builder.query<Post[], void>({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostQuery } = apiSlice;
