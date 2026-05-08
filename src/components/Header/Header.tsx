import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        Autumn’s Nook
      </div>

      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <NavLink to="/book-club">Book Club</NavLink>
      </nav>

      <div className="search">
        <input
          type="text"
          placeholder="Search books..."
        />
      </div>
    </header>
  );
}

export default Header;
