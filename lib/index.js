var _ = require('lodash');
var marked = require('marked');
var util = require('util');

var MarkedCustomRenderer = (function(MarkedRenderer) {
  function MarkedCustomRenderer(options) {
    MarkedRenderer.call(this, arguments);
    options = options || {};
    options.md_class = options.md_class || {};
    this.md_class = _.extend({}, DEFAULT_MD_CLASS, options);
    this._defineRenderer();
    this._enableSyntaxHighlight(options.highlight);
  }
  util.inherits(MarkedCustomRenderer, marked.Renderer);

  MarkedCustomRenderer.prototype._defineRenderer = function() {
    _.each(this.md_class, function (className, tagName) {
      this[tagName] = require('./md/' + tagName);
    }, this);
  };;

  MarkedCustomRenderer.prototype._enableSyntaxHighlight = function(flag) {
    if (flag) {
      marked.setOptions({highlight: require('./highlight')});
    }
  };

  return MarkedCustomRenderer;
})(marked.Renderer);

module.exports = MarkedCustomRenderer;

var DEFAULT_MD_CLASS = {
  md_class: {
    blockquote: '',
    heading   : '',
    hr        : '',
    list      : '',
    listitem  : '',
    paragraph : '',
    table     : '',
    tablerow  : '',
    tablecell : '',
    link      : '',
    image     : ''
  },
  highlight: true
};
