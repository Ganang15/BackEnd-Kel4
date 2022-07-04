const express = require("express");
const router = express.Router();
const transactionController = require("../app/controllers/api/v1/transactionController");
const transactionMiddleware = require("../middlewares/transactionMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/", userMiddleware.authorize, transactionMiddleware.getByRole);

router.post( "/", userMiddleware.authorize, userMiddleware.isBuyyer, transactionMiddleware.getProductByUser, transactionController.create);

router.delete("/:id", userMiddleware.authorize, userMiddleware.isBuyyer, transactionController.destroy);

module.exports = router;
