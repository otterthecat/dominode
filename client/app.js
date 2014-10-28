var page = require('./dominode/page');
var layout = require('./dominode/layout');
var hcf = require('./layouts/header-content-footer');
var headlineSchema = require('./schemas/headline');
var link = require('./schemas/link');
var footerSchema = require('./schemas/footer');

layout.generate(hcf);
page.register([headlineSchema, link, footerSchema])
	.prepend('headline', document.querySelector('#main-header'))
	.append('link', document.querySelector('#main-content'))
	.append('footer', document.querySelector('#main-footer'))
	.bond('footer', 'headline');
