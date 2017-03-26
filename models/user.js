var mongoose        = require("mongoose");

//ADDED FOR AUTHENTICATION
var passportLocalMongoose   = require ("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
     username: String, 
     email: String,
     password:String,
     city:String,
     state:String,
    //password2 :String,
  });
  
  //ADDED TO INCLUDE ALL AUTHENTICATION METHOD INTO SCHEMA
 UserSchema.plugin(passportLocalMongoose );
  
  
 module.exports  = mongoose.model('User',UserSchema );