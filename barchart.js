//Store width, height and margin in variables
var w = 500;
var h = 1500;
var margin = {top: 40, right: 10, bottom: 20, left: 50};

// Scale the width and height
var xScale = d3.scale.linear()
                .range([0,w - margin.right - margin.left]);

var yScale = d3.scale.ordinal()
                .rangeRoundBands([margin.top, h - margin.bottom],0.2);

// Creat Axes i.e. xAxis and yAxis
var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("top");

var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left");

// Create SVG 
var svg = d3.select("#barchart")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

// Logic to handle Tooltip on Hover of Bar
var hoveron = function(d) {
      var div = document.getElementById('tooltip');
      div.style.left = event.pageX + 'px';
      div.style.top = event.pageY + 'px';

      
      //Fill white to highlight
      d3.select(this)
        .style("fill", "white");

      //Show the tooltip
      d3.select("#tooltip")
        .style("opacity", 1);

      //Populate name in tooltip
      d3.select("#tooltip .name")
        .text(d.school);

      //Populate value in tooltip
      d3.select("#tooltip .value")
        .text(d.pAverage + "%"); 
}

var hoverout = function(d) {

  //Restore original color fill
  d3.select(this)
    .style("fill", "Steelblue");

  //Hide the tooltip
  d3.select("#tooltip")
    .style("opacity", 0);

}

// Entering data

d3.csv("data/olevelperformancedata.csv", function(data) {

	data.sort(function(a, b) {
		return d3.descending(a.pAverage, b.pAverage)
	});
  //Setting a dynamic domain for the xScale based on Data
  xScale.domain([0, d3.max(data, function(d) {
    return +d.pAverage;
  }) ]);

  //Setting a dynamic domain for the yScale based on Data
  yScale.domain(data.map(function(d) { return d.rank; } ));

  //Rendering the xAxis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(xAxis);

  //Rendering the yAxis
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (margin.left -5)  +  ",0)")
      .call(yAxis);

  // Rendering the rectangles
	var rects = svg.selectAll("rect")
					.data(data)
					.enter()
					.append("rect");

    rects.attr("x", margin.left)
      .attr("y", function(d, i) {
        return yScale(d.rank);
      })
      .attr("width", function(d) {
        return xScale(d.pAverage); 
      })
      .attr("height",yScale.rangeBand)
  		.on("mouseover", hoveron)
  		.on("mouseout", hoverout)
  		.style("cursor", "pointer")
          .style("stroke", "#777")
          .style("fill", "Steelblue");

//Transitions
  //rects.transition()
        //.duration(1500)
        //.attr("x", margin.left)
        //.attr("width", function(d) {
      //return w - margin.left - xScale(d.pAverage); 
    //});
});
