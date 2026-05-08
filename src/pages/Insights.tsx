// ==============================
// IMPORTS
// ==============================

import { useBooks } from '../context/BooksContext';

import './Insights.css';


// ==============================
// COMPONENT
// ==============================

function Insights() {
  const { shelfBooks } = useBooks();

  // Completed books
  const completedBooks = shelfBooks.filter(
    (book) => book.shelf === 'finished'
  ).length;

  // Total pages read
  const pagesRead = shelfBooks.reduce(
    (total, book) => {
      return total + (book.currentPage ?? 0);
    },
    0
  );

  // Genre count
  const genres = new Set(
    shelfBooks
      .map((book) => book.genre)
      .filter(Boolean)
  );

  const genresExplored = genres.size;

  // Mock streak for now
  const dayStreak = 14;

  return (
    <main className="insights-page">
      {/* Hero */}
      <section className="insights-hero">
        <p className="eyebrow">
          Reading Insights
        </p>

        <h1>
          Reading Insights
        </h1>

        <p>
          Explore your reading journey in numbers.
        </p>
      </section>

      {/* Top stat cards */}
      <section
        className="stats-grid"
        aria-label="Reading statistics"
      >
        {/* Completed books */}
        <article className="stat-card">
          <div className="stat-icon purple">
            📚
          </div>

          <div>
            <h2>
              {completedBooks}
            </h2>

            <p>
              Books Completed
            </p>
          </div>
        </article>

        {/* Pages read */}
        <article className="stat-card">
          <div className="stat-icon green">
            📖
          </div>

          <div>
            <h2>
              {pagesRead.toLocaleString()}
            </h2>

            <p>
              Pages Read
            </p>
          </div>
        </article>

       {/* Reading Goal */}
    <article className="stat-card">
      <div className="stat-icon orange">
        🎯
      </div>

        <div>
      <h2>
        68%
      </h2>

          <p>
            Annual Goal Progress
          </p>
        </div>
      </article>

        {/* Streak */}
        <article className="stat-card">
          <div className="stat-icon peach">
            🔥
          </div>

          <div>
            <h2>
              {dayStreak}
            </h2>

            <p>
              Day Streak
            </p>
          </div>
        </article>
      </section>

      {/* Charts section */}
      <section className="insights-panels">
        {/* Reading chart */}
        <article className="panel-card">
          <div className="panel-header">
            <h2>
              Books Read Over Time
            </h2>

            <button type="button">
              This Year
            </button>
          </div>

          <div className="mock-chart">
            <div style={{ height: '35%' }} />
            <div style={{ height: '52%' }} />
            <div style={{ height: '65%' }} />
            <div style={{ height: '64%' }} />
            <div style={{ height: '74%' }} />
            <div style={{ height: '48%' }} />
            <div style={{ height: '26%' }} />
          </div>

          <div className="chart-labels">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </article>

        {/* Genre panel */}
        <article className="panel-card">
          <h2>
            Top Genres
          </h2>

          <div className="genre-layout">
            <div className="genre-circle" />

            <div className="genre-list">
              <div>
                <span className="dot purple-dot" />
                Fantasy
              </div>

              <div>
                <span className="dot orange-dot" />
                Romance
              </div>

              <div>
                <span className="dot teal-dot" />
                Sci-Fi
              </div>

              <div>
                <span className="dot brown-dot" />
                Fiction
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Wrapped section */}
      <section className="wrapped-section">
        <div className="wrapped-card">
          <div className="wrapped-header">
            <div>
              <p className="wrapped-eyebrow">
                Your Reading Wrapped
              </p>

              <h2>
                Your 2025 reading highlights
              </h2>
            </div>

            <button type="button">
              Share
            </button>
          </div>

          <div className="wrapped-grid">
            <article>
              <span>🏆</span>

              <h3>
                Top Genre
              </h3>

              <p>
                Fantasy
              </p>
            </article>

            <article>
              <span>👤</span>

              <h3>
                Favorite Author
              </h3>

              <p>
                Brandon Sanderson
              </p>
            </article>

            <article>
              <span>📘</span>

              <h3>
                Longest Book
              </h3>

              <p>
                Dune
              </p>
            </article>

            <article>
              <span>⚡</span>

              <h3>
                Fastest Read
              </h3>

              <p>
                The Alchemist
              </p>
            </article>

            <article>
              <span>🔥</span>

              <h3>
                Reading Streak
              </h3>

              <p>
                14 Days
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Insights;
