//! CONSTS
const MARGIN = 30;
const WIDTH = 600 -  2 * MARGIN;
const HEIGHT = 600 - 2 * MARGIN;
const projectName = 'tree-map' //Makes FCC's tester preselect this project

//! DATA
const MOVIE_DATA = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json';


const buildTreemapOnFetch = (error, dataset) => {
  if (error) throw new Error(error);

  //! SVG
  const svg = d3.select('.chart-container')
    .append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT)
    .append('g')
    .attr('transform', `translate(${MARGIN}, ${MARGIN})`);

  const root = d3.hierarchy(dataset);
  root.sum(d => d.value)

  d3.treemap()
    .size([WIDTH, HEIGHT])
    .padding(1)
    (root);

// render the tree
  svg
    .selectAll('rect')
    .data(root.leaves())
    .enter()
    .append('rect')
      .attr('class', 'tile')
      .attr('x', d => d.x0 )
      .attr('y', d => d.y0 - 30)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0);  

// text
svg.selectAll('text')
.data(root.leaves())
.enter()
.append('text')
  .attr('x', d => d.x0)
  .attr('y', d => d.y0)
  .text(d => d.data.name)
  .attr('font-size', '0.7em')
  .attr('fill', 'white')
  //?***************************?/
  console.log(root.leaves())
  //?***************************?
} 

//! 
// Load external data and boot
d3.queue()
  .defer(d3.json, MOVIE_DATA)
  .await(buildTreemapOnFetch);