//install packages
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD0ryZpgxKmnM81pq9e-tAbh7Zu39G5BBI',
    Promise: Promise
});
var fs = require('fs')
var http = require('http');

var data = require("./locations.1.json"); //TODO fix this
var geoData = [];
var name_of_thing_we_want_from_the_data = "address"
var actual_name_of_thing_we_want_from_the_data = "name"

function get_the_data_that_we_need_to_put_in_the_map(jsonFile, addressString){
    return;
}

let total_geocoded = 0; //keeps track of # of geocoded responses
for (const location of data) {
    googleMapsClient.geocode({address: location[name_of_thing_we_want_from_the_data]})
    .asPromise()
    .then((response) => {
        var newLocation = response.json.results;
        newLocation[0].name = location[actual_name_of_thing_we_want_from_the_data];
        console.log(newLocation[0].name);
        geoData.push(newLocation);
        console.log("location geocoded");
        total_geocoded++;
        if (total_geocoded == data.length-1) {
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
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

http.createServer(function (req, res) {
  fs.readFile('geo-locations.json', function(err, data) {
    res.write(data);
    res.end();
  });
}).listen(8080);



