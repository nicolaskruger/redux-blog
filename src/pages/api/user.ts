import { NextApiHandler } from "next";

const userHandler: NextApiHandler = async (request, response) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return response.json([
    {
      name: "nicolas",
      id: "0",
    },
    {
      name: "ana",
      id: "1",
    },
    {
      name: "morcego",
      id: "2",
    },
    {
      name: "jett",
      id: "3",
    },
  ]);
};

export default userHandler;
