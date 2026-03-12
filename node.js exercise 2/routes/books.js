const express = require("express");
const { getAllBooks, createBook, updateBook, getSingleBook, deleteBooks, deleteAllBooks } = require("../controllers/books"); 
const router = express.Router();

router.get("/",getAllBooks);
router.get("/:id",getSingleBook);
router.post("/create",createBook);
router.put("/update/:id",updateBook);
router.delete("/deleteAll",deleteAllBooks);
router.delete("/:id",deleteBooks);

module.exports = router;