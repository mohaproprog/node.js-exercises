const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' }
];

// start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


// get all books
app.get("/", (req, res) => {
    console.log("Fetching all books");
    if(!books.length) return res.status(400).send("no book in the list")
    res.json(books);
});


// get a single book
app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;

    console.log("Fetching single book");

    const selectedBook = books.find(book => book.id == bookId);

    if (!selectedBook) return res.status(404).send("Book not found");

    res.json(selectedBook);
});


// add a new book
app.post("/books/addBook", (req, res) => {
    const bookData = req.body;
    if(!bookData.title || !bookData.author) return res.status(400).send("please add title and author")

    const newBook = {
        id: books.length + 1,
        title: bookData.title,
        author: bookData.author
    };

    console.log("New book registered");

    res.json(newBook);

    // add to array
    books.push(newBook);
});


// update a book
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const updatedData = req.body;

    const existingBook = books.find(book => book.id == bookId);

    if (!existingBook) return res.status(404).send("Book not found");
    if(!updatedData.title) return res.status(400).send("title of the book is required")
    existingBook.title = updatedData.title;
    existingBook.author = updatedData.author || "hidden author";

    res.json(updatedData);

    console.log("Updated book with id", bookId);
});


// delete a book
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;

    const bookToDelete = books.find(book => book.id == bookId);

    if (!bookToDelete) return res.status(404).send("Book not found");

    books = books.filter(book => book.id != bookId);

    res.send("Delete successful");

    console.log("Deleted book with id", bookId);
});