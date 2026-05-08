
// IMPORTS


import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import books from '../../data/sample-books.json';

import type { Book } from '../../types';

import './Header.css';



// COMPONENT


function Header() {
  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Filter books based on title or author
  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }

    return books
      .filter((book: Book) => {
        const normalizedSearch = searchTerm.toLowerCase();

        return (
          book.title.toLowerCase().includes(normalizedSearch) ||
          book.author.toLowerCase().includes(normalizedSearch)
        );
      })
      .slice(0, 5);
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

        {/* Search suggestions */}
        {filteredBooks.length > 0 && (
          <div
            className="search-results"
            role="listbox"
            aria-label="Search suggestions"
          >
            {filteredBooks.map((book, index) => (
              <article
                key={book.isbn13 ?? `${book.title}-${index}`}
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
