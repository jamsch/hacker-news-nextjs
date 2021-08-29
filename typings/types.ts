import type { Comment } from "@jamsch/hacker-news-client";

export type CommentWithReplies = Comment & { replies: CommentWithReplies[] };
