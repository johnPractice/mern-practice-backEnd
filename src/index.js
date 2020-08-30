const express = require("express");
const cors = require("cors");

// create app express
const app = express();
//env config
require("dotenv").config();

// middelware
app.use(cors());
app.use(express.json());
// variable for production mode
const mode = 'dev';
const port = process.env.PORT || 5000;
const dbAdress = mode === 'production' ? process.env.DB_ADDRES : process.env.DB_LOCAL;
// clear the console
console.clear();
// console.log(dbAdress);


// getting-started.js
const mongoose = require("mongoose");
// import model

// mongoose.connect("mongodb://127.0.0.1:27017/testing", {
mongoose.connect(dbAdress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;
// check for any error
db.on("error", console.error.bind(console, "connection error:"));
// event for open the db
db.once("open", function() {
    // we're connected!
    console.info("conected :)");
});

// api router
app.get("/", (rea, res) => {
    res.json("Helo \n welcome to MERN practice");
});

// import the route file
const userRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercises');
app.use('/users', userRouter);
app.use('/exercise', exerciseRouter);

// listen app
app.listen(port, () => {
    console.info(`server is running at port ${port} \n enjoy it:)`);
});