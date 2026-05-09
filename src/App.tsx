import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Insights from './pages/Insights';
import BookClub from './pages/BookClub';

function App() {
  return (
    <BrowserRouter basename="/Project-ReadingShelf">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/book-club" element={<BookClub />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

