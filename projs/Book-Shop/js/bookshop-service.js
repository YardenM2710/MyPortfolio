"use strict";
const KEY = "books";
const PAGE_SIZE = 4;
var gBookNames = ["Dr.Seuss", "Badolina", "Game-Of-Thrones", "Harry-Potter"];
var gUpdateStatus = false;
var gBooks;
var gPageIdx = 0;
var gIsVisible = false;
var gIsUpdateVisible = false;

_createBooks();
function _createBooks() {
  var books = loadFromStorage(KEY);
  if (!books || !books.length) {
    books = [];
    for (let i = 0; i < 4; i++) {
      var bookName = gBookNames[i];
      books.push(_createBook(bookName, getRandomIntInclusive(100, 300)));
    }
  }
  gBooks = books;
  _saveBooksToStorage();
}

function _createBook(name, price) {
  return {
    id: makeId(),
    name,
    price,
  };
}
function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks);
}

function getBooks() {
  const fromIdx = gPageIdx * PAGE_SIZE;
  var books = gBooks.slice(fromIdx, fromIdx + PAGE_SIZE);
  return books;
}

function removeBook(id) {
  var bookIdx = gBooks.findIndex((book) => id === book.id);
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function addBook(name, price) {
  if (!name || !price) return;
  gBooks.push(_createBook(name, price));
  _saveBooksToStorage();
}

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE > gBooks.length) gPageIdx = 0;
}

function updateBooks(id, price, title) {
  if (!price && !title) return;
  var bookIdx = gBooks.findIndex((book) => {
    return id === book.id;
  });
  gBooks[bookIdx].price = price;
  gBooks[bookIdx].name = title;

  _saveBooksToStorage();
}

function getBookById(bookId) {
  var book = gBooks.find((book) => {
    return bookId === book.id;
  });
  return book;
}

function setRating(id, rating) {
  var bookIdx = gBooks.findIndex((book) => {
    return id === book.id;
  });
  gBooks[bookIdx].rating = rating;
  _saveBooksToStorage();
}
