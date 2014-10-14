var applyAttributes = function (el, obj) {
	'use strict';

	if(typeof obj !== 'undefined') {
		for(var item in obj) {
			el.setAttribute(item, obj[item]);
		}
	}

	return el;
};

var View = function () {
	'use strict';
	this.elements = {};
};

var buildModelView = function (model) {
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

View.prototype = {
	generate : function (models) {
		'use strict';

		models.forEach(buildModelView.bind(this));
		return this;
	},

	append : function (el, target) {
		'use strict';

		var targetNode = target || document.querySelector('body');
		targetNode.appendChild(this.getElement(el).element);
		return this;
	},

	prepend : function (el, target) {
		'use strict';

		var targetNode = target || document.querySelector('body');
		targetNode.insertBefore(this.getElement(el).element, targetNode.firstChild);
		return this;
	},

	refresh : function (el) {
		'use strict';
		var item = this.getElement(el);
		item.element.innerHTML = item.content;
		return this;
	},

	getElement : function (str) {
		'use strict';
		return this.elements[str];
	},

	listElements : function () {
		'use strict';
		return this.elements;
	}
};

module.exports = View;
