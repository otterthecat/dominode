var Model = require('./dominode/model');
var View = require('./dominode/view');
var headlineSchema = require('./schemas/headline');
var footerSchema = require('./schemas/footer');

var view = new View();
var headline = new Model(headlineSchema);
var footer = new Model(footerSchema);

view.generate([headline, footer])
	.prepend('headline', document.querySelector('body'))
	.append('footer')
	.bond(footer, headline);
