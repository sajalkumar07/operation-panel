/** MultilineChart.js */
import React from "react";
//import * as window.window.d3 from "window.window.d3";

const MultilineChart = ({ chartData = [], dimensions = {} }) => {
  const svgRef = React.useRef(null);
  // to detect what line to animate we should store previous data state
  const [prevItems, setPrevItems] = React.useState([]);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  React.useEffect(() => {
    var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
      },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var parseDate = window.d3.time.format("%d/%m/%Y, %H:%M:%S").parse;

    var x = window.d3.time.scale().range([0, width]);

    var y = window.d3.scale.linear().range([height, 0]);

    var color = window.d3.scale.category10();

    var xAxis = window.d3.svg
      .axis()
      .scale(x)
      .orient("bottom");

    var yAxis = window.d3.svg
      .axis()
      .scale(y)
      .orient("left");

    var line = window.d3.svg
      .line()
      .interpolate("basis")
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.temperature);
      });

    window.d3
      .select("#chart")
      .selectAll("*")
      .remove();

    var svg = window.d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = chartData.data;

    color.domain(
      window.d3.keys(data[0]).filter(function(key) {
        return key !== "date";
      })
    );

    data.forEach(function(d) {
      d.date = parseDate(d.date.toLocaleString());
    });

    var cities = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {
            date: d.date,
            temperature: +d[name]
          };
        })
      };
    });

    x.domain(
      window.d3.extent(data, function(d) {
        return d.date;
      })
    );

    y.domain([
      window.d3.min(cities, function(c) {
        return window.d3.min(c.values, function(v) {
          return v.temperature;
        });
      }),
      window.d3.max(cities, function(c) {
        return window.d3.max(c.values, function(v) {
          return v.temperature;
        });
      })
    ]);

    var legend = svg
      .selectAll("g")
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "legend");

    legend
      .append("rect")
      .attr("x", width - 20)
      .attr("y", function(d, i) {
        return i * 20;
      })
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(d) {
        return color(d.name);
      });

    legend
      .append("text")
      .attr("x", width - 8)
      .attr("y", function(d, i) {
        return i * 20 + 9;
      })
      .text(function(d) {
        return d.name;
      });

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("gs");

    var city = svg
      .selectAll(".city")
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "city");

    city
      .append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return color(d.name);
      });

    city
      .append("text")
      .datum(function(d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return (
          "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"
        );
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.name;
      });

    var mouseG = svg.append("g").attr("class", "mouse-over-effects");

    mouseG
      .append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    var lines = document.getElementsByClassName("line");

    var mousePerLine = mouseG
      .selectAll(".mouse-per-line")
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine
      .append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text").attr("transform", "translate(10,3)");

    mouseG
      .append("svg:rect") // append a rect to catch mouse movements on canvas
      .attr("width", width) // can't catch mouse events on a g element
      .attr("height", height)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("mouseout", function() {
        // on mouse out hide line, circles and text
        window.d3.select(".mouse-line").style("opacity", "0");
        window.d3.selectAll(".mouse-per-line circle").style("opacity", "0");
        window.d3.selectAll(".mouse-per-line text").style("opacity", "0");
      })
      .on("mouseover", function() {
        // on mouse in show line, circles and text
        window.d3.select(".mouse-line").style("opacity", "1");
        window.d3.selectAll(".mouse-per-line circle").style("opacity", "1");
        window.d3.selectAll(".mouse-per-line text").style("opacity", "1");
      })
      .on("mousemove", function() {
        // mouse moving over canvas
        var mouse = window.d3.mouse(this);
        window.d3.select(".mouse-line").attr("d", function() {
          var d = "M" + mouse[0] + "," + height;
          d += " " + mouse[0] + "," + 0;
          return d;
        });

        window.d3
          .selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            console.log(width / mouse[0]);
            var xDate = x.invert(mouse[0]),
              bisect = window.d3.bisector(function(d) {
                return d.date;
              }).right;
            var idx = bisect(d.values, xDate);

            var beginning = 0,
              end = lines[i].getTotalLength(),
              target = null;

            while (true) {
              target = Math.floor((beginning + end) / 2);
              var pos = lines[i].getPointAtLength(target);
              if (
                (target === end || target === beginning) &&
                pos.x !== mouse[0]
              ) {
                break;
              }
              if (pos.x > mouse[0]) end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }

            window.d3
              .select(this)
              .select("text")
              .text(y.invert(pos.y).toFixed(2));

            return "translate(" + mouse[0] + "," + pos.y + ")";
          });
      });
  }, [chartData]);

  return <div id="chart" />;
};

export default MultilineChart;
