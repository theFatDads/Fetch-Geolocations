//install packages
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD0ryZpgxKmnM81pq9e-tAbh7Zu39G5BBI'  
});
const fs = require('fs');



googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function(err, response) {
    if (!err) {
        fs.writeFile('locations.json', response.json.results, function (error) {
            if (error) throw error;
            console.log('Updated!');
          });
    }
});