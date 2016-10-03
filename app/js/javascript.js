$( document ).ready(function(){
  const w = 1250;
  const h = 600;
  const margin = {
    top: 50,
    bottom: 80,
    left: 60,
    right: 10
  }
  function render(base, data){
    const width = w - (margin.left + margin.right);
    const height = h - (margin.top + margin.bottom);

    const svg = d3.select("#canvas")
                  .append("svg")
                  .attr("id","chart")
                  .attr("width", w)
                  .attr("height", h)

    const chart = svg.append("g")
                    .classed("display", true)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const yearParser = d3.timeParse("%Y")
    const monthParser = d3.timeParse("%m")

    const x = d3.scaleTime()
                .domain(d3.extent(data,function(d){
                  let year = yearParser(d.year)
                  return year
                }))
                .range([0,width]);

    const y = d3.scaleTime()
                .domain([monthParser(data[0].month),monthParser(data[11].month)])
                .range([0,height])

    const xAxis = d3.axisBottom(x)
                    .tickFormat(d3.timeFormat("%Y"))

    const yAxis = d3.axisLeft(y)
                    .tickFormat(d3.timeFormat("%B")).tickSize(0).tickPadding(6);

    function drawAxis(params){
      //draw xAxis
      this.append("g")
          .call(params.axis.x)
          .classed("x axis", true)
          .attr("transform", "translate(0,"+ height +")")

      //draw yAxis
      this.append("g")
          .call(params.axis.y)
          .classed("y axis",true)
          .attr("transform","translate(0,0)")
            .selectAll("text")
            // .attr("dy",-15)
    }

    function plot(params){
      if (params.initialize){
        drawAxis.call(this,params)
      }
      //enter()
      this.selectAll(".bar")
        .data(params.data)
        .enter()
          .append("rect")
          .classed("bar", true)
      //update
      this.selectAll(".bar")
        .attr("x",function(d,i){
          let year = yearParser(d.year)
          return x(year)
        })
      this.selectAll(".bar")
        .attr("y",function(d,i){
          let month = monthParser(d.month)
          return y(month)
        })
      this.selectAll(".bar")
        .attr("width", 2)
      this.selectAll(".bar")
        .attr("height", 20)
      this.selectAll(".bar")
        .style("fill", "skyblue")

      //exit()
      this.selectAll(".bar")
        .data(params.data)
        .exit()
        .remove()
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
