var Moment = require('moment');
var CRONParser = require('cron-parser');
var Schedule = require('node-schedule');
var BirthdayFinder = require('./finder');

var TweetScheduler = function(twitter, data) {
	this.schedulerInterval = CRONParser.parseExpression('1 * * * *', {
		currentDate: Moment().format('YYYY-MM-DD h:m:s'),
  		tz: 'Asia/Tokyo'
	});
	this.twitter = twitter;
	this.data = data;
}

TweetScheduler.prototype.start = function() {
	var that = this;
	var job = Schedule.scheduleJob(this.schedulerInterval, function() {
	  var birthdayFinder = new BirthdayFinder(that.data);
	  console.log(birthdayFinder.findBirthdaysOnCurrentDate());
	});
	console.log("Tweet scheduler started.");
};

module.exports = TweetScheduler;