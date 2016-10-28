var _ = require('lodash');
var Moment = require('moment');
var Tz = require('moment-timezone');

var BirthdayFinder = function(data) {
	this.data = data;
}

BirthdayFinder.prototype.findBirthdaysOnCurrentDate = function() {
	var now = Moment().tz('Asia/Tokyo');
	var filteredByMonth = _.filter( this.data, { "month" :  now.month() + 1 } );
	var filteredByDay = _.filter( filteredByMonth, { "day" : now.date() } );
	return filteredByDay;
};

module.exports = BirthdayFinder;