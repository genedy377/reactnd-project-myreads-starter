import React from "react";
import Book from "./Book";
export default function BookShelf({ changeShelf, books }) {
  return (
    <>
      {books.map((book) => (
        <Book book={book} key={book.id} changeShelf={changeShelf} />
      ))}
    </>
  );
}
