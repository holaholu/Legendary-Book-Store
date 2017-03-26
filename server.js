// Get dependencies
var express = require('express');
var path    = require("path");
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//connect to database
var mongoose = require("mongoose");

var url = process.env.MEMURL ;
 mongoose.connect(url).then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));;

  //=================================
var passport                    = require("passport"),
    LocalStrategy               = require("passport-local").Strategy;
   


  
 // Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//View Engine
app.set("view engine","ejs");
//public files
app.use (express.static("public"));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


//Import Model
var User  = require("./models/user");
var Book  = require("./models/book");

//Authenticate Section

  app.use(require("express-session")({
    secret: "Rusty the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Authentication


//==========SEED Part

// app.get("/book",function(req,res){
       
//   Book.create({title:"How to Turn Challenging Situations Around",author:"Gary and Lynne Bartlett",imgurl:"https://www.free-ebooks.net/2d_covers/large/1156798713.jpg",downurl:"https://www.free-ebooks.net/ebook/How-to-Turn-Challenging-Situations-Around/pdf"},function(err,book){
//       if (err){
//            res.send(err.message);
         
//       }else {
//        console.log(book);
//        res.redirect("/");
//       }
//   });
// })



//======================





app.post("/signup",function(req,res){
       // save/register user details and authenticate for instant login
  User.register(new User({username:req.body.username,email:req.body.email}),req.body.password,function(err,user){
      if (err){
           res.send(err.message);
         
      }else {
        passport.authenticate("local")(req,res,function(){
              res.send(req.user.username);
              // console.log(req.user)
       });
      }
  });
 
})



 app.post("/login",passport.authenticate("local",{}),function(req,res){
     //console.log(req.user)
      
        if (req.user==undefined){
          res.send("")
        } else {
              res.send(req.user.username);
              
        }
      
      });

app.get('/logout',(req,res)=>{
   req.logout();
 res.redirect("/");
  
});


app.get('/getuser',(req,res)=>{
  if (req.user== undefined){
    res.send("");
    
 }else {
res.send(req.user.username);

  }
  
});


app.post("/settings1",function(req,res){
  var store=req.user
       
User.findByIdAndRemove(req.user._id,function(err){
   if(err){
     console.log(err.message);
   }else {
     
   }

})

  User.register(new User({username:store.username,email:store.password,city:store.city,state:store.state}),req.body.password,function(err,user){
      if (err){
           res.send(err.message);
         
      }else {
        passport.authenticate("local")(req,res,function(){
              res.send(req.user.username);
              
       });
      }
  });
 
})

app.post("/settings2",function(req,res){
       
     
  User.findByIdAndUpdate(req.user.id,{username:req.user.username,email:req.user.email,city:req.body.city,state:req.body.state},function(err,user){
      if (err){
           res.send(err.message);
         
      }else {
          User.findById(req.user.id,function(err,currentuser){
            if(err){
              console.log(err.message);
            } else {
                  res.send(req.user.username);
                 
            }
          })

       
      }
  });
})

app.post("/findall",function(req,res){
       
  Book.find({owner:req.body.owner,tradestatus:req.body.status},function(err,books){
      if (err){
           res.send(err.message);
         
      }else {
       
       res.send(books);
       
      }
  });
})

app.get("/findtrade",function(req,res){
       
  Book.find({tradestatus:"true"},function(err,books){
      if (err){
           res.send(err.message);
         
      }else {
       
       res.send(books);
       
      }
  });
})


app.post("/claimtrade",function(req,res){
       
  Book.findByIdAndUpdate(req.body.id,{owner:req.user.username,tradestatus:"false"},function(err,book){
      if (err){
           res.send(err.message);
         
      }else {
          Book.findById(req.body.id,function(err,book){
            if(err){
              console.log(err.message);
            } else {
                  console.log(book);
            }
          })

       
      }
  });
})


app.post("/borrow",function(req,res){
       
  Book.findByIdAndUpdate(req.body.id,{owner:req.user.username},function(err,book){
      if (err){
           res.send(err.message);
         
      }else {
          Book.findById(req.body.id,function(err,book){
            if(err){
              console.log(err.message);
            } else {
                  
            }
          })

       
      }
  });
})

app.post("/return",function(req,res){
       
  Book.findByIdAndUpdate(req.body.id,{owner:"Library"},function(err,book){
      if (err){
           res.send(err.message);
         
      }else {
          Book.findById(req.body.id,function(err,book){
            if(err){
              console.log(err.message);
            } else {
                 
            }
          })

       
      }
  });
})

app.post("/trade",function(req,res){
       
  Book.findByIdAndUpdate(req.body.id,{tradestatus:"true"},function(err,book){
      if (err){
           res.send(err.message);
         
      }else {
          Book.findById(req.body.id,function(err,book){
            if(err){
              console.log(err.message);
            } else {
                 console.log(book);
            }
          })

       
      }
  });
})

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html')); //path installation required
  //res.sendFile("../dist/index.html'");
});






/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';



app.listen(port,function(){
  console.log("Server has started")
})