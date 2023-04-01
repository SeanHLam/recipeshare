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
import { use } from "react";
import { useState, useEffect } from "react";

export default function Home({ recipes, users, likes, comments }) {
  const [showPopup, setShowPopup] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState("New Recipe");
  const [ingredients, setIngredients] = useState("Ingredients");
  const [instructions, setInstructions] = useState("Instructions");
  const [userId, setUserId] = useState("");
  const { data: session, status } = useSession();
  console.log(session);
  const openRecipe = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (session) {
        users.find((user) => {
            if (user.name === session.user.name) {
                setUserId(user.id);
            }
          });
    }
    }, [session]);

  

  const handleRecipe = async (e) => {
    e.preventDefault();
    openRecipe();

    const res = await axios.post("/api/recipes", {
      title: recipeTitle,
      ingredients: ingredients,
      steps: instructions,
      userId:  userId,
      updatedAt: new Date("2020-03-19T14:21:00+0200"),
    });

    setRecipeTitle("");
    setIngredients("");
    setInstructions("");
  };

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
        <div className="fixed bottom-0 right-0">
          <RecButt onClick={openRecipe} text="Add"></RecButt>
        </div>

        {showPopup ? (
          <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-base-100   p-4 flex flex-col justify-center items-center">
              <button
                onClick={openRecipe}
                className="flex justify-end mr-4 w-full  "
              >
                <svg
                  className="h-6 w-6 text-neutral hover:text-primary transition ease-in-out duration-150"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h1 className="text-6xl mb-2  text-neutral font-bold">
                New Recipe
              </h1>
              <div className="flex justify-center w-full">
                <form className="flex flex-col w-1/2">
                  <label className="text-neutral">Title</label>
                  <input
                    value={recipeTitle}
                    onChange={(e) => setRecipeTitle(e.target.value)}
                    className="input text-neutral input-bordered"
                    type="text"
                  />
                  <label className="text-neutral">Ingredients</label>
                  <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className=" input text-neutral input-bordered"
                    type="text"
                  />
                  <label className="text-neutral">Steps</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="input text-neutral input-bordered"
                    type="text"
                  />

                  <RecButt onClick={handleRecipe} text="Add"></RecButt>
                </form>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col items-center min-h-screen py-2">
          <h1 className="text-6xl mb-2 text-neutral font-bold">RECIPES</h1>
          <div className="flex flex-row flex-wrap   justify-center">
            {recipes.map((recipe) => {
              console.log(
                likes.filter((like) => like.recipeId === recipe.id).length
              );

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
                  comments={comments.filter(
                    (comment) => comment.recipeId === recipe.id
                  )}
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
  const comments = await prisma.Comments.findMany();

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
      comments: JSON.parse(JSON.stringify(comments)),
      session,
    },
  };
}
