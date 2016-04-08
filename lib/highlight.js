var Highlights = require('highlights');
var highlighter = new Highlights();

module.exports = function highlight(code, type) {
  type = type || '';
  var scope = {
    js: 'source.js', javascript: 'source.js',
    babel: 'source.js', es6: 'source.js',
    jsx: 'source.js.jsx',
    coffee: 'source.coffee',
    html: 'text.html.gohtml',
    jade: 'source.jade',
    ejs: 'text.html.js',
    md: 'source.gfm', markdown: 'source.gfm',
    block: 'text.html.gohtml',
    css: 'source.css',
    scss: 'source.css.scss',
    sass: 'source.sass',
    less: 'source.css.less',
    stylus: 'source.stylus',
    json: 'source.json',
    cson: 'source.coffee',
    yaml: 'source.yaml',
    c: 'source.c', cpp: 'source.cpp',
    clojure: 'source.clojure',
    gitcommit: 'text.git-commit', gitconfig: 'source.git-config', gitrebase: 'text.git-rebase',
    go: 'source.go', gohtml: 'text.html.gohtml', gotemplate: 'source.gotemplate',
    jsp: 'text.html.jsp', java: 'source.java', javaproperties: 'source.java-properties', junittestreport: 'text.junit-report',
    make: 'source.makefile', objcpp: 'source.objcpp', objc: 'source.objc', 
    perl: 'source.perl', php: 'text.html.php', python: 'source.python',
    erb: 'text.html.erb', ruby: 'source.ruby', rhtml: 'text.html.ruby', 'html.erb': 'text.html.ruby',
    sh: 'source.shell', shell: 'text-shell-session', bash: 'source.shell', ksh: 'source.shell', zsh: 'source.shell',
    
    sql: 'source.sql', ddl: 'source.sql', dml: 'source.sql', pgsql: 'source.sql',
    txt: 'text.plain', text: 'text.plain', todo: 'text.todo', toml: 'source.toml',
    xml: 'text.xml', 
  };
  type = type.toLowerCase();
  var scopeName = scope[type] || 'text.html.gohtml';

  switch(type) {
    case 'jade':
      grammarsRegister('jade');
      break;
    case 'stylus':
      grammarsRegister('stylus');
      break;
    case 'jsx':
      grammarsRegister('jsx');
      break;
    case 'ejs':
      grammarsRegister('ejs');
      break;
  }

  var html = highlighter.highlightSync({
    fileContents: code,
    scopeName: scopeName,
  });

  return html;
};

var loaded = {};
function grammarsRegister(type) {
  var packageName;

  // doesn't load same grammar
  if (loaded[type]) return;
  switch(type) {
    case 'jade':
      packageName = 'language-jade';
      loaded[type] = true;
      break;
    case 'stylus':
      packageName = 'language-stylus';
      loaded[type] = true;
      break;
    case 'jsx':
      packageName = 'react';
      loaded[type] = true;
      break;
    case 'ejs':
      packageName = 'language-ejs';
      loaded[type] = true;
      break;
  }

  highlighter.requireGrammarsSync({
    modulePath: require.resolve(packageName + '/package.json')
  });
}
