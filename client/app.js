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
