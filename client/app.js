var page = require('./dominode/page');
var headlineSchema = require('./schemas/headline');
var footerSchema = require('./schemas/footer');

page.register([headlineSchema, footerSchema])
	.prepend('headline')
	.append('footer')
	.bond('footer', 'headline');
