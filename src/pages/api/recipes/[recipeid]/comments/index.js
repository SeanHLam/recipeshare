// pages/api/posts.js
import { prisma } from "../../../../../../server/db/client";

export default async function handle(req, res) {
  const { method } = req;
 
  switch (method) {
    case "GET":
      // get all posts from the database
      const comments = await prisma.Comments.findMany({
        where: {
          recipeId: parseInt(req.query.recipeid)
        }
      });
      // send the posts to the client
      res.status(200).json(comments);
      break;

    case "POST":
      // get the title and content from the request body
      const { id, userId, recipeId, comment, updatedAt } =
        req.body;
      // use prisma to create a new post using that data
      const post = await prisma.Comments.create({
        data: {
          userId,
          recipeId: parseInt(req.query.recipeid),
          comment,
          updatedAt,
        },
      });
      // send the post object back to the client
      res.status(201).json(post);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
