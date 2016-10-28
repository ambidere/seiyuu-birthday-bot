var Moment = require('moment')

var GreetTweet = function(birthdayData) {
	this.birthdayData = birthdayData;
}

GreetTweet.prototype.getName = function() {
		var bData = this.birthdayData;
		if ( bData.kanjigiven == undefined &&
		     bData.kanagiven == undefined &&
		     bData.rogiven == undefined )
		{
			return bData.kanjifamily;
		}
		return bData.kanjifamily + bData.kanjigiven;
	}

GreetTweet.prototype.getHashtag = function(name, birthday='', year='') {
	return "#" + name + birthday + year;
}

GreetTweet.prototype.getHashtags = function(name) {
	var currentYear = Moment().year();
	return this.getHashtag(name) + "\n" +
		   this.getHashtag(name, '生誕祭') + "\n" +
		   this.getHashtag(name, '生誕祭', currentYear) + "\n";
};

GreetTweet.prototype.getStatus = function() {
	var greetingReceiver = this.getName();
	return "お誕生日おめでとうございます、" + greetingReceiver + "さん！\n\n"
			+ this.getHashtags(greetingReceiver);
};

GreetTweet.prototype.getTweet = function() {
	return {
		status : this.getStatus()
	};
};

module.exports = GreetTweet;