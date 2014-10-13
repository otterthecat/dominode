var applyAttributes = function (el, obj){
	'use strict';

	if(typeof obj !== 'undefined'){
		for(var item in obj){
			el.setAttribute(item, obj[item]);
		};
	};

	return el;
};

var View = function () {
	this.elements = {};
};

View.prototype = {
	generate: function (model){
		var obj = model.data || model;
		var self = this;
		var element = document.createElement(obj.element);
		if(obj.attributes){
			applyAttributes(element, obj.attributes);
		};

		element.innerHTML = obj.content;
		element.addEventListener(obj.event, function (ev){
			obj.callback.call(model, ev, self);
		});

		obj.element = element;

		this.elements[obj.name] = obj;

		model.on('updated', function (obj) {
			self.refresh(model.data.name);
		});

		return this;
	},

	append: function (el, target){
		'use strict';
		target.appendChild(this.getElement(el));
	},

	prepend: function (el, target){
		'use strict';
		target.insertBefore(this.getElement(el).element, target.firstChild);
	},

	refresh: function (el){
		'use strict';
		var item = this.getElement(el);
		item.element.innerHTML = item.content;
	},

	getElement: function (str){
		'use strict';
		return this.elements[str];
	}
};

module.exports = View;
