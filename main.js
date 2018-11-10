//install packages
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD0ryZpgxKmnM81pq9e-tAbh7Zu39G5BBI'  
});
var fs = require('fs')

var data = require("./locations.1.json"); //TODO fix this
var geoData = [];
var name_of_thing_we_want_from_the_data = "address"

function get_the_data_that_we_need_to_put_in_the_map(jsonFile, addressString){
    return;
}

for (const location of data) {
    //console.log(location.address);
    googleMapsClient.geocode({
        address: location[name_of_thing_we_want_from_the_data]
      }, function(err, response) {
        if (!err) {
            geoData.push(response.json.results);  
            console.log("location geocoded")
        } else{
            console.log(err);
        }
    });
}

//TODO: use promises so that I dont have wait an arbitrary amount of time before i can read from the fixed json file
setTimeout(function(){
    console.log(geoData);
    fs.writeFile("updatedlocations.json", JSON.stringify(geoData), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("JSON saved");
        }
    });
}, 10000)



