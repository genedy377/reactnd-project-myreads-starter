import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

class Search extends Component {
  static props = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };

  state = {
    query: "",
    newBooks: [],
    searchErr: false,
  };

  getBooks = (event) => {
    const query = event.target.value;
    this.setState({ query });

    if (query) {
      BooksAPI.search(query.trim(), 20).then((books) => {
        books.length > 0
          ? this.setState({ newBooks: books, searchErr: false })
          : this.setState({ newBooks: [], searchErr: true });
      });
    } else {
      this.setState({ newBooks: [], searchErr: false });
    }
  };
  render() {
    const { query, newBooks, searchErr } = this.state;
    const { books, changeShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.getBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          {newBooks.length > 0 && (
            <div>
              {this.state.query.length > 0 && (
                <h3>Search returned {newBooks.length} books </h3>
              )}
              <ol className="books-grid">
                {this.state.query.length > 0 &&
                  newBooks.map((book) => (
                    <li>
                      <Book
                        book={book}
                        libraryBooks={books}
                        key={book.id}
                        changeShelf={changeShelf}
                      />
                    </li>
                  ))}
              </ol>
            </div>
          )}
          {searchErr && (
            <h3>Search did not return any books. Please try again!</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
