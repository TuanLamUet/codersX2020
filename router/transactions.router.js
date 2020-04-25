const router = require("express").Router();

const transactionController = require("../controller/transactions.controller");
const checkParams = require('../middleware/transactions.middleware');

router.get("/", transactionController.getAllTransactions);

router.get("/create", transactionController.createNewTransactionPage);

router.get("/:transId/complete",checkParams,transactionController.Complete);

router.post("/create", transactionController.createNewTransaction);

module.exports = router;
