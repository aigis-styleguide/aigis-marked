# aigis-marked
Custom markdown renderer for aigis used with marked.

## Usage

```
npm i aigis-marked
```

```js
var marked = require('marked');
var AigisMarked = require('aigis-marked');
var renderer = new AigisMarked({
  highlight: true,
  md_class {
    heading: 'heading-class'
  }
});

var html = marked('## hoge\n* hogehoge', {renderer: renderer});
```
