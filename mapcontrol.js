$(document).ready(function(){
  alert('Ready to go4');

  $("#place1").mouseover(function(){
    $('#place1").addclass('visible');

  });
  $("#place1").mouseout(function(){
    $('#place1').addclass('invisible');
  });
  
});
