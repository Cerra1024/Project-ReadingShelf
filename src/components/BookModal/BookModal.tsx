
// IMPORTS


import './BookModal.css';



// TYPES


type BookModalProps = {
  isOpen: boolean;

  title: string;

  author: string;

  coverUrl: string | null;

  description: string | null;

  publishedDate?: string;

  pageCount?: number | null;

  onClose: () => void;

  onAddToShelf: (
    shelf: 'reading' | 'want-to-read' | 'finished'
  ) => void;
};



// COMPONENT

function BookModal({
  isOpen,
  title,
  author,
  coverUrl,
  description,
  publishedDate,
  pageCount,
  onClose,
  onAddToShelf,
}: BookModalProps) {
  // Don't render when closed
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      aria-hidden="true"
    >
      <section
        className="book-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* Close button */}
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close book details"
        >
          ✕
        </button>

        <div className="modal-layout">
          {/* Cover */}
          <div className="modal-cover-wrapper">
            {coverUrl ? (
              <img
                className="modal-cover"
                src={coverUrl}
                alt={`Cover of ${title}`}
              />
            ) : (
              <div className="modal-placeholder">
                No Cover
              </div>
            )}
          </div>

          {/* Details */}
          <div className="modal-content">
            <p className="modal-eyebrow">
              Book Details
            </p>

            <h2 id="book-modal-title">
              {title}
            </h2>

            <p className="modal-author">
              {author}
            </p>

            <div className="modal-meta">
              {pageCount && (
                <span>
                  {pageCount} pages
                </span>
              )}

              {publishedDate && (
                <span>
                  Published: {publishedDate}
                </span>
              )}
            </div>

            <p className="modal-description">
              {description ??
                'No description available.'}
            </p>

            {/* Shelf buttons */}
            <div className="modal-actions">
              <button
                type="button"
                onClick={() =>
                  onAddToShelf('want-to-read')
                }
              >
                Want to Read
              </button>

              <button
                type="button"
                onClick={() =>
                  onAddToShelf('reading')
                }
              >
                Currently Reading
              </button>

              <button
                type="button"
                onClick={() =>
                  onAddToShelf('finished')
                }
              >
                Finished
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



// EXPORT


export default BookModal;
