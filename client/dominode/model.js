var util = require('util');
var events = require('events');
var ajax = require('../helpers/ajax');

var Model = function (obj) {
	events.EventEmitter.call(this);
	this.data = obj;
};

util.inherits(Model, events.EventEmitter);

Model.prototype.fetch = function (url) {
	var self = this;
	var promise = ajax.makePromise(url).then(function (resolve) {
		self.update(resolve);
		return resolve;
	},
	function (reject) {
		console.log('REJECTED', reject);
	});
	return promise;
};

Model.prototype.update = function (data) {
	var parsedData = JSON.parse(data);
	for(var item in parsedData) {
		this.data[item] = parsedData[item];
	};

	this.emit('updated', this);
};

module.exports = Model;
