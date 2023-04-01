import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";

export default function Component() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
      <Head>
        <title>Cooked</title>
        <meta name="description" content="One big recipe book" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className='bg-base-100' >
        Signed in as {session.user.email} <br />
        <img src={session.user.image} />
        <br />
        {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </main>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Cooked</title>
        <meta name="description" content="One big recipe book" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
      session,
    },
  };
}
