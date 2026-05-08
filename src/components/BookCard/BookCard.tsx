
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


function BookCard({
  title,
  author,
  cover,
  status,
  progress = 0,
}: BookCardProps) {
  return (
    <article className="book-card">
      {/* Book cover area */}
      <div className="book-cover-wrapper">
        {cover ? (
          <img
            className="book-cover"
            src={cover}
            alt={`Cover of ${title}`}
          />
        ) : (
          <div
            className="book-placeholder"
            aria-label={`No cover available for ${title}`}
          >
            <span>{title}</span>
          </div>
        )}
      </div>

      {/* Book details */}
      <div className="book-info">
        <p className="book-status">
          {status.replaceAll('-', ' ')}
        </p>

        <h3 title={title}>
          {title}
        </h3>

        <p className="book-author">
          {author}
        </p>

        {/* Reading progress only appears for active books */}
        {status === 'reading' && (
          <div className="progress-area">
            <div className="progress-label">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label={`${title} reading progress`}
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