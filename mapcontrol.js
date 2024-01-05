$(document).ready(function(){
  alert('Ready to go3');

  $("#place1").mouseover(function(){
    $("p").css("background-color", "yellow");
    alert('a thing happened')
  });
  $("#place1").mouseout(function(){
    $("p").css("background-color", "lightgray");
  });
  
});
