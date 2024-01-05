$(document).ready(function(){
  alert('Ready to go5');

  $("#place1icon").mouseover(function(){
    $('#place1").addclass('visible');
    $('#place1").removeclass('invisible');
  });
  $("#place1icon").mouseout(function(){
    $('#place1').addclass('invisible');
    $('#place1').removeclass('visible');
    alert('wow');
  });
  
});
