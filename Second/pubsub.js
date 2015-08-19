(function(global) {

	"use strict";

	function getUUID(){
		var d = performance.now();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	};

	function Pair(first, second) {
		this.first = first;
		this.second = second;
	}

	Pair.prototype.getFirst = function() {
		return this.first;
	};

	Pair.prototype.getSecond = function() {
		return this.second;
	};

	function MapEntry(key, value) {
		this.pair = new Pair(key, value);
	}

	MapEntry.prototype.getKey = function() {
		return this.pair.getFirst();
	};

	MapEntry.prototype.getValue = function() {
		return this.pair.getSecond();
	};

	function Map() {
		this.data = [];
	}

	Map.prototype.push = function(mapEntry) {
		var uuid = getUUID();
		this.data.push(new MapEntry(uuid, mapEntry));
		return uuid;
	};

	Map.prototype.remove = function(key) {
		for (var i = 0; i < this.data.length; ++i) {
			if (this.data[i].getKey() === key) {
				break;
			}
		}

		if (i < this.data.length) {
			this.data.splice(i, 1);
		}
	};

	Map.prototype.get = function(key) {
		for (var i = 0; i < this.data.length; ++i) {
			if (this.data[i].getKey() === key) {
				return this.data[i].getValue();
			}
		}
	};

	function Subscription(message, receiver) {
		this.pair = new Pair(message, receiver);
	}

	Subscription.prototype.getMessage = function() {
		return this.pair.getFirst();
	};

	Subscription.prototype.getReceiver = function() {
		return this.pair.getSecond();
	};

	global.publisher = (function() {

		var _publisherElement = document.createElement("publisherElement");

		var _subscriptions = new Map();

		var publisher_module = {};

		publisher_module.addSubscription = function(message, receiver) {
			_publisherElement.addEventListener(message, receiver);
			return _subscriptions.push(new Subscription(message, receiver));
		};

		publisher_module.removeSubscription = function(subscriptionId) {
			var subscription = _subscriptions.get(subscriptionId);
			var message = subscription.getMessage();
			var receiver = subscription.getReceiver();
			_publisherElement.removeEventListener(message, receiver);
			_subscriptions.remove(subscriptionId);
		};

		publisher_module.publish = function(message) {
			var event = new CustomEvent(message);
			if (arguments.length > 1) {
				event.data = arguments[1];
			}
			_publisherElement.dispatchEvent(event);
		};

		return publisher_module;

	}());

	global.Subscriber = function() {};

	global.Subscriber.prototype.subscribe = function(message, receiver) {
		return publisher.addSubscription(message, receiver);
	};

	global.Subscriber.prototype.unsubscribe = function(subscriptionId) {
		publisher.removeSubscription(subscriptionId);
	};

}(this));
