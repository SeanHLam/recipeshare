import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { prisma } from "../../server/db/client";
import axios from 'axios'
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import RecButt from '@/components/button';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';


export default function Login({recipes,session}) {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>Cooked</title>
        <meta name="description" content="One big recipe book" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className='bg-base-100' flex justify-center >
       
        <div className="flex flex-col text-center items-center justify-center min-h-screen py-2">
        <Image className='animate-spin' src='/favicon.png' width={100} height={100} />
        <h1 className="text-6xl  text-neutral font-bold">
              Welcome to <span className='text-primary'>Cooked</span>
            </h1>
          <p className='text-neutral animate-fade-in ease-in-out mb-4 delay-1000'>
            A place to store and find new recipes 
          </p>
        <div className='flex'>
        <RecButt text='Sign In' onClick={() => signIn()}/>
          <RecButt text='Home' onClick={()=>router.push("/home")}/>

        </div>
          
         
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const recipes = await prisma.Recipe.findMany();
  const session = await getServerSession(context.req, context.res, authOptions);

 

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
      session,
    },
  };
}
