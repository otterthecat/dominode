var Layout = function () {
	'use strict';
	this.sections = {};
};

Layout.prototype.generate = function (patterns) {
	'use strict';

	var self = this;
	var body = document.querySelector('body');

	patterns.reverse().forEach(function (item) {
		var key = Object.getOwnPropertyNames(item)[0];
		var section = item[key];
		self.sections[key] = item[key];

		var el = document.createElement(section.element);
		if(section.attributes) {
			for(var attribute in section.attributes){
				el.setAttribute(attribute, section.attributes[attribute]);
			}
		}
		body.insertBefore(el, body.firstChild);
	});
};

module.exports = new Layout();
