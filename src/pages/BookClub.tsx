
// IMPORTS


import books from '../data/sample-books.json';
import './BookClub.css';



// SAMPLE DATA


const clubPick = books[19];

const feedBooks = books.slice(20, 24);

const reviewBooks = books.slice(24, 27);



// COMPONENT


function BookClub() {
  return (
    <main className="book-club-page">
      {/* Page heading */}
      <section className="book-club-header" aria-labelledby="book-club-title">
        <h1 id="book-club-title">Book Club</h1>

        <p>
          Join the conversation, explore monthly picks, and see what other
          readers are loving.
        </p>
      </section>

      <div className="book-club-layout">
        {/* Monthly club pick */}
        <section className="club-pick-card" aria-labelledby="club-pick-title">
          <p className="eyebrow">Monthly Club Pick</p>

          <div className="club-pick-content">
            {clubPick.coverUrl ? (
              <img
                src={clubPick.coverUrl}
                alt={`Cover of ${clubPick.title}`}
              />
            ) : (
              <div className="club-cover-placeholder">
                No cover
              </div>
            )}

            <div>
              <h2 id="club-pick-title">{clubPick.title}</h2>

              <p className="club-author">{clubPick.author}</p>

              <p className="club-description">
                {clubPick.description ?? 'No description available yet.'}
              </p>

              <button type="button" className="club-button">
                Join Discussion
              </button>
            </div>
          </div>
        </section>

        {/* Community feed */}
        <aside className="community-feed-card" aria-labelledby="feed-title">
          <h2 id="feed-title">Community Feed</h2>

          <div className="feed-list">
            {feedBooks.map((book, index) => (
              <article className="feed-item" key={book.isbn13 ?? book.title}>
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt=""
                    aria-hidden="true"
                  />
                ) : (
                  <div className="feed-placeholder" aria-hidden="true" />
                )}

                <div>
                  <p>
                    <strong>{['Maya', 'Jordan', 'Alex', 'Taylor'][index]}</strong>{' '}
                    {['reviewed', 'finished', 'added', 'started'][index]}{' '}
                    <span>{book.title}</span>
                  </p>

                  <small>{['2h ago', '5h ago', '8h ago', '1d ago'][index]}</small>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>

      {/* Reviews */}
      <section className="reviews-section" aria-labelledby="reviews-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Reader Reviews</p>

            <h2 id="reviews-title">Recent Reviews</h2>
          </div>

          <button type="button" className="text-button">
            View all reviews
          </button>
        </div>

        <div className="review-grid">
          {reviewBooks.map((book, index) => (
            <article className="review-card" key={book.isbn13 ?? book.title}>
              <div className="review-header">
                <div className="avatar" aria-hidden="true">
                  {['M', 'A', 'J'][index]}
                </div>

                <div>
                  <h3>{['Maya', 'Alex', 'Jordan'][index]}</h3>
                  <p>{['2h ago', '1d ago', '2d ago'][index]}</p>
                </div>
              </div>

              <p className="stars" aria-label="5 out of 5 stars">
                ★★★★★
              </p>

              <p className="review-text">
                {[
                  'Absolutely loved it. The world felt rich and unforgettable.',
                  'Great read. The ending left me thinking about it all day.',
                  'A bit slow in the middle, but worth sticking with.',
                ][index]}
              </p>

              <p className="review-book">
                Review for <strong>{book.title}</strong>
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}



// EXPORT


export default BookClub;