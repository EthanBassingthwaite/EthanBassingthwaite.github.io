$(document).ready(function(){
  alert('Ready to go');

  $("#place1").mouseover(function(){
    $("p").css("background-color", "yellow");
  });
  $("p").mouseout(function(){
    $("p").css("background-color", "lightgray");
  });
  
});
  
});
