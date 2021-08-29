import type { Ask, Story as StoryType } from "@jamsch/hacker-news-client";
import Link from "next/link";
import styles from "./Story.module.css";
import { formatRelativeTime } from "../utils";

export default function Story({ data }: { data: StoryType | Ask }) {
  const { id, by, time, score, descendants } = data;
  return (
    <div className={styles.story}>
      <a href={"url" in data ? data.url : `/item/${id}`}>{data.title}</a>
      <div className="subtext">
        {score} points by <Link href={`/user/${by}`}>{by}</Link> {formatRelativeTime(time)} |{" "}
        <Link href={`/item/${id}`}>
          <a>{descendants > 0 ? `${descendants} comments` : "discuss"}</a>
        </Link>
      </div>
    </div>
  );
}
