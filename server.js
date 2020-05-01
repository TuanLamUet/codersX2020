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
const countTimesCookie = require('./middleware/coutTimesCookie');
const authMiddleware = require('./middleware/auth.middleware');

const db = require('./db.json');

app.set("views", "./views");
app.set("view engine", "pug");



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cookieParser()); 
app.use(express.static('public'));

app.use('/', countTimesCookie)

app.get('/', (req, res) => {
  res.cookie('user', '12345')
  res.render("layouts/nav-bar.pug", {
    users: db.get("users").value()
  });
});


app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);
// listen for requests :)

app.listen(3001, () => {
  console.log("Server listening on port " + 3001);
});
