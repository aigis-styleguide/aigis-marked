var _ = require('lodash');
var format = require('util').format;

module.exports = function(href, title, text) {
  var className = this.md_class['image'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  var classAttribute = classes.length !== 0 ? format(' class="%s"', classes) : "";
  var end = this.options.xhtml ? '/' : '';
  return format('<img%s src="%s" alt="%s" title="%s"%s>', classAttribute, href, text, title, end);
};
