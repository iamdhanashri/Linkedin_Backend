const mongoose = require('mongoose');
require("dotenv").config()
// const connection = mongoose.connect(process.env.mongoUrl)

//const connection = mongoose.connect("mongodb+srv://dhanashri:ahire@cluster0.1t4wpeq.mongodb.net/linkedin?retryWrites=true&w=majority")
const connection = mongoose.connect(process.env.mongoUrl)
module.exports = {
    connection
}