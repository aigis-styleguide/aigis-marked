var _ = require('lodash');
var marked = require('marked');
var util = require('util');

var MarkedCustomRenderer = (function(MarkedRenderer) {
  function MarkedCustomRenderer(options) {
    MarkedRenderer.call(this, arguments);
    options = options || {};
    this.md_class =  options.md_class || DEFAULT_OPTIONS.md_class;
    var isHighlight = options.highlight === undefined ? DEFAULT_OPTIONS.highlight : options.highlight;
    var langPrefix = options.lang_prefix === undefined ? DEFAULT_OPTIONS.lang_prefix: options.lang_prefix;
    this._defineRenderer(this.md_class);
    this._enableSyntaxHighlight(isHighlight);
    this._setLangPrefix(langPrefix);
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

  MarkedCustomRenderer.prototype._setLangPrefix = function(langPrefix) {
    marked.setOptions({langPrefix: langPrefix});
  }

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
  highlight: true,
  lang_prefix: 'language-'
};
