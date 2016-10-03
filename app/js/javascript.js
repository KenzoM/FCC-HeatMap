$( document ).ready(function(){
  const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  $.ajax({
    type: "GET",
    dataType: "json",
    url: url,
    beforeSend: ()=> {
    },
    complete: () =>{
    },
    success: (data) =>{
      render(data.data)
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
