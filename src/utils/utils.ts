import { format, formatDistanceToNow } from "date-fns";
import { NewsComment, NewsItem } from "../types/types";

export async function getTopStories(): Promise<number[]> {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );
  const storyIds = await response.json();

  return storyIds.slice(100, 150);
}

export async function getNewsItem({id, hasToFetchComments}: {id: number, hasToFetchComments: boolean}): Promise<NewsItem> {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  const data = await response.json();
  const { title, score, by, time, descendants, url, text, kids, parent } = data;

  let comments: NewsComment[] = [];
  if (kids && hasToFetchComments) {
    const commentPromises = kids.map((kid: number) => getNewsItem({id: kid, hasToFetchComments: true}));
    comments = await Promise.all(commentPromises);
  }

  return {
    id,
    title,
    score,
    by,
    time,
    descendants,
    url,
    text,
    parent,
    kids,
    comments,
  };
}

export const durationFromPostingTime = (
  timestamp: number
) => ` ${formatDistanceToNow(timestamp)} ago | ${format(
  timestamp,
  "dd.MM.yy, HH:mm"
)} 
`;

export function removeHtmlSymbols(text: string): string {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    `<!doctype html><body>${text}`,
    "text/html"
  );
  return dom.body.textContent ?? "";
}
