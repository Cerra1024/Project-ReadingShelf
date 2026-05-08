// IMPORTS
import { NavLink } from 'react-router-dom';
import './Header.css';

// COMPONENT

function Header() {
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
        />
      </form>
    </header>
  );
}



// EXPORT


export default Header;
