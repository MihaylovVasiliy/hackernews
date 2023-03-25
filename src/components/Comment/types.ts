export interface NewsComment {
    id: number;
    by: string;
    parent: number;
    text: string;
    time: number;
    kids?: number[];
    comments?: NewsComment[];
  }