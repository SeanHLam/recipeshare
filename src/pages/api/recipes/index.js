// pages/api/posts.js
import { prisma } from "../../../../server/db/client";

export default async function handle(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // get all posts from the database
      const recipes = await prisma.Recipe.findMany();
      // // send the posts to the client
      res.status(200).json(recipes);
      break;

    case "POST":
      // get the title and content from the request body
      const { id, userId, title, ingredients, steps, updatedAt } =
        req.body;
      // use prisma to create a new post using that data
      const post = await prisma.Recipe.create({
        data: {
          userId,
          title,
          ingredients,
          steps,
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
