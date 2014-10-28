module.exports = {
	name : 'headline',
	element : 'div',
	attributes : {
		'class' : 'testing',
		'data-bind' : 'other'
	},
	content : '<h1>Hello World</h1>',
	url : '/github/dominode/public/javascript/data.json',
	event : 'click',
	// callback takes (event, page)
	// 'this' is bound to model
	callback : function () {
		'use strict';
		this.fetch();
	}
};
