var Layout = function () {
	'use strict';
};


Layout.prototype.generate = function (patterns) {
	'use strict';

	patterns.forEach(function (item) {
		var section = item[Object.getOwnPropertyNames(item)[0]];
		var el = document.createElement(section.element);
		if(section.attributes) {
			for(var attribute in section.attributes){
				el.setAttribute(attribute, section.attributes[attribute]);
			}
		}
		console.log('el', el);
		document.querySelector('body').appendChild(el);
	});

};

module.exports = new Layout();
