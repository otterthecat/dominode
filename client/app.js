// var Model = require('./dominode/model');
// var View = require('./dominode/view');
var page = require('./dominode/page');
var headlineSchema = require('./schemas/headline');
var footerSchema = require('./schemas/footer');

// var view = new View();
// var headline = new Model(headlineSchema);
// var footer = new Model(footerSchema);

// view.generate([headline, footer])
// 	.prepend('headline', document.querySelector('body'))
// 	.append('footer')
// 	.bond(footer, headline); // footer takes on same events as headline. Triggers same callback (i.e update the headline)

page.register([headlineSchema, footerSchema]);
console.log('page', page);
