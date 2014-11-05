var Model = require('./model');
var layout = require('./layout');

var Page = function (options) {
	'use strict';
	this.elements = {};
	this.layout = layout;
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
	var element = document.createElement(model.scheme.element);
	applyAttributes(element, model.scheme.attributes);

	element.innerHTML = model.scheme.content;
	if(model.scheme.event){
		element.addEventListener(model.scheme.event, function (ev) {
			model.scheme.callback.call(model, ev, self);
		});
	}

	// apply dom node to scheme
	model.scheme.element = element;
	self.elements[model.scheme.name] = model;

	model.on('updated', function () {
		this.refresh(model.scheme.name);
	}.bind(model));
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

Page.prototype.useLayout = function (obj) {
	this.layout.generate(obj);
	return this;
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

Page.prototype.append = function (el, target) {
	'use strict';

	var targetNode = target || document.querySelector('body');
	targetNode.appendChild(this.getElement(el).scheme.element);
	return this;
};

Page.prototype.prepend = function (el, target) {
	'use strict';

	var targetNode = target || document.querySelector('body');
	targetNode.insertBefore(this.getElement(el).scheme.element, targetNode.firstChild);
	return this;
};

Page.prototype.bond = function (base, target, type) {
	'use strict';

	var self = this;
	if(type === 'function'){

		self.getElement(target).scheme.callback.bind(self.getElement(base));
		self.getElement(base).scheme.element.addEventListener(self.getElement(base).scheme.event, function(ev){

			self.getElement(base).scheme.callback.call(self.getElement(target), ev, self);
		});
		console.log(self.getElement(base).scheme.element);
	}
	else if (type === 'event') {
		self.getElement(base).scheme.element.addEventListener(self.getElement(target).scheme.event, function (ev) {
			self.getElement(target).scheme.callback.call(self.getElement(target), ev, self);
		});
	}
	else {
		self.getElement(base).scheme.element.addEventListener(self.getElement(target).scheme.event, function (ev) {
			self.getElement(target).scheme.callback.call(self.getElement(target), ev, self);
		});
	}
	return self;
}

module.exports = new Page();
