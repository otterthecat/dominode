var applyAttributes = function (el, obj){
	'use strict';

	if(typeof obj !== 'undefined'){
		for(var item in obj){
			el.setAttribute(item, obj[item]);
		};
	};

	return el;
};

var makeAjaxPromise = function (url, data) {
	'use strict';

	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();
		request.open('POST', url);
		request.setRequestHeader('Content-Type', 'application/json');
		request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		request.onload = function() {
			// This is called even on 404 etc
			// so check the status
			if (request.status == 200) {
			// Resolve the promise with the response text
			resolve(request.response);
			}
			else {
			// Otherwise reject with the status text
			// which will hopefully be a meaningful error
			reject(request.response);
			}
		};

		// Handle network errors
		request.onerror = function() {
			reject(request.response);
		};

		request.send();
	});
};

if(!Element.prototype.hasOwnProperty('fetch')){
	Element.prototype.fetch = function (url){
		return makeAjaxPromise(url);
	};
};

var Dominode = function (){
	'use strict';

	this.elements = {};
};

Dominode.prototype = {

	generate: function (obj){
		var self = this;
		var element = document.createElement(obj.element);
		if(obj.attributes){
			applyAttributes(element, obj.attributes);
		};

		element.innerHTML = obj.content;
		element.addEventListener(obj.event, function (ev){
			obj.callback.call(element, ev, self);
		});

		this.elements[obj.name] = element;

		return this;
	},

	append: function (el, target){
		'use strict';
		target.appendChild(this.getElement(el));
	},

	prepend: function (el, target){
		'use strict';
		target.insertBefore(this.getElement(el), target.firstChild);
	},

	insert: function (el, target){
		'use strict';
		target.innerHTML = this.getElement(el);
	},

	getElement: function (str){
		'use strict';
		return this.elements[str];
	}
};

module.exports = Dominode;
