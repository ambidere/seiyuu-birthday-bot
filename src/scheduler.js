var _ = require('lodash');
var Moment = require('moment');
var CRONParser = require('cron-parser');
var Schedule = require('node-schedule');
var BirthdayFinder = require('./finder');
var GreetTweet = require(__dirname + '/twitter/greettweet');

var TweetScheduler = function(twitter, data) {
	this.schedulerInterval = CRONParser.parseExpression('00 00 * * *', {
		currentDate: Moment().format('YYYY-MM-DD hh:m:s'),
  		tz: 'Asia/Tokyo'
	});
	this.twitter = twitter;
	this.data = data;
}

TweetScheduler.prototype.start = function() {
	var that = this;
	var twitterApi = this.twitter;
	var job = Schedule.scheduleJob(that.schedulerInterval, function() {
	  var birthdayFinder = new BirthdayFinder(that.data);
	  var birthdays = birthdayFinder.findBirthdaysOnCurrentDate();
	  _.forEach(birthdays, function(value){
	  	var greetTweet = new GreetTweet(value);
	  	twitterApi.doTweet(greetTweet.getTweet());
	  });
	});
	console.log("Tweet scheduler started.");
};

module.exports = TweetScheduler;