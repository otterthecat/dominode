var Model = require('./model');

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
	var element = document.createElement(model.scheme.element);
	if(model.scheme.attributes) {
		applyAttributes(element, model.scheme.attributes);
	}

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

Page.prototype.bond = function (base, target) {
	'use strict';

	var self = this;
	self.getElement(base).scheme.element.addEventListener(self.getElement(target).scheme.event, function (ev) {
		self.getElement(target).scheme.callback.call(self.getElement(target), ev, self);
	});
}

module.exports = new Page();
