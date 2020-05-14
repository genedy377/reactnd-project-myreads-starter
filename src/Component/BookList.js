import React from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";

const BookList = (props) => {
  const { books, changeShelf } = props;
  console.log("aaaa", books);
  const shelfTypes = [
    { type: "currentlyReading", title: "Currently Reading" },
    { type: "wantToRead", title: "Want to Read" },
    { type: "read", title: "Read" },
  ];

  return (
    <div className="list-books-content">
      {shelfTypes.map((shelf, index) => {
        const shelfBooks = books.filter((book) => book.shelf === shelf.type);
        console.log("aaaa", shelfBooks);
        return (
          <div className="bookshelf" key={shelf.type}>
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  <BookShelf
                    books={shelfBooks}
                    key={`book_shelf${shelf.type}`}
                    changeShelf={changeShelf}
                  />
                }
              </ol>
            </div>
          </div>
        );
      })}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookList;
