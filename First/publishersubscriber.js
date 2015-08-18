"use strict";

function Subscription(message, receiver) {
    this.pair = new Pair(message, receiver);
}

Subscription.prototype.getMessage = function() {
    return this.pair.getFirst();
};

Subscription.prototype.getReceiver = function() {
    return this.pair.getSecond();
};

function Publisher() {
    this.publisherElement = document.createElement("publisherElement");
    this.subscriptions = new Map();
}

Publisher.prototype.addSubscription = function(message, receiver) {
    this.publisherElement.addEventListener(message, receiver);
    return this.subscriptions.push(new Subscription(message, receiver));
};

Publisher.prototype.removeSubscription = function(subscriptionId) {
    var subscription = this.subscriptions.get(subscriptionId);
    var message = subscription.getMessage();
    var receiver = subscription.getReceiver();
    this.publisherElement.removeEventListener(message, receiver);
    this.subscriptions.remove(subscriptionId);
}

Publisher.prototype.publish = function(message) {
    var event = new CustomEvent(message);
    if (arguments.length > 1) {
        event.data = arguments[1];
    }
    this.publisherElement.dispatchEvent(event);
}

function Subscriber() {
}

Subscriber.prototype.subscribe = function(publisher, message, receiver) {
    return publisher.addSubscription(message, receiver);
};

Subscriber.prototype.unsubscribe = function(publisher, subscriptionId) {
    publisher.removeSubscription(subscriptionId);
};
