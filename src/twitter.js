var Twit = require('twit');

var Twitter = function(secret, options) {
	this.api = new Twit(secret);
	this.stream = this.api.stream('statuses/filter', options);
}

Twitter.prototype.setData = function(data) {
	this.data = data;
	return this;
};

Twitter.prototype.onTweetReceived = function(callback) {
	this.stream.on('tweet', callback.bind( { twitter : this, data : this.data } ));
	return this;
},

Twitter.prototype.onErrorReceived = function(callback) {
	this.stream.on('error', callback);
	return this;
},

Twitter.prototype.startStream = function() {
	this.stream.start();
	console.log('Twitter stream started.');
},

Twitter.prototype.stopStream = function() {
	this.stream.stop();
	console.log('Twitter stream stopped.');
}

Twitter.prototype.doTweet = function( status ) {
	this.api.post('statuses/update', status, function(error, data, response) {
		if (error) {
			console.log(error)
		}
	});
}

module.exports = Twitter;