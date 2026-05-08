
// IMPORTS


import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import starterBooks from '../data/sample-books.json';

import type { Book } from '../types';


// TYPES


type ShelfBook = Book & {
  shelf: 'reading' | 'want-to-read' | 'finished';
  progress: number;
  currentPage: number;
};

type BooksContextType = {
  shelfBooks: ShelfBook[];

  addBookToShelf: (
    book: Book,
    shelf: ShelfBook['shelf']
  ) => void;

  moveBookToShelf: (
    isbn13: string | null,
    newShelf: ShelfBook['shelf']
  ) => void;

  updateBookPage: (
    isbn13: string | null,
    currentPage: number
  ) => void;
};



// CONTEXT


const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);



// PROVIDER


type BooksProviderProps = {
  children: ReactNode;
};

export function BooksProvider({ children }: BooksProviderProps) {
  // Load saved shelf books
  const [shelfBooks, setShelfBooks] = useState<ShelfBook[]>(() => {
    const savedBooks = localStorage.getItem('autumns-nook-shelf');

    if (savedBooks) {
      return JSON.parse(savedBooks);
    }

    // Starter guest books
    return starterBooks.slice(0, 6).map((book, index) => {
      const shelf =
        index < 2
          ? 'reading'
          : index < 4
            ? 'want-to-read'
            : 'finished';

      const currentPage =
        shelf === 'reading' && book.pageCount
          ? Math.round(book.pageCount * 0.35)
          : shelf === 'finished' && book.pageCount
            ? book.pageCount
            : 0;

      const progress =
        book.pageCount && book.pageCount > 0
          ? Math.round((currentPage / book.pageCount) * 100)
          : shelf === 'finished'
            ? 100
            : 0;

      return {
        ...book,
        shelf,
        currentPage,
        progress,
      };
    });
  });

  // Save shelf books to localStorage
  useEffect(() => {
    localStorage.setItem(
      'autumns-nook-shelf',
      JSON.stringify(shelfBooks)
    );
  }, [shelfBooks]);

  // Add new book to shelf
  function addBookToShelf(
    book: Book,
    shelf: ShelfBook['shelf']
  ) {
    setShelfBooks((prevBooks) => {
      const alreadyExists = prevBooks.some(
        (existingBook) => existingBook.isbn13 === book.isbn13
      );

      if (alreadyExists) {
        return prevBooks;
      }

      const currentPage =
        shelf === 'finished' && book.pageCount
          ? book.pageCount
          : 0;

      const progress = shelf === 'finished' ? 100 : 0;

      return [
        ...prevBooks,
        {
          ...book,
          shelf,
          currentPage,
          progress,
        },
      ];
    });
  }

  // Move existing book to another shelf
  function moveBookToShelf(
    isbn13: string | null,
    newShelf: ShelfBook['shelf']
  ) {
    setShelfBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.isbn13 !== isbn13) {
          return book;
        }

        const currentPage =
          newShelf === 'finished' && book.pageCount
            ? book.pageCount
            : newShelf === 'want-to-read'
              ? 0
              : book.currentPage;

        const progress =
          book.pageCount && book.pageCount > 0
            ? Math.round((currentPage / book.pageCount) * 100)
            : newShelf === 'finished'
              ? 100
              : 0;

        return {
          ...book,
          shelf: newShelf,
          currentPage,
          progress,
        };
      })
    );
  }

  // Update current page and calculate progress
  function updateBookPage(
    isbn13: string | null,
    currentPage: number
  ) {
    setShelfBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.isbn13 !== isbn13) {
          return book;
        }

        const safePage = Math.min(
          Math.max(currentPage, 0),
          book.pageCount ?? currentPage
        );

        const progress =
          book.pageCount && book.pageCount > 0
            ? Math.round((safePage / book.pageCount) * 100)
            : 0;

        return {
          ...book,
          currentPage: safePage,
          progress,
          shelf: progress >= 100 ? 'finished' : book.shelf,
        };
      })
    );
  }

  return (
    <BooksContext.Provider
      value={{
        shelfBooks,
        addBookToShelf,
        moveBookToShelf,
        updateBookPage,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}



// CUSTOM HOOK


export function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error('useBooks must be used inside BooksProvider');
  }

  return context;
}