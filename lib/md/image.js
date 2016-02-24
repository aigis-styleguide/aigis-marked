var _ = require('lodash');
var format = require('util').format;

module.exports = function(href, title, text) {
  var className = this.options.md_class['image'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  var end = this.options.xhtml ? '/' : '';
  return format('<img class="%s" src="%s" alt="%s" title="%s"%s>', classes, href, text, title, end);
};
