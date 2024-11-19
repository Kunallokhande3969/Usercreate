 
  const mongoose = require('mongoose');

   function dbconnection(){

  mongoose.connect("mongodb://localhost/AA");

  console.log("conncted to database");

   }

   dbconnection()

   module.exports = mongoose.connection;
