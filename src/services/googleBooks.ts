
// TYPES


export type GoogleBook = {
  id: string;

  title: string;

  author: string;

  coverUrl: string | null;

  pageCount: number | null;

  publishedDate: string;

  description: string | null;
};



// SEARCH FUNCTION


export async function searchGoogleBooks(
  query: string
): Promise<GoogleBook[]> {
  // Prevent empty searches
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=10`
    );

    const data = await response.json();

    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id,

      title:
        item.volumeInfo.title ??
        'Unknown Title',

      author:
        item.volumeInfo.authors?.[0] ??
        'Unknown Author',

      coverUrl:
        item.volumeInfo.imageLinks?.thumbnail ??
        null,

      pageCount:
        item.volumeInfo.pageCount ??
        null,

      publishedDate:
        item.volumeInfo.publishedDate ??
        'Unknown',

      description:
        item.volumeInfo.description ??
        null,
    }));
  } catch (error) {
    console.error(
      'Google Books search failed:',
      error
    );

    return [];
  }
}