var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var prismCore = 'prismjs/components/prism-core';
var Prism = require(prismCore);

var prelude = [
  'prism-clike', 'prism-javascript', 'prism-markup',
  'prism-c', 'prism-ruby', 'prism-css'
];

var prismComponents = path.dirname(require.resolve(prismCore));
var components = _.map(prelude.concat(fs.readdirSync(prismComponents)), function(component) {
  return component.replace(/(\.min)?\.js$/, '');
});

var componentSet = _.uniq(components);
_.each(componentSet, function(component) {
  require(path.join(prismComponents, component));
});


module.exports = function highlight(code, lang) {
  var lang = lang || '';
  switch (lang) {
    case 'ejs':
      lang = 'html';
      break;
  }
  var language = Prism.languages[lang] || Prism.languages.autoit;
  var html = Prism.highlight(code, language);
  return html;
};
