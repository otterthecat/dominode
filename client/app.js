var page = require('./dominode/page');
var layout = require('./dominode/layout');
var hcf = require('./layouts/header-content-footer');
var headlineSchema = require('./schemas/headline');
var footerSchema = require('./schemas/footer');
layout.generate(hcf);
page.register([headlineSchema, footerSchema])
	.prepend('headline')
	.append('footer')
	.bond('footer', 'headline');
