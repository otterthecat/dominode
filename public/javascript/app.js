(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/d/projects/github/dominode/client/app.js":[function(require,module,exports){
var Dominode = require('./dominode');

var dominode = new Dominode();

var testAttributes = {
	'class': 'testing',
	'data-bind': 'other'
};

dominode.generate({
	name: 'test',
	element: 'div',
	attributes: testAttributes,
	content: '<h1>Hello World</h1>',
	event: 'click',
	// callback takes (event, scope)
	// 'this' is bound to element
	callback: function (ev, scope){
		var nm = new Date();
		var el =scope.generate({
			name: nm,
			element: 'h3',
			content: 'and another'
		});
		el.append(nm, this);
	}
});

dominode.prepend('test', document.querySelector('body'));
dominode.getElement('test').fetch('/github/dominode/public/javascript/data.json')
.then(function(response){
	console.log('pass', response);
}, function(reject){
	console.log('fail', reject);
}).catch(function (err){
	console.log('caught', err);
});

},{"./dominode":"/home/d/projects/github/dominode/client/dominode.js"}],"/home/d/projects/github/dominode/client/dominode.js":[function(require,module,exports){
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

},{}]},{},["/home/d/projects/github/dominode/client/app.js"]);
