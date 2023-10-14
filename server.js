require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));






app.listen(port , ()=>{
    console.log(`The server is running on the port number ${port}`)
})