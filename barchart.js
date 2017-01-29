// Create SVG 
var svg = d3.select("#barchart")
			.append("svg")
			.attr("width", 1000)
			.attr("height", 3400);




// Entering data

d3.csv("data/olevelperformancedata.csv", function(data) {

	svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("x",0)
		.attr("y", function(d, i) {
			return i*10;
		})
		.attr("width", function(d) {
			return +d.pAverage * 10 ;
		})
		.attr("height",8);
});