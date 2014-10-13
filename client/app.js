var Model = require('./dominode/model');
var View = require('./dominode/view');
var schema = require('./schemas/headline');

var view = new View();
var headline = new Model(schema);

view.generate(headline)
	.prepend('headline', document.querySelector('body'));
