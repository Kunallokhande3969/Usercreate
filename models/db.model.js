
 const mongoose = require('mongoose');


const UserShema =   mongoose.Schema({
 email : String,
 password  : String,
  })

   module.exports = mongoose.model('user' , UserShema );