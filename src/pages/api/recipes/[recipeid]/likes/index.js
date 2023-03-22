// pages/api/posts.js
import { prisma } from "../../../../../../server/db/client";

export default async function handle(req, res) {
  const { method } = req;
  
  switch (method) {
    case "GET":
      // get all posts from the database
      const likes = await prisma.Likes.findMany({
        where: {
          recipeId: parseInt(req.query.recipeid)
        }
      });
      // send the posts to the client
      res.status(200).json(likes);
      break;

    case "POST":
      // get the title and content from the request body
      const { id, userId, recipeId, comment, updatedAt } =
        req.body;
      // use prisma to create a new post using that data
    
      const user = await prisma.Likes.findMany({
        where: {
          userId
        }
      });

      console.log("user likes",user);

      if (user.length > 0) {
        await prisma.Likes.deleteMany({
          where: {
            userId
          }
        })
        res.send(`Unliked recipe ${req.query.recipeid}`)
      } else {
        const post = await prisma.Likes.create({
          data: {
            userId,
            recipeId: parseInt(req.query.recipeid),
            updatedAt,
          },
        });
        res.status(201).json(post);
      }


      
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
