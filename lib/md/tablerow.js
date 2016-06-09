var _ = require('lodash');
var format = require('util').format;

module.exports = function(content) {
  var className = this.md_class['tablerow'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  var classAttribute = classes.length !== 0 ? format(' class="%s"', classes) : "";

  return format('<tr%s>\n%s</tr>\n', classAttribute, content);
};
