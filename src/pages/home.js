import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { prisma } from "../../server/db/client";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import RecButt from "@/components/button";
import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "@/components/nav";
import Card from "@/components/card";

export default function Home({ recipes, session, users, likes }) {
  console.log(recipes);
  console.log(users);
  console.log("lieks:", likes);
  return (
    <>
      <Head>
        <title>Cooked</title>
        <meta name="description" content="One big recipe book" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavBar />
      <main className="bg-base-100">
        <div className="flex flex-col items-center min-h-screen py-2">
          <h1 className="text-6xl mb-2 text-neutral font-bold">RECIPES</h1>
          <div className="flex flex-row flex-wrap   justify-center">
            {recipes.map((recipe) => {
              console.log(
                likes.filter((like) => like.recipeId === recipe.id).length
              );
              console.log(users.find((user) => user.id === recipe.userId).name);
              return (
                <Card
                  title={recipe.title}
                  description={recipe.description}
                  likes={
                    likes.filter((like) => like.recipeId === recipe.id).length
                  }
                  user={users.find((user) => user.id === recipe.userId).name}
                  key={recipe.id}
                  steps={recipe.steps}
                    ingredients={recipe.ingredients}
                    
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const recipes = await prisma.Recipe.findMany();
  const session = await getServerSession(context.req, context.res, authOptions);
  const users = await prisma.User.findMany();
  const likes = await prisma.Likes.findMany();

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
      users: JSON.parse(JSON.stringify(users)),
      likes: JSON.parse(JSON.stringify(likes)),
      session,
    },
  };
}
