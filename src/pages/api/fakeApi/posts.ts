import { NextApiHandler } from "next";
import { AddPost, Post } from "../../../features/blog/blogSlice";
import { nanoid } from "@reduxjs/toolkit";

const blogPost: Post[] = [
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
];

const postHandler: NextApiHandler = async (request, response) => {
  const api: Dictionary<"GET" | "POST", NextApiHandler> = {
    GET: async (request, response) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return response.json([...blogPost]);
    },
    POST: async (request, response) => {
      const post: AddPost = request.body;

      await new Promise((resolve) => setTimeout(resolve, 500));

      const newPost: Post = {
        ...post,
        id: nanoid(),
        joy: 0,
        like: 0,
        rocket: 0,
        look: 0,
        date: new Date().toISOString(),
      };

      blogPost.push(newPost);

      return response.json(newPost);
    },
  };
  return await api[request.method as keyof typeof api](request, response);
};

export default postHandler;
