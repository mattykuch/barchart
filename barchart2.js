//Store width, height and margin in variables
var w2 = 500;
var h2 = 1500;
var margin2 = {top: 40, right: 10, bottom: 20, left: 50};

// Scale the width and height
var xScale2 = d3.scale.linear()
                .range([0, w2 - margin2.right - margin2.left]);

var yScale2 = d3.scale.ordinal()
                .rangeRoundBands([margin2.top, h2 - margin2.bottom],0.2);

// Creat Axes i.e. xAxis and yAxis
var xAxis2 = d3.svg.axis()
              .scale(xScale2)
              .orient("top");

var yAxis2 = d3.svg.axis()
              .scale(yScale2)
              .orient("left");

// Create SVGs 

var svg2 = d3.select("#barchart2")
      .append("svg")
      .attr("width", w2)
      .attr("height", h2);

//Function for number formating of school fees data
var valueFormat = d3.format(",");

// Logic to handle Tooltip on Hover of Bar
var hoveron2 = function(d) {
      var div = document.getElementById('tooltip2');
      div.style.left = event.pageX + 'px';
      div.style.top = event.pageY + 'px';

      
      //Fill white to highlight
      d3.select(this)
        .style("fill", "white");

      //Show the tooltip
      d3.select("#tooltip2")
        .style("opacity", 1);

      //Populate name in tooltip
      d3.select("#tooltip2 .name")
        .text(d.school);

      //Populate value in tooltip
      d3.select("#tooltip2 .value")
        .text("UGX" + " " + valueFormat(d.fees2017)); 
}

var hoverout2 = function(d) {

  //Restore original color fill
  d3.select(this)
    .style("fill", "Green");

  //Hide the tooltip
  d3.select("#tooltip2")
    .style("opacity", 0);

}

// Entering data

d3.csv("data/olevelfeesdata.csv", function(data) {

//console.log(data);
//console.log(data.map(function(d) { return d.rank; } ));
	data.sort(function(a, b) {
		return d3.descending(+a.fees2017, +b.fees2017)
	});
  //Setting a dynamic domain for the xScale based on Data
  xScale2.domain([0, d3.max(data, function(d) {
    return +d.fees2017;
  }) ]);

  //Setting a dynamic domain for the yScale based on Data
  yScale2.domain(data.map(function(d) { return d.rank; } ));

  //Rendering the xAxis
  svg2.append("g")
      .attr("class", "x axis2")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")
      .call(xAxis2);

  //Rendering the yAxis
  svg2.append("g")
      .attr("class", "y axis2")
      .attr("transform", "translate(" + (margin2.left -5)  +  ",0)")
      .call(yAxis2);

  // Rendering the rectangles
	var rects2 = svg2.selectAll("rect")
					.data(data)
					.enter()
					.append("rect");

	rects2.attr("x", margin2.left)
		.attr("y", function(d, i) {
			return yScale2(d.rank);
		})
		.attr("width", function(d) {
			return xScale2(d.fees2017); 
		})
		.attr("height",yScale2.rangeBand)
		.on("mouseover", hoveron2)
		.on("mouseout", hoverout2)
		.style("cursor", "pointer")
        .style("stroke", "#777")
        .style("fill", "Green");
});