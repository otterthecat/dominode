var page = require('./dominode/page');
var hcf = require('./layouts/header-content-footer');
var headlineSchema = require('./schemas/headline');
var link = require('./schemas/link');
var footerSchema = require('./schemas/footer');

page.useLayout(hcf)
	.register([headlineSchema, link, footerSchema])
	.prepend('headline', document.querySelector('#main-header'))
	.append('link', document.querySelector('#main-content'))
	.append('footer', document.querySelector('#main-footer'))
	.bond('link', 'headline', 'function');
