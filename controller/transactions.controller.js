const uuid = require('shortid');
const db = require('../db.js');

let getAllTransactions= (req, res) => {
  let trans = db.get("transactions").value()
  trans.filter(item => item.userId === req.signedCookies.userId)
  return res.render("transactions/index", {
    transactions: trans,
    user: db.get("users").find({userId: req.signedCookies.userId}).value()
  })
};

let createNewTransactionPage =(req, res) => {
  return res.render("transactions/create", {
    users: db.get('users').value(),
    books: db.get('books').value(),
    user: db.get("users").find({userId: req.signedCookies.userId}).value()
  });
};

let createNewTransaction = (req, res) => {
  db.get('transactions').push({transId: uuid.generate(),bookId: req.body.bookId, userId: req.body.userId }).write();
  return res.redirect("/transactions");  
};

let Complete = (req, res) => {
  let transId = req.params.transId;
  let errors = [];
  let pass = db.get("transactions").find({transId}).value();
  if(pass) { 
    db.get("transactions")
      .find({ transId })
      .assign({ isComplete: true })
      .write();
    return res.redirect("/transactions");
  } else {
    errors.push('Id này không tồn tại');
    return res.render("transactions/", {
      errors: errors,
      transactions: db.get("transactions").value(),
      user: db.get("users").find({userId: req.signedCookies.userId}).value()
    })
  }
};


module.exports = {
  getAllTransactions,
  createNewTransactionPage,
  createNewTransaction,
  Complete
}