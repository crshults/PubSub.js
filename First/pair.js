"use strict";

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
