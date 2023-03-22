// pages/api/posts.js
import { prisma } from "../../../../../../server/db/client";

export default async function handle(req, res) {
  const { method } = req;
  
  switch (method) {
    case "GET":
      // get all posts from the database
      const likes = await prisma.Likes.findMany({
        where: {
          userId: req.query.userid
        }
      });
      // send the posts to the client
      res.status(200).json(likes);
      break;

    
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
