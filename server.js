// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const booksRouter = require("./router/books.router");
const usersRouter = require("./router/users.router");
const transactionsRouter = require('./router/transactions.router');
<<<<<<< HEAD
const authRouter = require("./router/auth.router");

const authMiddleware = require('./middleware/auth.middleware');
=======
const countTimesCookie = require('./middleware/coutTimesCookie');
const authMiddleware = require('./middleware/auth.middleware');

const db = require('./db.json');
>>>>>>> e310ae909da06351d2dea74b466b42c96694a5d7

app.set("views", "./views");
app.set("view engine", "pug");



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cookieParser()); 
app.use(express.static('public'));

<<<<<<< HEAD
app.get('/',authMiddleware.requireAuth, (req, res) => {
  res.render("index");
=======
app.use('/', countTimesCookie)

app.get('/', (req, res) => {
  res.cookie('user', '12345')
  res.render("layouts/nav-bar.pug", {
    users: db.get("users").value()
  });
>>>>>>> e310ae909da06351d2dea74b466b42c96694a5d7
});


app.use("/books",authMiddleware.requireAuth ,booksRouter);
app.use("/users",authMiddleware.requireAuth, usersRouter);
app.use("/transactions",authMiddleware.requireAuth, transactionsRouter);
app.use("/auth", authRouter);
// listen for requests :)

app.listen(3001, () => {
  console.log("Server listening on port " + 3001);
});
