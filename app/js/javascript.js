$( document ).ready(function(){
  const w = 900;
  const h = 800;
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
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

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
