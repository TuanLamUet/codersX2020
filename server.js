const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const booksRouter = require("./router/books.router");
const usersRouter = require("./router/users.router");
const transactionsRouter = require('./router/transactions.router');
const authRouter = require("./router/auth.router");

const authMiddleware = require('./middleware/auth.middleware');

const db = require('./db.js');
app.set("views", "./views");
app.set("view engine", "pug");



app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cookieParser('codersX2020')); 
app.use(express.static('public'));

app.get('/',authMiddleware.requireAuth, (req, res) => {

  res.render("layouts/nav-bar.pug", {
    user: db.get("users").find({userId: req.signedCookies.userId}).value()
  });
})


app.use("/books",authMiddleware.requireAuth ,booksRouter)
app.use("/users",authMiddleware.requireAuth, usersRouter)
app.use("/transactions",authMiddleware.requireAuth, transactionsRouter);
app.use("/auth", authRouter);
// listen for requests :)

app.listen(3000, () => {
  console.log('server is runing on port 3000')
})
