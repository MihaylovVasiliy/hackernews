import { NewsComment } from "../components/Comment/types";

export interface NewsItem {
    id: number;
    title: string;
    url: string;
    text: string;
    score: number;
    by: string;
    time: number;
    descendants: number;
    parent: number;
    kids: any[] | null;
    comments: NewsComment[] | null;
  }
  