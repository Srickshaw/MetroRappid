var _ = require('underscore');
var ko = require('knockout');
var config = require('../config');

var Trip = require('./Trip');


function TripCollection(stopID, Service) {
    this.stopID = ko.observable(stopID);

    this.routeID = ko.observable(Service.Route);
    this.sign = ko.observable(Service.Sign);

    this.trips = ko.observableArray(this.parseTrips(Service));
}

TripCollection.prototype.parseTrips = function(Service) {
    var Tripinfo = Service.Tripinfo;
    if (!Array.isArray(Tripinfo)) {
        Tripinfo = [Tripinfo];
    }

    var trips = Tripinfo.map(function(tripData) {
        return new Trip(tripData);
    });

    // show only the most recent missed trip
    for (var i = 0; i < trips.length; i++) {
        if (! trips[i].old()) {
            if (i > 0) {
                trips = trips.slice(i-1);
            }
            break;
        }
    }

    return trips.slice(0, config.MAX_TRIPS);
};

module.exports = TripCollection;
