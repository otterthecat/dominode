var Model = require('./model');
var View = require('./view');

var Page = function () {
	'use strict';
	this.elements = {};
};

var applyAttributes = function (el, obj) {
	'use strict';

	if(typeof obj !== 'undefined') {
		for(var item in obj) {
			el.setAttribute(item, obj[item]);
		}
	}

	return el;
};

var buildViewModel = function (model) {
	'use strict';

	var self = this;
	var obj = model.data || model;
	var element = document.createElement(obj.element);
	if(obj.attributes) {
		applyAttributes(element, obj.attributes);
	}

	element.innerHTML = obj.content;
	if(obj.event){
		element.addEventListener(obj.event, function (ev) {
			obj.callback.call(model, ev, self);
		});
	}

	obj.element = element;

	self.elements[obj.name] = obj;

	model.on('updated', function () {
		self.refresh(model.data.name);
	});
};

Page.prototype.register = function (list) {
	'use strict';

	var self = this;
	list.forEach(function (item) {
		var model = new Model(item);
		buildViewModel.call(self, model);
	}.bind(self));

	return self;
};

Page.prototype.redirect = function (str) {
	'use strict';
	window.location.href = str;
};

Page.prototype.getElement = function (str) {
	'use strict';
	return this.elements[str];
};

Page.prototype.destroy = function (str) {
	'use strict';

	var el = this.getElement(str).element;
	el.parentNode.removeChild(el);
	delete this.elements[str];
	return this;
}



module.exports = new Page();
