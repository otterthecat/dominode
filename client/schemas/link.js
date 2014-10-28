var router = require('../dominode/router');

module.exports = {
	name: 'link',
	element: 'a',
	attributes: {
		'href': 'new/path'
	},
	content: 'click me',
	event: 'click',
	callback: function (ev, page){
		'use strict';
		ev.preventDefault();

		var data = {content: 'new content'};
		router.directTo(this.scheme.attributes.href, data);
		this.update(JSON.stringify(data));
	}
};
