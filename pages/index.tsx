import type { GetStaticProps, NextPage } from "next";
import Client, { Story } from "@jamsch/hacker-news-client";
import Stories from "../components/Stories";

const Home: NextPage<{ stories: Story[] }> = (props) => {
  return <Stories data={props.stories} page={1} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const topStories = await Client.getTopStories();
  const stories = await Client.getItems(topStories.slice(0, 30));
  return {
    props: { stories },
    revalidate: 3600,
  };
};

export const config = {
  unstable_runtimeJS: false,
};

export default Home;
