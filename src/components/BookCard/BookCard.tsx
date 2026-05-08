
// IMPORTS


import './BookCard.css';



// TYPES


type BookCardProps = {
  title: string;
  author: string;
  cover: string;

  status: 'reading' | 'want-to-read' | 'finished';

  progress?: number;

  pageCount?: number | null;

  currentPage?: number;

  showAddButton?: boolean;

  onAddToShelf?: () => void;

  showShelfControls?: boolean;

  onMoveShelf?: (
    shelf: 'reading' | 'want-to-read' | 'finished'
  ) => void;

  onPageChange?: (
    currentPage: number
  ) => void;
};



// COMPONENT

function BookCard({
  title,
  author,
  cover,
  status,
  progress = 0,
  pageCount,
  currentPage = 0,
  showAddButton = false,
  onAddToShelf,
  showShelfControls = false,
  onMoveShelf,
  onPageChange,
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

        {/* Reading progress */}
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

            {pageCount ? (
              <label className="page-progress-label">
                <span>
                  Current page
                </span>

                <div className="page-progress-input">
                  <input
                    type="number"
                    min={0}
                    max={pageCount}
                    value={currentPage}
                    onChange={(event) =>
                      onPageChange?.(
                        Number(event.target.value)
                      )
                    }
                    aria-label={`Current page for ${title}`}
                  />

                  <span>
                    of {pageCount}
                  </span>
                </div>
              </label>
            ) : (
              <p className="page-progress-fallback">
                Page count unavailable
              </p>
            )}
          </div>
        )}

        {/* Add to shelf button */}
        {showAddButton && (
          <button
            type="button"
            className="add-button"
            onClick={onAddToShelf}
          >
            Add to Shelf
          </button>
        )}

        {/* Shelf controls */}
        {showShelfControls && (
          <div className="shelf-controls">
            <button
              type="button"
              onClick={() => onMoveShelf?.('reading')}
            >
              Reading
            </button>

            <button
              type="button"
              onClick={() => onMoveShelf?.('want-to-read')}
            >
              Want
            </button>

            <button
              type="button"
              onClick={() => onMoveShelf?.('finished')}
            >
              Finished
            </button>
          </div>
        )}
      </div>
    </article>
  );
}



// EXPORT


export default BookCard;