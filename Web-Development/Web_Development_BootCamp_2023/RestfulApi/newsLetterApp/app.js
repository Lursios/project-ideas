require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const port = 3000;
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

// this the post request for root website 
app.post("/",function(req, res){

    // preparing the data for post request to mailchimp
    const email = req.body.email;
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const data = {
        members : [
            { email_address : email,
              status :"subscribed",
              merge_fields : {
                FNAME : firstName,
                LNAME : lastName,
              }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    var statusCode = "";
    
    // We're going to post instead of get we can get but for this one we're trying to subscribe not to receive so we use post
    const apiKey = process.env.API_KEY;
    const listId = process.env.LIST_ID;
    const url = `https://us21.api.mailchimp.com/3.0/lists/${listId}`
    const options = {
        method:"POST",
        auth:`Alpha-R :${apiKey}`
    }
    const request = https.request(url,options, function(response) {
        response.on("data", function(data) {    
            console.log(JSON.parse(data));
    // This is the conditional statement for our server response to the client 
            if (response.statusCode == 200) {
                res.sendFile(__dirname+"/success.html");
            } else {
                res.sendFile(__dirname+"/failure.html");
            };
        });
        
    });
    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res ) {
    res.redirect("/");
});

app.listen(port,function(){
    console.log(`Listening in port ${port}`);
});