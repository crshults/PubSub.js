"use strict";

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
