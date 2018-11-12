//install packages
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD0ryZpgxKmnM81pq9e-tAbh7Zu39G5BBI',
    Promise: Promise
});
var fs = require('fs')
var http = require('http');
var url = require('url');

/*
place_name_identifier: the name of the property in the JSON file that holds the place names
location_identifiers: the properties used to build an address to search for a location
data: the starting file (ex. require("./locations.1.json"))
output_file: the name of the output file
*/

function convertData(data, place_name_identifier, location_identifiers, output_file) {
    var geoData = [];
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
            newLocation[0].name = location[place_name_identifier];
            console.log(location[place_name_identifier]);
            geoData.push(newLocation);
            console.log("location geocoded");
            total_geocoded++;
            if (total_geocoded == data.length) {
                for (let i = 0; i < geoData.length; i++) {
                    geoData[i] = geoData[i][0];
                }
                fs.writeFile(output_file, JSON.stringify(geoData), function(err) {
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
}

//Test Data
//convertData(require("./testdata.json"), "name", ["address", "city", "state"], "testdata-converted.json");

//Substance Abuse Care Facilities
//convertData(require("./substance-abuse-care-facilities.json"), "name", ["address", "city", "state"], "substance-abuse-care-facilities-converted.json");


//Publishes entire repository to server, get by querying filename
http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }  
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
}).listen(process.env.PORT || 5000);