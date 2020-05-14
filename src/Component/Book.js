import React, { Component } from 'react'
import PropTypes from 'prop-types';
import noCover from '../images/no-cover-image.png';


class Book extends Component {
    static props = {
        book: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }
    updateShelf = event =>
    this.props.changeShelf(this.props.book, event.target.value);

    render() {
        const { book, books } = this.props;
        const title = book.title ? book.title : 'No title available';
        const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover;
        let currentShelf = 'none';

        for (let item of books) {
            if (item.id === book.id) {
                currentShelf = item.shelf;
                break;
            }
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{ backgroundImage: `url(${coverImg})` }}
                    />
                    <div className="book-shelf-changer">
                        <select onChange={this.changeShelf} defaultValue={currentShelf}>
                            <option value="none" disabled>
                                Move to...
          </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>                </div>
                <div className="book-title">{title}</div>
                {/* Check for authors and render each on separate line if exist*/
                    book.authors &&
                    book.authors.map((author, index) => (
                        <div className="book-authors" key={index}>
                            {author}
                        </div>
                    ))}
            </div>
        )
    }
}


export default Book;