import React, { Component } from "react";
import PropTypes from "prop-types";
import noCover from "../images/no-cover-image.png";

class Book extends Component {
  static props = {
    book: PropTypes.object.isRequired,
    libraryBooks: PropTypes.array,
    changeShelf: PropTypes.func.isRequired,
  };
  updateShelf = (event) =>
    this.props.changeShelf(this.props.book, event.target.value);

  render() {
    const { book, libraryBooks } = this.props;
    const title = book.title ? book.title : "No title available";
    const coverImg =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : noCover;
    let currentShelf = book.shelf;
    if (typeof libraryBooks !== "undefined") {
      let libraryBook = libraryBooks.find((b) => b.id === book.id);
      currentShelf = libraryBook ? libraryBook.shelf : "none";
    }
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${coverImg})`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={this.updateShelf} value={currentShelf}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {/* Check for authors and render each on separate line if exist*/
        book.authors &&
          book.authors.map((author, index) => (
            <div className="book-authors" key={index}>
              {author}
            </div>
          ))}
      </div>
    );
  }
}

export default Book;
