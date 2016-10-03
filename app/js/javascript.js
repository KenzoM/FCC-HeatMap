$( document ).ready(function(){
  const w = 900;
  const h = 600;
  function render(base, data){
    const margin = {
      top: 90,
      bottom: 90,
      right: 90,
      left: 90
    }
    const width = w - (margin.left + margin.right);
    const height = h - (margin.top + margin.bottom);

    const svg = d3.select("#canvas")
                  .append("svg")
                  .attr("id","chart")
                  .attr("width", width)
                  .attr("height", height)

    const chart = d3.select("#chart")
                    .classed("display", true)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const yearParser = d3.timeParse("%Y")
    const monthParser = d3.timeParse("%m")

    const x = d3.scaleTime()
                .domain(d3.extent(data,function(d){
                  // console.log(yearParser(d.year))
                  let year = yearParser(d.year)
                  return d.year
                }))
                .range([0,width])

    const y = d3.scaleTime()
                .domain(d3.extent(data,function(d){
                  // console.log(monthParser(d.month))
                  let month = monthParser(d.month)
                  return d.month
                }))
                .range([0,height])

    const xAxis = d3.axisBottom(x)
                    .tickFormat(d3.timeFormat("%Y"))

    const yAxis = d3.axisLeft(y)
                    .tickFormat(d3.timeFormat("%B"))
    function drawAxis(params){
      //draw xAxis
    }

    function plot(params){
      if (params.initialize){
        drawAxis.call(this,params)
      }
    }

    plot.call(chart,{
      base: base,
      data: data,
      axis: {
        x: xAxis,
        y: yAxis
      },
      initialize: true
    })
  }
  const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';
  $.ajax({
    type: "GET",
    dataType: "json",
    url: url,
    beforeSend: ()=> {
    },
    complete: () =>{
    },
    success: (data) =>{
      const baseTemperature = data.baseTemperature;
      const dataAPI = data.monthlyVariance;
      render(baseTemperature,dataAPI);
    },
    fail: () =>{
      console.log('failure!')
    },
    error: () =>{
      let chart = document.getElementById('card');
      chart.style.display = "table"
      let errorMessage = document.createElement("h1");
      errorMessage.innerHTML = "ERROR 404: File Not Found!"
      errorMessage.className = "errorMessage";
      chart.appendChild(errorMessage)
    }
  });
});
