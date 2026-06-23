
// IMPORTS


import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import {
  searchGoogleBooks,
  type GoogleBook,
} from '../../services/googleBooks';

import { useBooks } from '../../context/BooksContext';
import { useAuth } from '../../context/AuthContext';

import BookModal from '../BookModal/BookModal';

import logo from '../../assets/anlogo.png';

import './Header.css';


// COMPONENT


function Header() {
  const { addBookToShelf } = useBooks();

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null);

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

  function handleLogout() {
  logout();
  navigate('/login');
}

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

        {/* User actions */}
        <div className="user-actions">
          {currentUser ? (
            <>
              <span className="user-pill">
                👤 {currentUser.name}
              </span>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="auth-link"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="auth-button"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Book modal */}
      <BookModal
        isOpen={selectedBook !== null}
        title={selectedBook?.title ?? ''}
        author={selectedBook?.author ?? ''}
        coverUrl={selectedBook?.coverUrl ?? null}
        description={selectedBook?.description ?? null}
        publishedDate={selectedBook?.publishedDate}
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
              coverUrl: selectedBook.coverUrl,
              pageCount: selectedBook.pageCount,
              isbn13: selectedBook.id,
              isbn10: null,
              publishedDate: selectedBook.publishedDate,
              genres: [],
              description: selectedBook.description,
              publisher: 'Google Books',
            },
            shelf
          );

          setSelectedBook(null);
        }}
      />
    </>
  );
}


// ==============================
// EXPORT
// ==============================

export default Header;