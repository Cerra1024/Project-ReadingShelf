
// IMPORTS


import './BookCard.css';



// TYPES


type BookCardProps = {
  title: string;
  author: string;
  cover: string;
  status: 'reading' | 'want-to-read' | 'finished';
  progress?: number;
};



// COMPONENT


function BookCard({ title, author, cover, status, progress = 0 }: BookCardProps) {
  return (
    <article className="book-card">
      {/* Book cover */}
      <img
        className="book-cover"
        src={cover}
        alt={`Cover of ${title}`}
      />

      {/* Book details */}
      <div className="book-info">
        <p className="book-status">{status.replaceAll('-', ' ')}</p>

        <h3>{title}</h3>

        <p className="book-author">{author}</p>

        {status === 'reading' && (
          <div className="progress-area">
            <div className="progress-label">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>

            <div
              className="progress-track"
              aria-label={`${title} reading progress is ${progress}%`}
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}


// EXPORT


export default BookCard;