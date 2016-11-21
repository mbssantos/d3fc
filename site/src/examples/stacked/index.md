---
layout: example
title: stacked Financial Chart
externals:
  stacked-js: stacked.js
  stacked-html: stacked.html
---

{{{ dynamic-include 'codepen' html='stacked-html' js='stacked-js'}}}
{{{ stacked-html }}}
{{{ dynamic-include 'javascript' js='stacked-js' }}}

This example shows how d3fc can be used to render dynamic data. The basic principle is that the chart render function should be an idempotent transformation of the data. As a result, if the data changes the entire render function is re-evaluated.

```js
{{{ codeblock stacked-js }}}
```
