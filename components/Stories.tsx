import type { Story as StoryType } from "@jamsch/hacker-news-client";
import styles from "./Stories.module.css";
import Story from "./Story";

const itemNumber = (page: number, index: number) => (page - 1) * 30 + (index + 1);

export default function Stories({ data, page }: { data: StoryType[]; page: number }) {
  return (
    <div className={styles.stories}>
      {data.map((story, index) => (
        <div key={story.id}>
          <span>{itemNumber(page, index)}.</span>
          <Story data={story} />
        </div>
      ))}
    </div>
  );
}
