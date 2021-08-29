import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Client, { Story } from "@jamsch/hacker-news-client";
import Stories from "../../components/Stories";

const Page: NextPage<{ stories: Story[]; page: number }> = (props) => {
  return <Stories data={props.stories} page={props.page} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const page = Number(context.params?.page) || 1;
  const topStories = await Client.getTopStories();
  const stories = await Client.getItems(topStories.slice((page - 1) * 30, page * 30));
  return {
    props: { stories, page },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const topStories = await Client.getTopStories();
  const numPages = Math.floor(topStories.length / 30);

  return {
    paths: Array.from({ length: numPages }, (_, i) => ({
      params: { page: String(i + 1) },
    })),
    fallback: "blocking",
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default Page;
