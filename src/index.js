const express = require('express')
const mongoose = require("mongoose")
const route= require("./routes/route")

require("dotenv").config()

const app = express()

// Swagger setup
require('./swagger')(app);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.D_B,{
    useNewUrlParser: true
})
.then(()=>console.log("Connected to Database"))
.catch((e)=>console.log(e))

app.use("/", route)

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
