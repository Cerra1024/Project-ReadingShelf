
// BOOK TYPE


export type Book = {
  title: string;
  author: string;
  isbn13: string | null;
  isbn10: string | null;
  coverUrl: string | null;
  pageCount: number | null;
  publishedDate: string;
  genres: string[];
  description: string | null;
  publisher: string;
};



// SEARCH RESULT TYPE


export type SearchResult = {
  title: string;
  author: string;
  coverUrl: string | null;
};