const express = require('express');
const https = require('https');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function (req, res) {
    const loc = req.body.CityName;
    const appid = "Enter your API KEY";
    const unit  = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ loc + "&appid=" + appid + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const place = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const ImageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + place + " is " + temp + " degree Celcius</h1>");
            res.write("<h3> The weather is currently " + desc + "</h3>");
            res.write("<img src=" + ImageURL + ">");

        })
    })
})




app.listen(3000, function () {
    console.log('Server is running on port 3000.')
}) 
