"use strict";

var interesting = (function() {

	var _publisher = new Publisher();

	var _doSomethingInteresting = function() {
		_publisher.publish("something interesting happened");
	};

	var _doSomethingInterestingWithPayload = function() {
		_publisher.publish("something interesting happened with payload", [12, "sixteen"]);
	};

	var interesting_element = document.getElementById("publisher");
	interesting_element.addEventListener('click', _doSomethingInteresting);
	interesting_element.addEventListener('mouseleave', _doSomethingInterestingWithPayload);

	var interesting_module = {};

	interesting_module.addSubscription = function(message, receiver) {
		return _publisher.addSubscription(message, receiver);
	};

	interesting_module.removeSubscription = function(subscriptionId) {
		_publisher.removeSubscription(subscriptionId);
	};

	return interesting_module;

}());

var interested = (function() {

	var interested_element = document.getElementById("subscriber");

	var _handleSomethingInteresting1 = function() {
		switch (interested_element.style.backgroundColor) {
			case "red":
				interested_element.style.backgroundColor = "green";
				break;
			case "green":
				interested_element.style.backgroundColor = "blue";
				break;
			case "blue":
				interested_element.style.backgroundColor = "red";
				break;
			default:
				interested_element.style.backgroundColor = "red";
				break;
		}
	};

	var _handleSomethingInteresting2 = function(payload) {
		console.log("payload: " + payload.data);
	};

	var _subscriber = new Subscriber();

	var _subscriptionId1 = _subscriber.subscribe(interesting, "something interesting happened", _handleSomethingInteresting1);
	var _subscriptionId2 = _subscriber.subscribe(interesting, "something interesting happened with payload", _handleSomethingInteresting2);

	var interested_module = {};

	interested_module.yes = function() {
		_subscriptionId1 = _subscriber.subscribe(interesting, "something interesting happened", _handleSomethingInteresting1);
		_subscriptionId12 = _subscriber.subscribe(interesting, "something interesting happened with payload", _handleSomethingInteresting2);
	};

	interested_module.no = function() {
		_subscriber.unsubscribe(interesting, _subscriptionId1);
		_subscriber.unsubscribe(interesting, _subscriptionId2);
	};

	return interested_module;

}());
