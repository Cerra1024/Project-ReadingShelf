
// IMPORTS

import { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  searchGoogleBooks,
  type GoogleBook,
} from '../../services/googleBooks';

import { useBooks } from '../../context/BooksContext';

import BookModal from '../BookModal/BookModal';

import './Header.css';

import logo from '../../assets/anlogo.png';



// COMPONENT


function Header() {
  // Global shelf actions
  const { addBookToShelf } = useBooks();

  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Search results
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([]);

  // Loading state
  const [isSearching, setIsSearching] = useState(false);

  // Selected modal book
  const [selectedBook, setSelectedBook] =
    useState<GoogleBook | null>(null);

  // Search Google Books
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);

      const results = await searchGoogleBooks(searchTerm);

      setSearchResults(results);

      setIsSearching(false);
    }, 500);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchTerm]);

  return (
    <>
      <header className="header">
        {/* Logo / Brand */}
        <div className="brand">
          <img
  className="brand-logo"
  src={logo}
  alt="Autumn's Nook logo"
/>

          <p className="brand-name">
            Autumn&apos;s Nook
          </p>
        </div>

        {/* Navigation */}
        <nav
          className="navigation"
          aria-label="Main navigation"
        >
          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/insights">
            Insights
          </NavLink>

          <NavLink to="/book-club">
            Book Club
          </NavLink>
        </nav>

        {/* Search */}
        <div className="search-wrapper">
          <form
            className="search-form"
            role="search"
            aria-label="Search books"
            onSubmit={(event) =>
              event.preventDefault()
            }
          >
            <label
              htmlFor="book-search"
              className="sr-only"
            >
              Search books
            </label>

            <input
              id="book-search"
              type="search"
              placeholder="Search books, authors..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </form>

          {/* Loading */}
          {isSearching && (
            <div className="search-results">
              <p className="search-message">
                Searching books...
              </p>
            </div>
          )}

          {/* Results */}
          {!isSearching &&
            searchResults.length > 0 && (
              <div
                className="search-results"
                role="listbox"
                aria-label="Search suggestions"
              >
                {searchResults.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    className="search-result-card"
                    onClick={() =>
                      setSelectedBook(book)
                    }
                  >
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={`Cover of ${book.title}`}
                      />
                    ) : (
                      <div
                        className="search-placeholder"
                        aria-hidden="true"
                      />
                    )}

                    <div>
                      <h3>{book.title}</h3>

                      <p>{book.author}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
        </div>
      </header>

      {/* Book modal */}
      <BookModal
        isOpen={selectedBook !== null}
        title={selectedBook?.title ?? ''}
        author={selectedBook?.author ?? ''}
        coverUrl={selectedBook?.coverUrl ?? null}
        description={
          selectedBook?.description ?? null
        }
        publishedDate={
          selectedBook?.publishedDate
        }
        pageCount={selectedBook?.pageCount}
        onClose={() =>
          setSelectedBook(null)
        }
        onAddToShelf={(shelf) => {
          if (!selectedBook) {
            return;
          }

          addBookToShelf(
            {
              title: selectedBook.title,
              author: selectedBook.author,
              coverUrl:
                selectedBook.coverUrl,
              pageCount:
                selectedBook.pageCount,
              isbn13: selectedBook.id,
              isbn10: null,
              publishedDate:
                selectedBook.publishedDate,
              genres: [],
              description:
                selectedBook.description,
              publisher: '',
            },
            shelf
          );

          setSelectedBook(null);
        }}
      />
    </>
  );
}



// EXPORT


export default Header;