import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "./Component/NotFound";
import BookList from "./Component/BookList";
import Search from "./Component/Search";

class BooksApp extends Component {
  state = { books: [] };

  componentDidMount() {
    // get books on load
    BooksAPI.getAll().then((books) => this.setState({ books }));
  }

  changeShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then((response) => {
      // set shelf for new or updated book
      changedBook.shelf = shelf;
      // update state with changed book
      this.setState((prevState) => ({
        books: prevState.books
          // remove updated book from array
          .filter((book) => book.id !== changedBook.id)
          // add updated book to array
          .concat(changedBook),
      }));
    });
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <Search books={books} changeShelf={this.changeShelf} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <BookList books={books} changeShelf={this.changeShelf} />
                <div className="open-search">
                  <Link to="/search">
                    <button>Search</button>
                  </Link>
                </div>
              </div>
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
