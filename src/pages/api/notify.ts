import { NextApiHandler } from "next";
import { Notify } from "../../features/notification/notificationSlicer";
import { subDays } from "date-fns";
import { nanoid } from "@reduxjs/toolkit";

const infos: string[] = ["S2", "HelLo", "on fire", "owo", "lol", "kkkkk"];

const generateRandomNotify = (): Notify => {
  return {
    id: nanoid(),
    info: infos[Math.floor(Math.random() * infos.length)],
    date: subDays(new Date(), 10 * Math.random()).toISOString(),
    userId: Math.floor(Math.random() * 4).toString(),
    read: false,
  };
};

const notification: Notify[] = "_"
  .repeat(10)
  .split("")
  .map((v) => generateRandomNotify());

const notifyHandler: NextApiHandler = (request, response) => {
  const { since } = request.query;

  const notify = notification
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((notify) => notify.date.localeCompare(since as string) >= 0);
  return response.json(notify);
};

export default notifyHandler;
