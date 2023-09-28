const express = require("express");
const bodyParser = require("body-parser");
const https =  require("https");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
}); 

app.post("/",function(req,res ){

    const cityName = req.body.cityName;
    const unit = "metric";
    const apiKey = "58ffc0be3ef2a03e302e7286d3bcd76d"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`;

// This one is trying to get a response from an external server with a specified api endpoint

    https.get(url,function(response) {
        response.on("data", function(data){
        const weatherData = JSON.parse(data); 
        const weatherTemp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const weatherImg = weatherData.weather[0].icon;
        const imageURL = `https://openweathermap.org/img/wn/${weatherImg}@2x.png`;
        // $("#weatherTemp").text(weatherTemp);
        // $("#weatherDesc").text(weatherDesc); 
        res.write(`<p> The Current Weather description is ${weatherDesc} </p>`);
        res.write(`<h1>The Current Temperature In ${cityName} is ${weatherTemp}</h1>`);
        res.write(`<img src="${imageURL}">`);
        res.send(); 
        });
    });
});



app.listen(port,function(req,res ) {
    console.log(`Currently Listening on Port ${port}`);
});



