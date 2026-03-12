const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./routes/books");
require("dotenv").config()
const port = process.env.PORT;
const mongoose_url = process.env.MONGOOSE_URL;

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin:["https://localhost:3000"]
    }
))

app.use(morgan("common"))

mongoose.connect(mongoose_url)
.then(()=> console.log("you connected to mongoose ✅"))
.catch((e)=> console.log("❌error to connect mongoose",e))

app.listen(port,()=>{
    console.log(`this server is running on http://localhost:${port}`);
    
})

app.use("/books",router);

app.get("/",(req,res)=>{
    res.send("this is for testing")
    console.log("this is for testing");
    
})