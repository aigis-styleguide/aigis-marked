var _ = require('lodash');
var format = require('util').format;

module.exports = function(header, body) {
  var className = this.md_class['table'];
  var classes = _.isArray(className) ? className.join(' ') : className;
  var classAttribute = classes.length !== 0 ? format(' class="%s"', classes) : "";

  return format('<table%s>\n<thead>\n%s</thead>\n<tbody>\n%s</tbody>\n</table>\n', classAttribute, header, body);
};
