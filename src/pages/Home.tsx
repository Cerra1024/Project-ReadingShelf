
// IMPORTS


import BookCard from '../components/BookCard/BookCard';
import './Home.css';



// COMPONENT


function Home() {
  return (
    <main className="home-page">
      {/* Hero section introduces the app */}
      <section className="hero-section" aria-labelledby="home-hero-title">
        <div className="hero-content">
          <p className="eyebrow">Your cozy reading corner</p>

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

        {/* Shelf overview cards */}
        <div className="shelf-list" aria-label="Book shelves">
          <article className="shelf-card">
            <div>
              <h3>Currently Reading</h3>
              <p>Books you are actively reading.</p>
            </div>

            <span aria-label="3 books">3</span>
          </article>

          <article className="shelf-card">
            <div>
              <h3>Want to Read</h3>
              <p>Books saved for later.</p>
            </div>

            <span aria-label="6 books">6</span>
          </article>

          <article className="shelf-card">
            <div>
              <h3>Finished</h3>
              <p>Books you completed.</p>
            </div>

            <span aria-label="8 books">8</span>
          </article>
        </div>

        {/* Preview book cards */}
        <div
          className="book-grid"
          aria-label="Books currently on your shelf"
        >
          <BookCard
            title="The Midnight Library"
            author="Matt Haig"
            cover="https://covers.openlibrary.org/b/id/10521270-L.jpg"
            status="reading"
            progress={42}
          />

          <BookCard
            title="Atomic Habits"
            author="James Clear"
            cover="https://covers.openlibrary.org/b/id/8231996-L.jpg"
            status="want-to-read"
          />

          <BookCard
            title="Dune"
            author="Frank Herbert"
            cover="https://covers.openlibrary.org/b/id/8101354-L.jpg"
            status="finished"
          />
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

        <div className="placeholder-card">
          <p>
            Google Books API search results will appear here.
          </p>
        </div>
      </section>
    </main>
  );
}



// EXPORT


export default Home;