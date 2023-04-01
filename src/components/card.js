import RecButt from "./button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function Card({
  title = "Title",
  description = "Description",
  likes = 0,
  user = "User",
  comments = [],
  ingredients = "",
  steps = "Steps",
}) {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div
        onClick={handlePopup}
        className="flex m-2 hover:scale-95 w-72 rounded-md transition-all cursor-pointer flex-col items-center "
      >
        <div className="w-full flex rounded-t-md flex-row items-center text-center justify-center cardTitle">
            <h1 className="text-xl font-bold text-neutral">{title}</h1>
          </div>
        <div className="flex w-72 flex-col items-center  p-4 bg-base-100 rounded-md shadow-md">
          
          <div className="w-full flex justify-between   ">
            <p className="text-neutral m-1">By: {user}</p>
            <p className="text-neutral m-1">♡ {likes}</p>
          </div>
        </div>
      </div>

      <div
        className={`${
          showPopup ? "h-screen" : "h-0"
        }   sm:p-0 fixed overflow-auto bottom-0 left-0 w-screen  bg-base-100  z-50  transition-all ease-in-out duration-1000`}
      >
        <div className=" relative flex flex-col items-center h-full mx-auto  lg:w-6/12  ">
          <button onClick={handlePopup} className="flex justify-end mr-4 mb-8 w-full pt-4 ">
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
            <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl font-bold text-neutral">{title}</h1>
            <p className="text-neutral m-1">By: {user}</p>
            <p className="text-neutral m-1">♡ {likes}</p>

            <div className="flex flex-col w-full">
                <h1 className="text-xl font-bold text-neutral">Ingredients</h1>
                <p className="text-neutral m-1">{ingredients}</p>
                <h1 className="text-xl font-bold text-neutral">Steps</h1>
                <p className="text-neutral m-1">{steps}</p>
                <h1 className="text-xl font-bold text-neutral">Comments</h1>
                
                </div>
                <p className="text-neutral m-1">{comments}</p>
                </div>
        </div>
      </div>
    </>
  );
}
