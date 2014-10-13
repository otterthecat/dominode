module.exports = {
	name: 'test',
	element: 'div',
	attributes: {
		'class': 'testing',
		'data-bind': 'other'
	},
	content: '<h1>Hello World</h1>',
	event: 'click',
	// callback takes (event, scope)
	// 'this' is bound to element
	callback: function (ev, scope){
		this.fetch('/github/dominode/public/javascript/data.json');
	}
}
