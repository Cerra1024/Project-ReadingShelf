
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
};



// CONTEXT


const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);



// PROVIDER


type BooksProviderProps = {
  children: ReactNode;
};

export function BooksProvider({
  children,
}: BooksProviderProps) {
  // Load saved shelf books
  const [shelfBooks, setShelfBooks] = useState<ShelfBook[]>(() => {
    const savedBooks = localStorage.getItem('autumns-nook-shelf');

    if (savedBooks) {
      return JSON.parse(savedBooks);
    }

    // Starter books
    return starterBooks.slice(0, 6).map((book, index) => ({
      ...book,

      shelf:
        index < 2
          ? 'reading'
          : index < 4
            ? 'want-to-read'
            : 'finished',
    }));
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      'autumns-nook-shelf',
      JSON.stringify(shelfBooks)
    );
  }, [shelfBooks]);

  // Add book to shelf
  function addBookToShelf(
    book: Book,
    shelf: ShelfBook['shelf']
  ) {
    setShelfBooks((prevBooks) => {
      // Prevent duplicates
      const alreadyExists = prevBooks.some(
        (existingBook) =>
          existingBook.isbn13 === book.isbn13
      );

      if (alreadyExists) {
        return prevBooks;
      }

      return [
        ...prevBooks,
        {
          ...book,
          shelf,
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
        if (book.isbn13 === isbn13) {
          return {
            ...book,
            shelf: newShelf,
          };
        }

        return book;
      })
    );
  }

  return (
    <BooksContext.Provider
      value={{
        shelfBooks,
        addBookToShelf,
        moveBookToShelf,
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
    throw new Error(
      'useBooks must be used inside BooksProvider'
    );
  }

  return context;
}