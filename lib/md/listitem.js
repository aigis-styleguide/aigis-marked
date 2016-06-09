var _ = require('lodash');
var format = require('util').format;

module.exports = function(text) {
  var className = this.md_class['listitem'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  var classAttribute = classes.length !== 0 ? format(' class="%s"', classes) : "";

  return format('<li%s>%s</li>\n', classAttribute, text);
};
