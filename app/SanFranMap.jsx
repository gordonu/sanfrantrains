import React from 'react';
import * as d3 from 'd3';
import './main.css';

class SanFranMap extends React.Component {

  componentDidMount() {
    this.drawMap();
  }

  componentDidUpdate() {
    // console.log(this.props.locations.data.lastTime.time)
    d3.select(this.svg).selectAll("circle").remove();
    this.drawLocations();


    // this.drawChart();
  }

  // shouldComponentUpdate() {
  //   return false; // This prevents future re-renders of this component
  // }

  drawMap() {
    /*
      D3 code to create our visualization by appending onto this.svg
    */

    var width = 920
    var height = 800

    //Set svg widgth & height
    var svg = d3.select(this.svg)
      .attr('width', width)
      .attr('height', height);

    //Select checkbox
    d3.select("#nValue").on("change", function () {
      console.log(this.value)
      // update(+this.value);
    });

    //Define path generator, using the Albers USA projection

    var projection = d3.geoMercator()
      .center([-122.433701, 37.767683])
      .scale(250000)
      .translate([width / 2, height / 2]);


    var path = d3.geoPath()
      .projection(projection);


    // var path = d3.geoPath()
    //   .projection(d3.geoAlbersUsa());

    //Load in GeoJSON data
    d3.json("../sfmaps/arteries.json", function (json) {
      // console.log(json)
      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "arteries")
        .attr("d", path);

    });

    d3.json("../sfmaps/freeways.json", function (json) {
      // console.log(json)
      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "freeways")
        .attr("d", path);

    });

    d3.json("../sfmaps/neighborhoods.json", function (json) {
      // console.log(json)
      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "neighborhoods")
        .attr("d", path);

    });

    d3.json("../sfmaps/streets.json", function (json) {
      // console.log(json)
      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "streets")
        .attr("d", path);

    });
  }

  drawLocations() {
    var width = 920
    var height = 800
    //Set svg widgth & height
    var svg = d3.select(this.svg)
      .attr('width', width)
      .attr('height', height);

    var projection = d3.geoMercator()
      .center([-122.433701, 37.767683])
      .scale(250000)
      .translate([width / 2, height / 2]);

    var formatAsThousands = d3.format(",");

    svg.selectAll("circle")
      .data(this.props.locations.data.vehicle)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return projection([d.lon, d.lat])[0];
      })
      .attr("cy", function (d) {
        return projection([d.lon, d.lat])[1];
      })
      .attr("r", 5)
      .attr("id", function (d) {
        return d.routeTag
      })
      .style("fill", "purple")
      .style("stroke", "gray")
      .style("stroke-width", 0.25)
      .style("opacity", 0.75)
      .append("title")			//Simple tooltip
      .text(function (d) {
        return d.place + ": Pop. " + formatAsThousands(d.population);
      });

    console.log('drawing done')
  }


  removeLocations() {
    d3.select(this.svg).selectAll("circle").remove();
  }

  handleChange(val) {
    console.log('handleChange executed!!!!', val)
    console.log('HELLO', N.active)
    let active = N.active ? false : true,
      newOpactiy = active ? 0 : .1;
    d3.select(this.svg).selectAll("#N").style("opacity", newOpactiy)
    N.active = active;
  }


  render() {
    return (
      <div>
        <svg className="chart" ref={(elem) => { this.svg = elem; }}>
        </svg>
        <h1>HELLO! PLEASE SELECT ROUTES.</h1>
        <input type="checkbox" value="N" id="nValue" onClick={(value) => { this.handleChange(value) }} checked/> N <br />
        <input type="button" value="Redraw" id="nValue2" onClick={(value) => { this.drawLocations() }} />
        <input type="button" value="Remove" id="nValue3" onClick={(value) => { this.removeLocations() }} />
      </div>
    );
  }
}

export default SanFranMap;

