//install packages
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD0ryZpgxKmnM81pq9e-tAbh7Zu39G5BBI',
    Promise: Promise
});
var fs = require('fs')
var http = require('http');

var data = require("./locations.1.json"); //TODO fix this
var geoData = [];
var actual_name_of_thing_we_want_from_the_data = "dba"

var location_identifiers =["address", "city", "state"];

let total_geocoded = 0; //keeps track of # of geocoded responses

for (let location of data) {
    let addressString = "";
    for (let identifier of location_identifiers) {
        if (addressString == null) {
            addressString += location[identifier];
        } else {
            addressString += " " + location[identifier];
        }
    }
    console.log(addressString);
    
    googleMapsClient.geocode({address: addressString})
    .asPromise()
    .then((response) => {
        var newLocation = response.json.results;
        newLocation[0].name = location[actual_name_of_thing_we_want_from_the_data];
        console.log(location[actual_name_of_thing_we_want_from_the_data]);
        geoData.push(newLocation);
        console.log("location geocoded");
        total_geocoded++;
        if (total_geocoded == data.length) {
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
}).listen(process.env.PORT || 5000);



