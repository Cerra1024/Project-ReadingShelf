import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';

import Home from './pages/Home';
import Insights from './pages/Insights';
import BookClub from './pages/BookClub';
import Register from './pages/Register';
import Login from './pages/Login';

function AppContent() {
  const location = useLocation();

  const hideHeader =
    location.pathname === '/register' ||
    location.pathname === '/login';

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/insights"
          element={<Insights />}
        />

        <Route
          path="/book-club"
          element={<BookClub />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/Project-ReadingShelf">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;