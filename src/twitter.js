var Twit = require('twit');

var Twitter = function(secret, options, data) {
	this.api = new Twit(secret);
	this.stream = this.api.stream('statuses/filter', options);
	this.data = data;
}

Twitter.prototype.onTweet = function(callback) {
	this.stream.on('tweet', callback.bind( { twitter : this.api, data : this.data } ));
	return this;
},

Twitter.prototype.onError = function(callback) {
	this.stream.on('error', callback);
	return this;
},

Twitter.prototype.startStream = function() {
	this.stream.start();
},

Twitter.prototype.stopStream = function() {
	this.stream.stop();
}

module.exports = Twitter;