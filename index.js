//! CONSTS
const WIDTH = 960
const HEIGHT = 600
const PADDING = 60;

//! SVG
const svg = d3.select('.chart-container')
  .append('svg')
  .attr('width', WIDTH) 
  .attr('height', HEIGHT);

const path = d3.geoPath();

// //! TOOLTIP
// const tooltip = d3.select('.chart-container')
//   .append('div')
//   .attr('id', 'tooltip')
//   .style('opacity', 0);


// Load external data and boot
// d3.queue()
//   .defer(d3.json, COUNTY_DATA)
//   .defer(d3.json, EDUCATION_DATA)
//   .await(buildWithData);