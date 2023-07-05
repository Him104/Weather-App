const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){

//     

res.sendFile(__dirname + "/index.html");
        
        });

        app.post("/",function(req,res){
const query = req.body.cityName;
           const url = "https://api.openweathermap.org/data/2.5/weather?q=DELHI&appid=ec3163c33185c0d1bd0f2774a28ecac0&units=metric"
    https.get(url, function(response){
        

        response.on("data",function(data){
            const weatherData = JSON.parse(data);


            const temperature = weatherData.main.temp

            const weatherDescription = weatherData.weather[0].description
const icon = weatherData.weather[0].icon
const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

    res.write("<p>the weather is currently " + weatherDescription + " </p>")
            res.write("<h1>the temperature of " + query + " is " + temperature + " degrees celcius</h1>");
        res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })

})


app.listen(7000, function(){
    console.log("server is up and running on port 7000");
})