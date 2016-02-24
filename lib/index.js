var _ = require('lodash');
var marked = require('marked');
var util = require('util');

var MarkedCustomRenderer = (function(MarkedRenderer) {
  function MarkedCustomRenderer(options) {
    MarkedRenderer.call(this, arguments);
    options = options || {};
    this.md_class =  options.md_class || DEFAULT_OPTIONS.md_class;
    var isHighlight = options.highlight || DEFAULT_OPTIONS.highlight;
    this._defineRenderer(this.md_class);
    this._enableSyntaxHighlight(isHighlight);
  }
  util.inherits(MarkedCustomRenderer, marked.Renderer);

  MarkedCustomRenderer.prototype._defineRenderer = function(md_class) {
    _.each(md_class, function (className, tagName) {
      this[tagName] = require('./md/' + tagName);
    }.bind(this));
  };

  MarkedCustomRenderer.prototype._enableSyntaxHighlight = function(flag) {
    if (flag) {
      marked.setOptions({highlight: require('./highlight')});
    }
  };

  return MarkedCustomRenderer;
})(marked.Renderer);

module.exports = MarkedCustomRenderer;

var DEFAULT_OPTIONS = {
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
