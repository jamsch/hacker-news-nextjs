import Link from "next/link";
import { useState } from "react";
import type { CommentWithReplies } from "../typings/types";
import { formatRelativeTime } from "../utils";
import styles from "./Comment.module.css";

export default function Comment({ data }: { data: CommentWithReplies }) {
  const [hidden, setHidden] = useState(false);

  return (
    <div className={styles.comment}>
      <div className={`${styles.header} subtext`}>
        <span>
          <Link href={`/user/${data.by}`}>
            <a>{data.by}</a>
          </Link>
        </span>
        <span> {formatRelativeTime(data.time)}</span>
        <button className={styles.hideButton} onClick={() => setHidden(!hidden)}>
          {hidden ? `[${nestedCount(data.replies) + 1} more]` : "[ - ]"}
        </button>
      </div>

      {!hidden && (
        <>
          <div dangerouslySetInnerHTML={{ __html: data.text }} />
          <a
            className={styles.replyLink}
            href={`https://news.ycombinator.com/reply?id=${data.id}&goto=item%3Fid%3D${data.parent}%23${data.id}`}
          >
            reply
          </a>
          <div className={styles.replies}>
            {data.replies.map((reply) => (
              <Comment key={reply.id} data={reply} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const nestedCount = (replies: CommentWithReplies[]): number => {
  return replies.reduce((acc, reply) => acc + nestedCount(reply.replies) + 1, 0);
};
