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

export interface NewsComment {
  id: number;
  by: string;
  parent: number;
  text: string;
  time: number;
  kids?: number[];
  comments?: NewsComment[];
}
