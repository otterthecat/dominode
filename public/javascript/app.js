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
dominode.getElement('test').fetch({
	url: '/github/dominode/public/',
	data: JSON.stringify({
		"foo" : "bar"
	})
});

},{"./dominode":"/home/d/projects/github/dominode/client/dominode.js"}],"/home/d/projects/github/dominode/client/dominode.js":[function(require,module,exports){
var Dominode = function (){
	'use strict';

	this.elements = {};
};


var applyAttributes = function (el, obj){
	'use strict';

	if(typeof obj !== 'undefined'){
		for(var item in obj){
			el.setAttribute(item, obj[item]);
		};
	};

	return el;
};

	var merge = function(orig_obj, new_obj, overwrite_bool){

		// boolean to test if it's ok to overwrite existing
		// values with new values
		if(typeof orig_obj === 'object' && typeof new_obj === 'object'){

			if(typeof overwrite_bool === 'undefined' || overwrite_bool){

				for(var item in new_obj){

					orig_obj[item] = new_obj[item];
				}
			} else {

				for(var item in new_obj){

					if(!orig_obj.hasOwnProperty(item)){

						orig_obj[item] = new_obj[item];
					}
				}
			}
		}

		return orig_obj;
	};

var createXMLHTTP = function(param_obj){

	var ajax = {};

	if (window.XMLHttpRequest) {

	    ajax = new XMLHttpRequest();
	} else if (window.ActiveXObject) {

	    ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	ajax = setXMLHTTP(ajax, param_obj);

	return ajax.data === null ? ajax.ajax : ajax.ajax.send(ajax.data);
};

var setXMLHTTP = function(request_obj, settings_obj){

	var defaults = {
		method: 'post',
		header: 'application/x-www-form-urlencoded',
		url: '/',
		// data: null,
		onLoading: function(){},	// state 1
		onLoaded: function(){},		// state 2
		onInteract: function(){},	// state 3
		onComplete: function(){},	// state 4
		onError: function(){}
	};


	defaults = merge(defaults, settings_obj);

	request_obj.open(defaults.method, defaults.url, true);
	request_obj.setRequestHeader('Content-Type', defaults.header);
	request_obj.setRequestHeader("X-Requested-With", "XMLHttpRequest");

	request_obj.onReadyStateChange = function(){

		if(request_obj.readyState === 1 ){// loading
			defaults.onLoading();
		};

		if(request_obj.readyState === 2 ){// loaded
			defaults.onLoaded();
		};

		if(request_obj.readyState === 3 ){// interact
			defaults.onInteract();
		};

		if(request_obj.readyState === 4 ){// complete
			if(request_obj.status === 200){
				defaults.onComplete(request_obj.responseText);
			} else {
				defaults.onError(request_obj.responseText, request_obj.status);
			}
		};
	};

	return {ajax: request_obj, data: defaults.data};
};


Dominode.prototype = {

	generate: function (obj){
		var self = this;
		var element = document.createElement(obj.element);
		if(obj.attributes){
			applyAttributes(element, obj.attributes);
		};
		if(!Element.prototype.hasOwnProperty('fetch')){
			Element.prototype.fetch = function (params){
				return createXMLHTTP({
					'url': params.url,
					'data': params.data
				});
			};
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
	},

	fetch: function (params){
		'use strict';
		return createXMLHTTP(params);
	}
};


module.exports = Dominode;

},{}]},{},["/home/d/projects/github/dominode/client/app.js"]);
