
// IMPORTS


import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  searchGoogleBooks,
  type GoogleBook,
} from '../../services/googleBooks';

import './Header.css';



// COMPONENT


function Header() {
  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Google Books API results
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([]);

  // Loading state for search feedback
  const [isSearching, setIsSearching] = useState(false);

  // Fetch books when search term changes
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
    <header className="header">
      {/* Logo / Brand */}
      <div className="brand">
        <div className="brand-icon" aria-hidden="true">
          🍂
        </div>

        <p className="brand-name">
          Autumn&apos;s Nook
        </p>
      </div>

      {/* Main navigation */}
      <nav
        className="navigation"
        aria-label="Main navigation"
      >
        <NavLink to="/">Home</NavLink>

        <NavLink to="/insights">
          Insights
        </NavLink>

        <NavLink to="/book-club">
          Book Club
        </NavLink>
      </nav>

      {/* Search area */}
      <div className="search-wrapper">
        <form
          className="search-form"
          role="search"
          aria-label="Search books"
          onSubmit={(event) => event.preventDefault()}
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

        {/* Loading message */}
        {isSearching && (
          <div className="search-results">
            <p className="search-message">
              Searching books...
            </p>
          </div>
        )}

        {/* Search suggestions */}
        {!isSearching && searchResults.length > 0 && (
          <div
            className="search-results"
            role="listbox"
            aria-label="Search suggestions"
          >
            {searchResults.map((book) => (
              <article
                key={book.id}
                className="search-result-card"
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
              </article>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}



// EXPORT


export default Header;