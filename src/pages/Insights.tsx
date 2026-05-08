
// IMPORTS


import books from '../data/sample-books.json';
import './Insights.css';



// SAMPLE ANALYTICS


const completedBooks = 18;

const pagesRead = books.reduce((total, book) => {
  return total + (book.pageCount ?? 0);
}, 0);

const genresExplored = 6;

const readingStreak = 14;



// COMPONENT


function Insights() {
  return (
    <main className="insights-page">
      {/* Page heading */}
      <section className="insights-header" aria-labelledby="insights-title">
        <h1 id="insights-title">Reading Insights</h1>

        <p>
          Explore your reading journey in numbers.
        </p>
      </section>

      {/* Stat cards */}
      <section
        className="insights-stats"
        aria-label="Reading statistics"
      >
        <article className="insight-stat-card">
          <span className="stat-icon purple" aria-hidden="true">📚</span>

          <div>
            <h2>{completedBooks}</h2>
            <p>Books Completed</p>
          </div>
        </article>

        <article className="insight-stat-card">
          <span className="stat-icon green" aria-hidden="true">📖</span>

          <div>
            <h2>{pagesRead.toLocaleString()}</h2>
            <p>Pages Read</p>
          </div>
        </article>

        <article className="insight-stat-card">
          <span className="stat-icon orange" aria-hidden="true">🖊️</span>

          <div>
            <h2>{genresExplored}</h2>
            <p>Genres Explored</p>
          </div>
        </article>

        <article className="insight-stat-card">
          <span className="stat-icon peach" aria-hidden="true">🔥</span>

          <div>
            <h2>{readingStreak}</h2>
            <p>Day Streak</p>
          </div>
        </article>
      </section>

      {/* Charts */}
      <section
        className="insights-charts"
        aria-label="Reading charts"
      >
        <article className="chart-panel">
          <div className="chart-header">
            <h2>Books Read Over Time</h2>

            <button type="button" className="year-button">
              This Year
            </button>
          </div>

          <div className="bar-chart" aria-hidden="true">
            <span style={{ height: '15%' }} />
            <span style={{ height: '48%' }} />
            <span style={{ height: '65%' }} />
            <span style={{ height: '72%' }} />
            <span style={{ height: '70%' }} />
            <span style={{ height: '88%' }} />
            <span style={{ height: '58%' }} />
            <span style={{ height: '32%' }} />
          </div>

          <div className="chart-months" aria-hidden="true">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
          </div>
        </article>

        <article className="chart-panel">
          <h2>Top Genres</h2>

          <div className="genre-chart-layout">
            <div className="donut-chart" aria-hidden="true" />

            <ul className="genre-list">
              <li><span className="dot fantasy" />Fantasy <strong>40%</strong></li>
              <li><span className="dot sci-fi" />Science Fiction <strong>25%</strong></li>
              <li><span className="dot romance" />Romance <strong>15%</strong></li>
              <li><span className="dot thriller" />Thriller <strong>10%</strong></li>
              <li><span className="dot nonfiction" />Non-Fiction <strong>10%</strong></li>
            </ul>
          </div>
        </article>
      </section>

      {/* Wrapped recap */}
      <section
        className="wrapped-section"
        aria-labelledby="wrapped-title"
      >
        <div className="wrapped-header">
          <div>
            <h2 id="wrapped-title">Your Reading Wrapped</h2>
            <p>Your 2026 reading highlights</p>
          </div>

          <button type="button" className="share-button">
            Share
          </button>
        </div>

        <div className="wrapped-grid">
          <article className="wrapped-card">
            <span aria-hidden="true">🏆</span>
            <p>Top Genre</p>
            <h3>Fantasy</h3>
          </article>

          <article className="wrapped-card">
            <span aria-hidden="true">👤</span>
            <p>Favorite Author</p>
            <h3>Brandon Sanderson</h3>
          </article>

          <article className="wrapped-card">
            <span aria-hidden="true">📘</span>
            <p>Longest Book</p>
            <h3>Dune</h3>
            <small>688 pages</small>
          </article>

          <article className="wrapped-card">
            <span aria-hidden="true">⚡</span>
            <p>Fastest Read</p>
            <h3>The Alchemist</h3>
            <small>2 days</small>
          </article>

          <article className="wrapped-card">
            <span aria-hidden="true">🔥</span>
            <p>Reading Streak</p>
            <h3>14 days</h3>
            <small>Keep it up!</small>
          </article>
        </div>
      </section>
    </main>
  );
}



// EXPORT


export default Insights;