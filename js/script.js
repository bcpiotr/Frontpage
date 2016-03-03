$(function(){
  var panel = $('.panel');
  var main = $('.main');
  console.log(panel);

mozaicAnimation("white");

/**********************
MOZAIC Animation
**********************/

function mozaicAnimation(color){
  panel.each(function( index ) {
    var delayTime = Math.floor((Math.random() * 5000) + 1000);
    $(this).css('display', 'none');
    $(this).css('backgroundColor', color);
    $(this).fadeIn( delayTime, function() {
    // Animation complete
  });
  });
}


/*************************
PANEL RESIZE FUNCTION
*************************/
//przy wejsciu sprawdza szerokosc 'main' i ew. zmienia css height dla panelu
  var width = main.width()/10;
  if (main.width() < 670) {
    panel.css("height", width);
  }

//Przy resize zmienia w css height panelu
  $(window).on('resize',function(){
    width = main.width()/10;
    console.log(width);
    panel.css("height", width);
  })

/*****************************************
USTAWIA BUTTONY NA 4 OSTATNICH PANELACH
****************************************/
panel.last().attr('id', 'btnContact');
panel.eq(-2).attr('id', 'btnPortfolio');
panel.eq(-3).attr('id', 'btnResume');
panel.eq(-4).attr('id', 'btnAbout');


/****************************************
AKCJE BUTTONOW
***************************************/
$('#btnResume').on('click',function(){
  mozaicAnimation("yellow");
  console.log('test');
})

});
