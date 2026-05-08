
// IMPORTS


import BookCard from '../components/BookCard/BookCard';

import books from '../data/sample-books.json';

import { useBooks } from '../context/BooksContext';

import './Home.css';



// COMPONENT


function Home() {
  // Global shelf state
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

  return (
    <main className="home-page">
      {/* Hero section introduces the app */}
      <section
        className="hero-section"
        aria-labelledby="home-hero-title"
      >
        <div className="hero-content">
          <p className="eyebrow">
            Your cozy reading corner
          </p>

          <h1 id="home-hero-title">
            Welcome to Autumn&apos;s Nook
          </h1>

          <p className="hero-text">
            Track your books, organize your shelves, and reconnect with your
            reading journey one chapter at a time.
          </p>

          <button className="primary-button" type="button">
            Start Reading
          </button>
        </div>

        <div className="hero-card" aria-hidden="true">
          <span className="hero-icon">🍂</span>
          <p>Read. Reflect. Reconnect.</p>
        </div>
      </section>

      {/* Bookshelf section */}
      <section
        className="bookshelf-section"
        aria-labelledby="bookshelf-title"
      >
        <div className="section-header">
          <div>
            <p className="eyebrow">My Library</p>

            <h2 id="bookshelf-title">
              My Bookshelf
            </h2>
          </div>

          <button className="text-button" type="button">
            View all
          </button>
        </div>

        {/* Currently Reading */}
        <div className="shelf-group">
          <div className="shelf-heading">
            <h3>Currently Reading</h3>
            <p>Books you are actively reading.</p>
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
                showShelfControls={true}
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

        {/* Want To Read */}
        <div className="shelf-group">
          <div className="shelf-heading">
            <h3>Want to Read</h3>
            <p>Books saved for later.</p>
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
                showShelfControls={true}
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

        {/* Finished */}
        <div className="shelf-group">
          <div className="shelf-heading">
            <h3>Finished</h3>
            <p>Books you completed recently.</p>
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
                showShelfControls={true}
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
      </section>

      {/* Discover section */}
      <section
        className="discover-section"
        aria-labelledby="discover-title"
      >
        <div className="section-header">
          <div>
            <p className="eyebrow">Discover</p>

            <h2 id="discover-title">
              Discover Books
            </h2>
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
              showAddButton={true}
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



// EXPORT


export default Home;