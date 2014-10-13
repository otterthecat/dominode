var util = require('util');
var events = require('events');
var ajax = require('../helpers/ajax');

var Model = function (obj) {
	'use strict';

	events.EventEmitter.call(this);
	this.data = obj;
};

util.inherits(Model, events.EventEmitter);

Model.prototype.fetch = function (url) {
	'use strict';

	var self = this;
	var modelUrl = url || self.data.url;
	var promise = ajax.makePromise(modelUrl).then(function (resolve) {
		self.update(resolve);
		return resolve;
	},
	function (reject) {
		console.log('REJECTED', reject);
	});
	return promise;
};

Model.prototype.update = function (data) {
	'use strict';

	var parsedData = JSON.parse(data);
	for(var item in parsedData) {
		this.data[item] = parsedData[item];
	}

	this.emit('updated', this);
};

module.exports = Model;
