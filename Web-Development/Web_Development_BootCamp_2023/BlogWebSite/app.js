//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");



const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Creating the database part 
mongoose.connect("mongodb://127.0.0.1:27017/blogSite"); // connect to local database temporary 

const userSchema = mongoose.Schema({
  userName : String
});

const commentSchema = mongoose.Schema({
  comment : String,
  user : [userSchema]
});

const postSchema = mongoose.Schema({
  postTitle : String,
  postContent : String,
  comments : [commentSchema]
});

const blogPost = mongoose.model("blogPost",postSchema);
const comment = mongoose.model("comments",commentSchema);
const blogUser = mongoose.model("users",userSchema);

// adding default post to the database
blogPost.find().then((foundBlog,err) => {
  if (foundBlog.length === 0) {
    const homeStartingPost = new blogPost({
      postTitle : "Home",
      postContent :"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.",
      comments : []
    });
    
    const aboutPost = new blogPost({
      postTitle : "About",
      postContent : "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
      comments : []
    });
  
    const contactPost = new blogPost({
      postTitle : "Contact",
      postContent : "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.",
      comments : []
    });
    
    const defaultPost = [homeStartingPost,aboutPost,contactPost];
    blogPost.insertMany(defaultPost).then((result)=> {
      console.log(`Succesfully added default post to the database`);
    });
  } else {
    console.log("default blog already inside the database");
  };
});
// get requestss Opening
app.get("/about", function(req, res){
  blogPost.findOne({postTitle : "About"}).then((foundPost,err) => {
    res.render("about", {aboutContent : foundPost.postContent});
  });
});

app.get("/contact", function(req, res){
  blogPost.findOne({postTitle : "Contact"}).then((foundPost,err) => {
    res.render("contact", {contactContent : foundPost.postContent});
  });
});


app.get("/", function(req, res){
  blogPost.find({postTitle : {$nin: ["About","Contact"]}}).then((foundBlogs,err)=> {
    res.render("home",{posts : foundBlogs}); //reveise the posts later where database is acessed
  });
});

app.get("/compose",function(req, res){
  res.render("compose",{});
});

app.get('/posts/:anyPost', async(req, res) => {

const newPost = _.capitalize(req.params.anyPost);
if (newPost.length === 24) { // since the database id length is always 24 we use it as an if 
  blogPost.findOne({_id : newPost}).then((foundPost,err)=>{
    if (foundPost != null) { // if post is found it will render the post value
      res.render("post",{title:foundPost.postTitle, content : foundPost.postContent});
    } else {
      console.log(`${newPost} Needs to be created`);
      res.redirect("/compose");
    }
  });
} else {
    blogPost.findOne({postTitle : newPost}).then((foundPost,err)=>{
      if (foundPost != null) { // if post is found it will render the post value
        res.render("post",{title:foundPost.postTitle, content : foundPost.postContent});
      } else {
        console.log(`${newPost} Needs to be created`);
        res.redirect("/compose");
      }
    });
  } 
});

// get requestss Closing
// post request Opening
app.post("/compose",async function(req, res){

const postTitle = _.capitalize(req.body.titleInput);
const postContent = req.body.postInput
  blogPost.findOne({postTitle : postTitle}).then((foundBlog,err) =>{
    if (foundBlog != null) {
      console.log("That blog with that title is already created, please try again");
      res.redirect("/compose");
    } else {
      if (!err) {
        const post = new blogPost({ // Creating a new post 
          postTitle : postTitle,
          postContent : postContent,
          comments : []
        });
        post.save();
        res.redirect("/");
      } else {
        console.log(err);
      };
    }
  });
});

// Post request closing
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
