const data = require('../data.json');

var appRouter = function(app) {
  app.get("/getDeals", function(req, res) {
    var deal = {
      name: "Mad Grillz",
      latitude: 37.785343,
      lontitude: -122.406677,
      deal: {
        description: "Fries Clearance",
        item: "French Fries",
        picture: ''
      }
    }
    var radius = 3.2; // in km
    if(!req.query.latitude) {
      return res.send({"status": "error", "message": "missing latitude"});
    } else if(!req.query.longitude) {
      return res.send({"status": "error", "message": "missing longitude"});
    }

    var response = [];
    for (var i = 0; i < data.shops.length; i++) {
      console.log(parseFloat(data.shops[i].latitude), parseFloat(data.shops[i].longitude))
      var distance = getDistanceFromLatLonInKm(parseFloat(data.shops[i].latitude), parseFloat(data.shops[i].longitude), req.query.latitude, req.query.longitude);
      console.log(data.shops[i], distance)
      if (distance < radius) {
        response.push(data.shops[i]);
      } 
    }
    if (response.length < 0) {
      return res.send({"message": "No deals available"});
    }
    return res.send({"deals": response});
  });

  app.get("/account", function(req, res) {
    var accountMock = {
        "username": "nraboy",
        "password": "1234",
        "twitter": "@nraboy"
    }
    if(!req.query.username) {
        return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
        return res.send({"status": "error", "message": "wrong username"});
    } else {
        return res.send(accountMock);
    }
  });

  app.post("/account", function(req, res) {
    if(!req.body.username || !req.body.password || !req.body.twitter) {
        return res.send({"status": "error", "message": "missing a parameter"});
    } else {
        return res.send(req.body);
    }
  });
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports = appRouter;