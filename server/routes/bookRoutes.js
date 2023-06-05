const express = require("express");
const { bookController } = require("../controllers/bookController");

const bookRoutes = express.Router();

bookRoutes.get("/", bookController.getAllBook);

bookRoutes.get("/:id", bookController.getBookById);

bookRoutes.post("/", bookController.addBook);

bookRoutes.delete("/:id", bookController.deleteBookById);

module.exports = {
  bookRoutes,
};
