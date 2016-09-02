---
name: shape-api
structure:
  - title: d3fc-shape
    level: 1
    content: "A collection of SVG/canvas path generators for creating chart series\r\n\r\n"
    children:
      - title: API Reference
        level: 2
        content: "* [Example usage](#example-usage)\r\n* [Bar](#bar)\r\n* [Boxplot](#boxplot)\r\n* [Candlestick](#candlestick)\r\n* [Error Bar](#error-bar)\r\n* [OHLC](#ohlc)\r\n\r\nAll of the exported functions have the same signature, `(context) => generator`. The context supplied must be an implementation of the subset of Context2D methods as implemented by [d3-path](https://github.com/d3/d3-path) (or indeed a Context2D!).\r\n\r\nYou can then configure the `generator` by invoking the relevant methods (e.g. `generator.x(/* ... */)`) as described below. Once suitably configured invoke the generator function itself with the required data (e.g. `generator([/* ... */])`).\r\n\r\n"
        children:
          - title: Example usage
            level: 3
            content: "#### SVG\r\n\r\n```javascript\r\n\r\nimport { path } from 'd3-path';\r\nimport { shapeCandlestick } from 'd3fc-shape';\r\n\r\nconst ctx = path();\r\n\r\nconst candlestick = shapeCandlestick()\r\n  .x((d, i) => i)\r\n  .open((d) => d.open)\r\n  .high((d) => d.high)\r\n  .low((d) => d.low)\r\n  .close((d) => d.close);\r\n\r\nd3.select('path')\r\n  .datum([\r\n    { open: 4, high: 5, low: 3, close: 3 }\r\n  ])\r\n  .attr('d', candlestick);\r\n\r\n```\r\n\r\n#### Canvas\r\n\r\n```javascript\r\n\r\nimport { shapeCandlestick } from 'd3fc-shape';\r\n\r\nconst ctx = document.querySelector('canvas').getContext('2d');\r\n\r\nconst candlestick = shapeCandlestick()\r\n  .context(ctx)\r\n  .x((d, i) => i)\r\n  .open((d) => d.open)\r\n  .high((d) => d.high)\r\n  .low((d) => d.low)\r\n  .close((d) => d.close);\r\n\r\ncandlestick([\r\n  { open: 4, high: 5, low: 3, close: 3 }\r\n]);\r\n\r\nctx.stroke();\r\n\r\n```\r\n\r"
          - title: Bar
            level: 3
            content: "<a name=\"shapeBar\" href=\"#shapeBar\">#</a> fc.**shapeBar**(*context*)\r\n\r\n<a name=\"shapeBar_x\" href=\"#shapeBar_x\">#</a> *shapeBar*.**x**(*accessorFunc*)  \r\n<a name=\"shapeBar_y\" href=\"#shapeBar_y\">#</a> *shapeBar*.**y**(*accessorFunc*)  \r\n<a name=\"shapeBar_width\" href=\"#shapeBar_width\">#</a> *shapeBar*.**width**(*accessorFunc*)  \r\n<a name=\"shapeBar_height\" href=\"#shapeBar_height\">#</a> *shapeBar*.**height**(*accessorFunc*)  \r\n\r\nThe attribute accessor methods available to set the way the bar chart accesses the data.\r\nThe `accessorFunc(datum, index)` function is called on each item of the data, and returns\r\nthe relevant value for the relevant attribute for that item.\r\n\r\n<a name=\"shapeBar_horizontalAlign\" href=\"#shapeBar_horizontalAlign\">#</a> *shapeBar*.**horizontalAlign**(*alignment*)  \r\n\r\n`alignment` is one of: `left`, `right` or `center` (default)\r\n\r\n<a name=\"shapeBar_verticalAlign\" href=\"#shapeBar_verticalAlign\">#</a> *shapeBar*.**verticalAlign**(*alignment*)  \r\n\r\n`alignment` is one of: `bottom`, `top` or `center` (default)\r\n\r"
          - title: Boxplot
            level: 3
            content: "<a name=\"shapeBoxPlot\" href=\"#shapeBoxPlot\">#</a> fc.**shapeBoxPlot**(*context*)\r\n\r\n<a name=\"shapeBoxPlot_value\" href=\"#shapeBoxPlot_value\">#</a> *shapeBoxPlot*.**value**(*accessorFunc*)  \r\n<a name=\"shapeBoxPlot_median\" href=\"#shapeBoxPlot_median\">#</a> *shapeBoxPlot*.**median**(*accessorFunc*)  \r\n<a name=\"shapeBoxPlot_upperQuartile\" href=\"#shapeBoxPlot_upperQuartile\">#</a> *shapeBoxPlot*.**upperQuartile**(*accessorFunc*)  \r\n<a name=\"shapeBoxPlot_lowerQuartile\" href=\"#shapeBoxPlot_lowerQuartile\">#</a> *shapeBoxPlot*.**lowerQuartile**(*accessorFunc*)  \r\n<a name=\"shapeBoxPlot_high\" href=\"#shapeBoxPlot_high\">#</a> *shapeBoxPlot*.**high**(*accessorFunc*)  \r\n<a name=\"shapeBoxPlot_low\" href=\"#shapeBoxPlot_low\">#</a> *shapeBoxPlot*.**low**(*accessorFunc*)  \r\n<a name=\"shapeBoxPlot_width\" href=\"#shapeBoxPlot_width\">#</a> *shapeBoxPlot*.**width**(*accessorFunc*)  \r\n\r\nThe attribute accessor methods available to set the way the bar chart accesses the data.\r\nThe `accessorFunc(datum, index)` function is called on each item of the data, and returns\r\nthe relevant value for the relevant attribute for that item.\r\n\r\n<a name=\"shapeBoxPlot_cap\" href=\"#shapeBoxPlot_cap\">#</a> *shapeBoxPlot*.**cap**(*accessorFunc*)  \r\n\r\nThe `accessorFunc(item, index)` function is called on each item of the data, and returns\r\nthe **proprtion** of the box width that the caps width should be.\r\n\r\n<a name=\"shapeBoxPlot_orient\" href=\"#shapeBoxPlot_orient\">#</a> *shapeBoxPlot*.**orient**(*orientation*)  \r\n\r\nOrientation of the chart. Either `horizontal` (default) or `vertical`\r\n\r"
          - title: Candlestick
            level: 3
            content: "<a name=\"shapeCandlestick\" href=\"#shapeCandlestick\">#</a> fc.**shapeCandlestick**(*context*)\r\n\r\n<a name=\"shapeCandlestick_x\" href=\"#shapeCandlestick_x\">#</a> *shapeCandlestick*.**x**(*accessorFunc*)  \r\n<a name=\"shapeCandlestick_open\" href=\"#shapeCandlestick_open\">#</a> *shapeCandlestick*.**open**(*accessorFunc*)  \r\n<a name=\"shapeCandlestick_high\" href=\"#shapeCandlestick_high\">#</a> *shapeCandlestick*.**high**(*accessorFunc*)  \r\n<a name=\"shapeCandlestick_low\" href=\"#shapeCandlestick_low\">#</a> *shapeCandlestick*.**low**(*accessorFunc*)  \r\n<a name=\"shapeCandlestick_close\" href=\"#shapeCandlestick_close\">#</a> *shapeCandlestick*.**close**(*accessorFunc*)  \r\n<a name=\"shapeCandlestick_width\" href=\"#shapeCandlestick_width\">#</a> *shapeCandlestick*.**width**(*accessorFunc*)  \r\n\r\nThe attribute accessor methods available to set the way the bar chart accesses the data.\r\nThe `accessorFunc(datum, index)` function is called on each item of the data, and returns\r\nthe relevant value for the relevant attribute for that item.\r\n\r"
          - title: Error Bar
            level: 3
            content: "<a name=\"shapeErrorBar\" href=\"#shapeErrorBar\">#</a> fc.**shapeErrorBar**(*context*)\r\n\r\n<a name=\"shapeErrorBar_value\" href=\"#shapeErrorBar_value\">#</a> *shapeErrorBar*.**value**(*accessorFunc*)  \r\n<a name=\"shapeErrorBar_high\" href=\"#shapeErrorBar_high\">#</a> *shapeErrorBar*.**high**(*accessorFunc*)  \r\n<a name=\"shapeErrorBar_low\" href=\"#shapeErrorBar_low\">#</a> *shapeErrorBar*.**low**(*accessorFunc*)  \r\n<a name=\"shapeErrorBar_width\" href=\"#shapeErrorBar_width\">#</a> *shapeErrorBar*.**width**(*accessorFunc*)  \r\n\r\nThe attribute accessor methods available to set the way the bar chart accesses the data.\r\nThe `accessorFunc(datum, index)` function is called on each item of the data, and returns\r\nthe relevant value for the relevant attribute for that item.\r\n\r\n<a name=\"shapeErrorBar_orient\" href=\"#shapeErrorBar_orient\">#</a> *shapeErrorBar*.**orient**(*orientation*)  \r\n\r\nOrientation of the chart. Either `horizontal` (default) or `vertical`\r\n\r"
          - title: OHLC
            level: 3
            content: "<a name=\"shapeOhlc\" href=\"#shapeOhlc\">#</a> fc.**shapeOhlc**(*context*)\r\n\r\n<a name=\"shapeOhlc_x\" href=\"#shapeOhlc_x\">#</a> *shapeOhlc*.**x**(*accessorFunc*)  \r\n<a name=\"shapeOhlc_open\" href=\"#shapeOhlc_open\">#</a> *shapeOhlc*.**open**(*accessorFunc*)  \r\n<a name=\"shapeOhlc_high\" href=\"#shapeOhlc_high\">#</a> *shapeOhlc*.**high**(*accessorFunc*)  \r\n<a name=\"shapeOhlc_low\" href=\"#shapeOhlc_low\">#</a> *shapeOhlc*.**low**(*accessorFunc*)  \r\n<a name=\"shapeOhlc_close\" href=\"#shapeOhlc_close\">#</a> *shapeOhlc*.**close**(*accessorFunc*)  \r\n<a name=\"shapeOhlc_width\" href=\"#shapeOhlc_width\">#</a> *shapeOhlc*.**width**(*accessorFunc*)  \r\n\r\nThe attribute accessor methods available to set the way the bar chart accesses the data.\r\nThe `accessorFunc(datum, index)` function is called on each item of the data, and returns\r\nthe relevant value for the relevant attribute for that item.\r\n\r\n<a name=\"shapeOhlc_orient\" href=\"#shapeOhlc_orient\">#</a> *shapeOhlc*.**orient**(*orientation*)  \r\n\r\nOrientation of the chart. Either `horizontal` (default) or `vertical`\r\n"
sidebarContents:
  - title: Example usage
    id: example-usage
  - title: Bar
    id: bar
  - title: Boxplot
    id: boxplot
  - title: Candlestick
    id: candlestick
  - title: Error Bar
    id: error-bar
  - title: OHLC
    id: ohlc
layout: api
section: api
title: Shape

---
