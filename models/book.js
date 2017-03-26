var mongoose        = require("mongoose");

//ADDED FOR AUTHENTICATION
var passportLocalMongoose   = require ("passport-local-mongoose");

var BookSchema = new mongoose.Schema({
     title: String, 
     imgurl: String,
     downurl:String,
     author:String,
     owner:String,
     tradestatus:String
  });
  

  
  
 module.exports  = mongoose.model('Book',BookSchema );