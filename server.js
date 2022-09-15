const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { read } = require('fs');
const app = express();
const port = 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/' , function(req,res){
    res.sendFile(__dirname + "/views/index.html")
})


app.post('/',function(req,res){

        const query = req.body.city
        const apikey = "1fe948ff66b2dab1cf77f4daa92cc9b0"
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid="+ apikey +""
        https.get(url, function(response){
        response.on("data", function(data){
        var weatherdata = JSON.parse(data)
        var temp = weatherdata.main.temp
        var weatherdescription = weatherdata.weather[0].description;
        var icon = weatherdata.weather[0].icon
        var imageurl ="http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<h1>The temperature in "+ query+" is "+ temp +" degree Celcius.</h>")
        res.write("<h2>The weather is currently " + weatherdescription +"</h2>")
        res.write("<img src="+imageurl+">")
        res.send()

    })

})
    
})
app.listen(process.env.PORT || port,function(){
    console.log(`Server started on port ${port}`)
})




// openweather api key = 1fe948ff66b2dab1cf77f4daa92cc9b0
