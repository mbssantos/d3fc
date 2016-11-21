var width = 500;
var height = 500;
var container = d3.select('#stacked-svg');
container.attr({
  'width': width,
  'height': height
});

d3.csv('https://d3fc.io/examples/stacked/data.csv', function (error, data) {

  // manipulate the data into stacked series
  var stack = d3.stack().keys(Object.keys(data[0]).filter(function (k) {
    return k !== 'Country';
  }));
  var series = stack(data);

  var xExtent = fc.extentLinear()
    .accessors([a => a.map(d => d[1])])
    .include([0]);

  // create scales
  var y = d3.scalePoint()
    .domain(data.map(function (d) {
      return d.Country;
    }))

  var x = d3.scaleLinear()
    .domain(xExtent(series))
    .range([0, width]);

  var color = d3.scaleOrdinal(d3.schemeCategory20)
    .domain(series.map(function (s) {
      return s.key;
    }));

  var count = 0
  var barSeries = fc.seriesSvgBar()
    .orient('horizontal')
    .xScale(x)
    .yScale(y)
    .crossValue(d => d.data.Country)
    .mainValue(d => d[1])
    .baseValue(d => d[0])
    .decorate((selection, data, index) => {
      selection.enter().attr("fill", color(series[count++].key));
      count = count >= 5 ? 0 : count;
    });

  var multi = fc.seriesSvgMulti()
    .mapping((data, series, index) => data[index])
    .series(series.map(() => barSeries));

  var chart = fc.chartSvgCartesian(
      d3.scaleLinear(),
      d3.scaleBand())
    .xDomain([0, 120])
    .yDomain(data.map(entry => entry.Country))
    .xLabel('Million tonnes of oil equivalent')
    .chartLabel('2013 Energy Production')
    .yOrient('left')
    .plotArea(multi);

  d3.select('#stacked-div')
    .text(null) // Remove the loading text from the container
    .datum(series)
    .call(chart);

});
