 const express = require("express");
 const app = express();
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");
 const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs'); 
app.use(express.static('./views'));


 mongoose.connect("mongodb+srv://jkantlehner:GN10t90LDnjfaQ5W@cluster0.dkcj4xj.mongodb.net/Hobbly", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Error connecting to database:', error);
    });

 //Create a data schema
 const usersSchema = new mongoose.Schema({
     first_name: String,
     last_name: String,
     email: String,
     username: String,
     password: String,
     cpassword: String
 }, {collection: 'Users'});


 const User = mongoose.model("User", usersSchema);
 app.get('/register', function(req,res){
    res.render('register');
});
app.get('/login', function(req,res){
    res.render('login');
});
//  app.get("/", function(req, res) {

//      res.sendFile(__dirname + "/html-mongo/register.html")
//  })



app.get('/dashboard', function (req, res) {
    res.render('dashboard');
});

 app.post("/register", function(req, res) {  

     //  const password = req.body.password;
     //  const cpassword = req.body.cpassword;
     //  if (password !== cpassword) {
     //      res.send("passwords do not match");
     //      return;
     //  }


     const user = new User({
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         email: req.body.email,
         username: req.body.username,
         password: req.body.password,
         cpassword: req.body.cpassword

     });

     user.save()
     .then((result) => {
     res.status(201).json({
         message: 'user added successfully',
         record_id: result.record_id,
     });
     })
     .catch((error) => {
     res.status(500).json({
         message: 'Error adding user',
         error: error,
     });
     });
 

    //  res.redirect("/");

 })


 app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Check if user exists in database
    const user = User.findOne({ username: username });
    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    // Check if password matches hashed password in database
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    res.status(200).json({
        message: "Login successful"
    });
});


 // the server url is http://localhost:3000 
 app.listen(3000, function() {
    console.log("server is running on 3000");
 })