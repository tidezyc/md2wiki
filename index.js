var md = require('markdown-it')()
var Renderer = require('markdown-it/lib/renderer')
var rules = require('./renderer');
var _ = require('min-util');

var renderer = new Renderer()
renderer.rules = _.extend(renderer.rules, rules)

module.exports = exports = md2wiki

function md2wiki(text) {
	var tokens = md.parse(text, {})
	console.log(tokens)
	return renderer.render(tokens ,md.options, {})
}
