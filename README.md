# Fetch-Geolocations
## About
While working on our "Connecticut Tech Challenge" submission, my team wanted to implement data from data.ct.gov in Google Maps. We found that the data either was in geoJSON format and a general JSON file with data.

If the files weren't GeoJSON, they typically lacked the latitude and longitude values we needed to plot the points on a Google Map. We made a server which periodically processes data and outputs it as a list containing geolocated (locating latitude and longitude cooridnates from an address) data.

This repository will skim a given JSON file for an adress or equivalent and create a JSON file suitable for being displayed on the Google Maps API.

## Installation
To use these functions in your code, you must:
* Install Node JS
* Clone this repository to you computer
* Add your Google Cloud API key to the main.js file

main.js will look something like this:

```
//install packages
const googleMapsClient = require('@google/maps').createClient({
    key: '<<key goes here>>'
});
```

## Usage
The main function in this library is `convertData`

### convertData(data, place_name_identifier, location_identifiers, output_file)
This function Requires 4 parameters:
* data: the starting file (ex. require("./locations.1.json"))
* place_name_identifier: the name of the property in the JSON file that holds the place names (ex. "name")
* location_identifiers: the properties used to build an address to search for a location (ex. ["address", "city", "state"])
* output_file: the name of the output file

#### Example:
```  
//Test Data
convertData(require("./testdata.json"), "name", ["address", "city", "state"], "testdata-converted.json");
```
