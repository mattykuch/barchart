//Store width and height in variables
var w = 500;
var h = 1700;

// Scale the width
var xScale = d3.scale.linear()
                    .domain([0, 99.1])
                    .range([0,w]);

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

	var rects = svg.selectAll("rect")
					.data(data)
					.enter()
					.append("rect");

	rects.attr("x",0)
		.attr("y", function(d, i) {
			return i*10;
		})
		.attr("width", function(d) {
			return xScale(d.pAverage); 
		})
		.attr("height",8)
		.on("mouseover", hoveron)
		.on("mouseout", hoverout)
		.style("cursor", "pointer")
        .style("stroke", "#777")
        .style("fill", "Steelblue");
});