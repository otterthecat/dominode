var events = require('events');
var util = require('util');
var pushpop = require('../helpers/pushpop')(window);

var Router = function (routes) {
	'use strict';
	this.state = pushpop;
	events.EventEmitter.call(this);
};

util.inherits(Router, events.EventEmitter);

Router.prototype.directTo = function (path, data) {
	'use strict';
	this.state.push(path, data);
	this.emit(path, data);
};

module.exports = new Router();
