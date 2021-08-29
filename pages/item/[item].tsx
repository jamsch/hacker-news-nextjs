import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Client, { Comment as CommentType, Item } from "@jamsch/hacker-news-client";
import Story from "../../components/Story";
import Comment from "../../components/Comment";
import type { CommentWithReplies } from "../../typings/types";

const ItemPage: NextPage<{ item: Item; comments: CommentWithReplies[] }> = ({ item, comments }) => {
  if (item.type !== "story") {
    return null;
  }

  return (
    <div>
      <Story data={item} />
      {"text" in item && <div style={{ margin: "10px 0" }} dangerouslySetInnerHTML={{ __html: item.text }} />}

      <hr />
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const item = await Client.getItem(Number(context.params?.item));

  // Decode HTML entities
  if (Client.is(item, "ask")) {
    const he = require("he");
    item.text = he.decode(item.text);
  }

  const fetchCommentsWithReplies = async (ids: number[]): Promise<CommentWithReplies[]> => {
    if (!ids || !ids.length) {
      return [];
    }

    // @ts-ignore
    const comments = (await Client.getItems<CommentType>(ids)).filter((comment) => !comment.deleted);

    const fetchReplies = async (comment: CommentType): Promise<CommentWithReplies> => {
      return {
        ...comment,
        replies: await fetchCommentsWithReplies(comment.kids || []),
      };
    };

    const promises = comments.map(fetchReplies);

    return Promise.all(promises);
  };

  const comments = await fetchCommentsWithReplies("kids" in item ? item.kids : []);

  return {
    props: {
      item,
      comments,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ItemPage;
