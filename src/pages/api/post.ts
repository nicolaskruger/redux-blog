import { NextApiHandler } from "next";

const postHandler: NextApiHandler = async (request, response) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return response.json([
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
  ]);
};

export default postHandler;
