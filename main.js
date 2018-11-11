//install packages
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD0ryZpgxKmnM81pq9e-tAbh7Zu39G5BBI' 
});
var fs = require('fs')
var http = require('http');

var data = require("./locations.json"); //TODO fix this
var geoData = [];
var name_of_thing_we_want_from_the_data = "address"
var actual_name_of_thing_we_want_from_the_data = "name"

function get_the_data_that_we_need_to_put_in_the_map(jsonFile, addressString){
    return;
}

for (const location of data) {
    //console.log(location.address);
    googleMapsClient.geocode({
        address: location[name_of_thing_we_want_from_the_data]
      }, function(err, response) {
        if (!err) {
            var newLocation = response.json.results;
            newLocation[0].name = location[actual_name_of_thing_we_want_from_the_data];
            console.log(newLocation[0].name);
            geoData.push(newLocation);
            console.log("location geocoded");
        } else{
            console.log(err);
        }
    });
}

//TODO: use promises so that I dont have wait an arbitrary amount of time before i can read from the fixed json file
setTimeout(function(){
    for (let i = 0; i < geoData.length; i++) {
        geoData[i] = geoData[i][0];
    }
    fs.writeFile("geo-locations.json", JSON.stringify(geoData), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("JSON saved");
        }
    });
}, 100000);


http.createServer(function (req, res) {
  fs.readFile('geo-locations.json', function(err, data) {
    res.write(data);
    res.end();
  });
}).listen(8080);



