var Model = require('./dominode/model');
var View = require('./dominode/view');
var schema = require('./schemas/headline');

var view = new View();
var foo = new Model(schema);

view.generate(foo)
	.prepend('test', document.querySelector('body'));
