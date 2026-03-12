const { default: mongoose } = require("mongoose")
const books = require("../model/books")
const Books = require("../model/books")

exports.getAllBooks = async(req,res)=>{
    try {
        const books = await Books.find()
        if(!books.length){
            return res.status(404).send("sorry not found a book")
        }
        res.json(books)
            
    } catch (error) {
        res.status(500).send("error:",error.message)
        
    }
}
exports.getSingleBook = async(req,res)=>{
    try {
        const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(400).send("The id is not valid");
        }

    const book = await Books.findById(id)
    if(!book){
        return res.status(404).send("sorry not found a book")
    }
    res.json(book)
        
    } catch (error) {
        res.status(500).send("error:",error.message

        )
        
    }
}


exports.createBook = async (req, res) => {
    try {

        // Mongoose will automatically validate title and author
        const newBook = await Books.create(req.body);

        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        
        if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(400).send("The id is not valid");
        }

       
        const updatingBook = await Books.findByIdAndUpdate(id, req.body, { new: true });

        
        if(!updatingBook){
            return res.status(404).send("Sorry, the book with this id not found");
        }

        
        res.status(200).json(updatingBook);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBooks = async(req,res)=>{
    try {
        const { id } = req.params;
         if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(400).send("The id is not valid");
        }
         const deletedBook = await Books.findByIdAndDelete(id)
          if(!deletedBook){
        
           return res.status(404).send("Sorry, the book with this id not found");
       
         }
         res.json(deletedBook)
        
    } catch (error) {
        res.status(500).send("error:",error.message);
        
    }

}

exports.deleteAllBooks= async(req,res)=>{
    try {
        await Books.deleteMany({});
        res.send("you deleted all the books")
        
    } catch (error) {
        res.status(500).send("error:",error.message)
        
    }

}