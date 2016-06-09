var _ = require('lodash');
var format = require('util').format;

module.exports = function() {
  var className = this.md_class['hr'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  var classAttribute = classes.length !== 0 ? format(' class="%s"', classes) : "";
  var end = this.options.xhtml ? '/' : '';
  return format('<hr%s%s>\n', classAttribute, end);
};
