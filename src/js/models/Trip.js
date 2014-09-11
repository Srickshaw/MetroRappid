var ko = require('knockout');
var moment = require('moment');

function Trip(data) {
    this.tripTime = ko.observable(data.Triptime);
    this.id = ko.observable(data.Tripid);
    this.skedTripID = ko.observable(data.Skedtripid);
    this.block = ko.observable(data.Block);
    this.exception = ko.observable(data.Exception);

    this.moment = ko.computed(function() { return moment(this.tripTime(), 'hh:mm A'); }.bind(this));
    this.prettyHour = ko.computed(function() {
        return this.moment().format('h:mm');
    }.bind(this));
    this.prettyMinutes = ko.computed(function() {
        return this.moment().diff(moment(), 'minutes') + 'm';
    }.bind(this));
    this.old = ko.computed(function() { return ! this.moment().isAfter(); }.bind(this));
}

module.exports = Trip;
