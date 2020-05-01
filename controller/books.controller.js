const uuid = require('uuid/v4');
const db = require("../db.js");

let getAllBooks = (req, res) => {
  res.render("books/books", {
    books: db.get("books").value(),
    user: db.get("users").find({userId: req.cookies.userId}).value()
  });
}

let addNewBook =(req, res) => {
  let title = req.body.title;
  let bookId = uuid();
  let description = req.body.description;
  db.get('books').push({bookId, title, description}).write()
  return res.redirect('/books');
};

let deleteBook =(req, res) => {
  let bookId = req.params.bookId;
  db.get('books').remove({bookId}).write()
  return res.redirect('/books');
};

let changeTitlePage =(req, res) => {
  let bookId = req.params.bookId;
  return res.render("books/book-title.pug", {
    bookId: bookId,
    user: db.get("users").find({userId: req.cookies.userId}).value()
  })
};

let updateTitle = (req, res) => {
  let bookId = req.params.bookId;
  let newTitle = req.body.title;
  db.get('books').find({ bookId}).assign({title: newTitle}).write();
  return res.redirect("/books");
};

module.exports = {
  getAllBooks,
  addNewBook,
  deleteBook,
  changeTitlePage,
  updateTitle
};