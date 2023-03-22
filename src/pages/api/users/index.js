// pages/api/posts.js
import { use } from "react";
import { prisma } from "../../../../server/db/client";

export default async function handle(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // get all posts from the database
      const users = await prisma.User.findMany();
      // // send the posts to the client
      res.status(200).json(users);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
