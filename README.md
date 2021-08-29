# hacker-next-nextjs

An extremely slim hacker-news clone built with Next.js. 
The goal is to provide an identical experience to the original Hacker News website with the same kind of performance as one would expect. Core web vital performance scores the website at 100/100.

## How this is achieved

- Instead of React, Preact is bundled for pages that include JavaScript.
- Pages are prerendered and served from a static server. Revalidation occurs once an hour for each page.
- The only page that requires any JavaScript is the "item" page in order to toggle comment visibility.


## Library dependencies

- [he](https://www.npmjs.com/package/he) for decoding html entities in user content
- [@jamsch/hacker-news-client](https://www.npmjs.com/package/@jamsch/hacker-news-client) - a 448B gzipped bundle that includes a fully-typed Hacker News API client