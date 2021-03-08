const express = require("express");
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const userRouter = require("./routes/userRoute");
const homeRouter = require("./routes/homeRoute");
const entryRouter = require("./routes/entryRoute");
const adminRouter = require("./routes/adminRoute");


app.use(cookieParser())

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))

app.set("view engine", "ejs")

app.use(userRouter);
app.use(homeRouter);
app.use(entryRouter);
app.use(adminRouter);


mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return console.log(err);

        app.listen(8003, () => {
            console.log("App running")
        })
    })
