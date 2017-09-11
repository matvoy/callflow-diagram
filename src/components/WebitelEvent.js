/**
 * Created by matvij on 11.09.17.
 */

var WebitelEvent = function() {
	var nextSubscriberId = 0;
	var subscriberList = [];

	this.subscribe = function(callback) {
		var id = nextSubscriberId;
		subscriberList[id] = callback;
		nextSubscriberId++;
		return id;
	};

	this.unsubscribe = function(id) {
		delete subscriberList[id];
	};

	this.trigger = function(sender) {
		for (var i in subscriberList) {
			subscriberList[i](sender);
		}
	};
};

export default WebitelEvent;
