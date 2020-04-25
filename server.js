// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const bookRouter = require("./router/books.router");
const userRouter = require("./router/users.router");
const transactionRouter = require('./router/transactions.router');

app.set("views", "./views");
app.set("view engine", "pug");

app.get('/', (request, response) => {
  response.render("index");
});

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);
// listen for requests :)
app.listen(3001, () => {
  console.log("Server listening on port " + 3001);
});
