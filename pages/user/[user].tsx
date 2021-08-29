import type { GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import Client, { User } from "@jamsch/hacker-news-client";
import type { GetStaticProps } from "next";

const Home: NextPage<{ user: User }> = ({ user }) => {
  return (
    <>
      <Head>
        <title>User: {user.id}</title>
      </Head>

      <h1>User: {user.id}</h1>
      <ul>
        <li>created: {user.created}</li>
        <li>karma: {user.karma}</li>
      </ul>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const userId = String(context.params?.user);
  return {
    props: {
      user: await Client.getUser(userId),
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const config = {
  unstable_runtimeJS: false,
};

export default Home;
