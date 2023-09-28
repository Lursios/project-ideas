//jshint esversion:6 Third Party Authorization 
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const passportLocalMangoose = require("passport-local-mongoose");

const app = express();
const port = 3000 ;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: process.env.DB_SECRET_KEY,
    resave : false,
    saveUninitialized :false
}));

app.use(passport.initialize());
app.use(passport.session());

const dbName = "whisper-project";

// For database section 
mongoose.connect("mongodb://127.0.0.1:27017/"+ dbName);
// mongoose.set("useCreateIndex",true);

const userSchema = new mongoose.Schema({
    email : String,
    password : String,
    username: String,
    providerId : String,
    provider : String
});

const secretSchema = new mongoose.Schema({
    userId : String,
    secret : String
});

userSchema.statics.findOrCreate = require("find-or-create");
userSchema.plugin(passportLocalMangoose);

const User = new mongoose.model("User",userSchema);
const Secret = new mongoose.model("Secret",secretSchema);

passport.use(User.createStrategy());


// This one is like making the cookies 
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, name: user.displayName });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

//This part is for the Oauth setup comes in

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL : "https://www.googleapis.com/oauth2/v3/userinfo"
  },
function(accessToken, refreshToken, profile, cb) {   // Access token --> token that allow us to get data
    User.findOne({providerId: profile.id}).then((foundUser, err) => {
        if (!foundUser) { // If no user was found then it will create a new value based on the data
            foundUser = new User({
                email : profile.emails[0].value,
                username : profile.displayName,
                providerId : profile.id,
                provider : profile.provider
            });

            foundUser.save().then((result, err) => {
                if(err) {
                    console.log(err);
                }
                return cb(err,foundUser);
            });
        } else {
            return cb(err,foundUser);
        };
    });
}));

/// Route for Homepage
app.route("/")

.get(function(req, res){
    res.render("home");
});
// Route for Login Page
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile',"email"] }));

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect secrets page
    res.redirect('/secrets');
  });


app.route("/login")

.get(function(req, res){
    res.render("login");
})

.post(function(req, res) {

    const user = new User ({
        username : req.body.username,
        password : req.body.password
    });

    req.login(user, function(err){
        if (err) {
            console.log(err);
            console.log("wrong password");
        } else {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            });
        };
    });
});

//Route for Registration Page
app.route("/register")

.get(function(req, res){
    res.render("register");
})


.post(function(req, res){
    User.register({username:req.body.username}, req.body.password, function(err,user){ // register the user to the database and with the key value pair username & password
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        };
    });
});

app.get("/secrets", function(req, res){
    if (req.isAuthenticated()){ 
        Secret.find({"secret":{$ne :""}}).then((foundSecret,err)=> {
            if (err) {
                console.log(err)
            } else {
                res.render("secrets",{listOfSecret:foundSecret});
            };

        });
    } else {
        res.redirect("/login");
    };
});

app.get("/submit", function(req, res){
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

app.post("/submit", function(req, res){
    const secret = new Secret({
        userId : req.user.id,
        secret : req.body.secret
    });
    
    secret.save().then((success, err) => {
        if (!err) {
            res.redirect("/secrets");
        } else {
            console.log("failed to save");
            res.redirect("/submit");
        };
    });
});

app.get("/logout", function(req, res){
    req.logout(function(err){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        };
    });
});

app.listen(port,(req, res)=> {
    console.log("Listening on port "+ port);
});
