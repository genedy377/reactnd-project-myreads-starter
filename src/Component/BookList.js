import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

const BookList = props => {
    const { books, changeShelf } = props;
    const shelfTypes = [
        { type: 'currentlyReading', title: 'Currently Reading' },
        { type: 'wantToRead', title: 'Want to Read' },
        { type: 'read', title: 'Read' }
    ];

    return (
        <div className="list-books-content">
            {shelfTypes.map((shelf, index) => {
                const shelfBooks = books.filter(book => book.shelf === shelf.type);
                return (
                    <div className="bookshelf" key={index}>
                        <h2 className="bookshelf-title">{shelf.title}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.map(book => (
                                    <Book
                                        book={book}
                                        books={shelfBooks}
                                        key={book.id}
                                        changeShelf={changeShelf}
                                    />
                                ))}
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
    changeShelf: PropTypes.func.isRequired
};

export default BookList;
