var _ = require('lodash');
var format = require('util').format;

module.exports = function (quote) {
  var className = this.md_class['blockquote'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  var classAttribute = classes.length !== 0 ? format(' class="%s"', classes) : "";
  return format('<blockquote%s>\n%s</blockquote>\n', classAttribute, quote);
};
