// ==============================
// IMPORTS
// ==============================

import BookCard from '../components/BookCard/BookCard';

import { useBooks } from '../context/BooksContext';

import books from '../data/sample-books.json';

import './Home.css';


// ==============================
// COMPONENT
// ==============================

function Home() {
  const {
    shelfBooks,
    addBookToShelf,
    moveBookToShelf,
    updateBookPage,
  } = useBooks();

  // Filter books by shelf
  const currentlyReading = shelfBooks.filter(
    (book) => book.shelf === 'reading'
  );

  const wantToRead = shelfBooks.filter(
    (book) => book.shelf === 'want-to-read'
  );

  const finishedBooks = shelfBooks.filter(
    (book) => book.shelf === 'finished'
  );

  // Discover books not already on shelves
  const discoverBooks = books
    .filter((discoverBook) => {
      return !shelfBooks.some(
        (shelfBook) =>
          shelfBook.isbn13 === discoverBook.isbn13
      );
    })
    .slice(0, 6);

  // Scroll to bookshelf section
  function scrollToShelf() {
    const shelfSection = document.getElementById(
      'bookshelf-section'
    );

    shelfSection?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <main className="home-page">
      {/* Hero section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">
            Read. Reflect. Reconnect.
          </p>

          <h1>
            Build your perfect reading journey.
          </h1>

          <p className="hero-text">
            Organize your shelves, track progress, and discover your next
            favorite story.
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={scrollToShelf}
          >
            Start Reading
          </button>
        </div>
      </section>

      {/* Bookshelf section */}
      <section
        id="bookshelf-section"
        className="bookshelf-section"
        aria-labelledby="bookshelf-title"
      >
        <div className="section-header">
          <div>
            <p className="eyebrow">
              Your Library
            </p>

            <h2 id="bookshelf-title">
              My Bookshelf
            </h2>
          </div>
        </div>

        {/* Currently Reading */}
        <div className="shelf-group">
          <div className="shelf-heading">
            <h3>
              Currently Reading
            </h3>

            <p>
              Books you are actively reading.
            </p>
          </div>

          <div
            className="book-grid"
            aria-label="Currently reading books"
          >
            {currentlyReading.map((book, index) => (
              <BookCard
                key={book.isbn13 ?? `${book.title}-${index}`}
                title={book.title}
                author={book.author}
                cover={book.coverUrl ?? ''}
                status="reading"
                progress={book.progress}
                pageCount={book.pageCount}
                currentPage={book.currentPage}
                showShelfControls
                onMoveShelf={(newShelf) =>
                  moveBookToShelf(book.isbn13, newShelf)
                }
                onPageChange={(currentPage) =>
                  updateBookPage(book.isbn13, currentPage)
                }
              />
            ))}
          </div>
        </div>

        {/* Want to Read */}
        <div className="shelf-group">
          <div className="shelf-heading">
            <h3>
              Want to Read
            </h3>

            <p>
              Books saved for later.
            </p>
          </div>

          <div
            className="book-grid"
            aria-label="Want to read books"
          >
            {wantToRead.map((book, index) => (
              <BookCard
                key={book.isbn13 ?? `${book.title}-${index}`}
                title={book.title}
                author={book.author}
                cover={book.coverUrl ?? ''}
                status="want-to-read"
                progress={book.progress}
                pageCount={book.pageCount}
                currentPage={book.currentPage}
                showShelfControls
                onMoveShelf={(newShelf) =>
                  moveBookToShelf(book.isbn13, newShelf)
                }
              />
            ))}
          </div>
        </div>

        {/* Finished */}
        <div className="shelf-group">
          <div className="shelf-heading">
            <h3>
              Finished
            </h3>

            <p>
              Books you completed recently.
            </p>
          </div>

          <div
            className="book-grid"
            aria-label="Finished books"
          >
            {finishedBooks.map((book, index) => (
              <BookCard
                key={book.isbn13 ?? `${book.title}-${index}`}
                title={book.title}
                author={book.author}
                cover={book.coverUrl ?? ''}
                status="finished"
                progress={book.progress}
                pageCount={book.pageCount}
                currentPage={book.currentPage}
                showShelfControls
                onMoveShelf={(newShelf) =>
                  moveBookToShelf(book.isbn13, newShelf)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Discover section */}
      <section
        className="discover-section"
        aria-labelledby="discover-title"
      >
        <div className="section-header">
          <div>
            <p className="eyebrow">
              Discover
            </p>

            <h2 id="discover-title">
              Find your next read
            </h2>

            <p className="hero-text">
              Explore stories by genre, favorite authors, and cozy new finds.
            </p>
          </div>
        </div>

        <div
          className="discover-grid"
          aria-label="Recommended books to discover"
        >
          {discoverBooks.map((book, index) => (
            <BookCard
              key={book.isbn13 ?? `${book.title}-${index}`}
              title={book.title}
              author={book.author}
              cover={book.coverUrl ?? ''}
              status="want-to-read"
              showAddButton
              onAddToShelf={() =>
                addBookToShelf(book, 'want-to-read')
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
}


// ==============================
// EXPORT
// ==============================

export default Home;
