//! CONSTS
const MARGIN = 30;
const WIDTH = 950 - 2 * MARGIN;
const HEIGHT = 950 - 2 * MARGIN;
const projectName = 'tree-map' //Makes FCC's tester preselect this project

//! DATA
const MOVIE_DATA = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json';
const LEGEND_SIZE = 20;
const DATA = [];

const buildTreemapOnFetch = (error, dataset) => {
  if (error) throw new Error(error);

  //! SVG
  const svg = d3.select('.chart-container')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .append('g')

  //! TOOLTIP
  const tooltip = d3.select('.chart-container')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0);

  //!ROOT OF TREE
  const root = d3.hierarchy(dataset)
    .sum(d => d.value)
    .sort((a, b) => b.height - a.height);

  //! COLORS
  const colorScale = d3
    .scaleOrdinal()
    .domain([...new Set(DATA.map(d => d.category))])
    .range(d3.schemeSet1);

  //! DEFINE TREE'S ATTRIBUTES
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
    // .attr()
    .attr('x', d => d.x0 )
    .attr('y', d => d.y0 )
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    // .data(DATA)
    .attr('fill', d => colorScale((d.data.category)))
    .attr('data-name', d => d.data.name)
    .attr('data-category', d => d.data.category)
    .attr('data-value', d => d.data.value)
    .attr('class', 'tile')
    .on('mouseover', (d) => {
      tooltip
        .transition()
        .duration(200)
        .style('opacity', .9)
        .attr('data-value', d.data.value)
      tooltip
        .html(
          `
          Name: ${d.data.name}<br />
          Category: ${d.data.category}<br/>
          Value: ${d.data.value}
           
          `
        )
        .style('left', `${d3.event.screenX - MARGIN}px`)
        .style('top', `${d3.event.clientY -  MARGIN }px`)
    })
    .on('mouseout', () => {
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 0)
    });
    
  //! LEGEND
  const legend = d3
    .select('#legend')
    .attr('height', LEGEND_SIZE * 10);

  legend.selectAll('legend-square')
  .data(colorScale.domain())
  .enter()
  .append('rect')
    .attr('class', 'legend-item')
    .attr('x', MARGIN )
    .attr('y', (_, i) => i * (LEGEND_SIZE + 5))
    .attr('width', LEGEND_SIZE)
    .attr('height', LEGEND_SIZE)
    .attr('fill', d => colorScale(d));

legend.selectAll('legend-label')
  .data(colorScale.domain())
  .enter()
  .append('text')
    .attr('x', MARGIN + LEGEND_SIZE * 2 )
    .attr('y', (_, i) =>  i * (LEGEND_SIZE + 5 ))
    .attr('fill', d => colorScale(d))
    .text(d => d)
    .attr('text-anchor', 'left')
    .style('alignment-baseline', 'middle')
    .attr('transform', `translate(${0}, ${10})`)

  
// text
svg.selectAll('text')
.data(root.leaves())
.enter()
.append('text')
  .attr('x', d => d.x0 + 5)
  .attr('y', d => d.y0 + LEGEND_SIZE)
  .text(d => d.data.name.replace(/([:-].*).$/g, ""))
  .attr('font-size', '0.5em')
  .attr('fill', 'black');
} 

//! 
// Load external data and boot
d3.queue()
  .defer(d3.json, MOVIE_DATA)
  .await(buildTreemapOnFetch);