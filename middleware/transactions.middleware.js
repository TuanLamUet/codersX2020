const db = require('../db');

let checkParams = (req, res, next) => {
  let transId = req.params.transId;
  let pass = db.get('transactions').find({transId: transId}).value();
  if(!pass) {
    return res.redirect("/transactions");
  } 
  next();
}

module.exports = checkParams;