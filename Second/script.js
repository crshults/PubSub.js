"use strict";

(function() {

	var cloud_element = document.getElementById("cloud");
	cloud_element.addEventListener('click', function() {publisher.publish("rain")});

}());

(function() {

	var sun_element = document.getElementById("sun");
	sun_element.addEventListener('click', function() {publisher.publish("sun")});

}());

(function() {

	var field_element = document.getElementById("field");

	function Dry()     {field_element.style.backgroundColor = "brown";}
	function Normal()  {field_element.style.backgroundColor = "green";}
	function Flooded() {field_element.style.backgroundColor = "blue";}

	Dry.prototype.onRain    = function() {state = new Normal();};
	Normal.prototype.onRain = function() {state = new Flooded();};
	Normal.prototype.onSun  = function() {state = new Dry();};
	Flooded.prototype.onSun = function() {state = new Normal();};

	var state = new Normal();

	var handleRain = function() {try {state.onRain();} catch(e) {}};
	var handleSun  = function() {try {state.onSun();}  catch(e) {}};

	var subscriber = new Subscriber();
	var rainSubId  = subscriber.subscribe("rain", handleRain);
	var sunSubId   = subscriber.subscribe("sun", handleSun);

}());
