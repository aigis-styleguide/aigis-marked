var _ = require('lodash');
var format = require('util').format;

module.exports = function(text, level, raw) {
  var className = this.md_class['heading'];
  var classes = _.isArray(className) ? className.join(" ") : className;
  var classAttribute = classes.length !== 0 ? format(' class="%s"', classes) : "";
  var id = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
  return format('<h%s%s id="%s">%s</h%s>\n', level, classAttribute, id, text, level);
};
