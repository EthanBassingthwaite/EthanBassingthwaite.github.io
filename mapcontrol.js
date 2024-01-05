$(document).ready(function(){
  alert('Ready to go6');

  var $div = $('#place1'),
    hoverIn = function(){
        $div.css('visibility', 'visible');
    },
    hoverOut = function(){
        $div.css('visibility', 'hidden');
    };

$('#place1').hover(hoverIn, hoverOut);
  
});
