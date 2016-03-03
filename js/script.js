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
  //ustawia kolory ostatnim panelom
  panel.last().css('backgroundColor', '#737778');
  panel.eq(-2).css('backgroundColor', '#737778');
  panel.eq(-3).css('backgroundColor', '#737778');
  panel.eq(-4).css('backgroundColor', '#737778');
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
panel.last().css('justifyContent', 'center');
panel.last().css('alignItems', 'center');
panel.last().css('backgroundColor', '#737778');
panel.last().html('<i class="fa fa-envelope fa-2x"></i>');

panel.eq(-2).attr('id', 'btnPortfolio');
panel.eq(-2).css('justifyContent', 'center');
panel.eq(-2).css('alignItems', 'center');
panel.eq(-2).css('backgroundColor', '#737778');
panel.eq(-2).html('<i class="fa fa-folder fa-2x"></i>');

panel.eq(-3).attr('id', 'btnResume');
panel.eq(-3).css('justifyContent', 'center');
panel.eq(-3).css('alignItems', 'center');
panel.eq(-3).css('backgroundColor', '#737778');
panel.eq(-3).html('<i class="fa fa-graduation-cap fa-2x"></i>');


panel.eq(-4).attr('id', 'btnAbout');
panel.eq(-4).css('justifyContent', 'center');
panel.eq(-4).css('alignItems', 'center');
panel.eq(-4).css('backgroundColor', '#E9F0F2');
panel.eq(-4).html('<i class="fa fa-user fa-2x"></i>');



/****************************************
AKCJE BUTTONOW
***************************************/
//ABOUT
$('#btnAbout').on('click',function(){
  mozaicAnimation("white");
  fadeOutContent();
  fadeInContent(about_main);
  fadeInContent(about_side);
  $(this).css('backgroundColor','#E9F0F2');
});

///RESUME
$('#btnResume').on('click',function(){
  mozaicAnimation("white");
  fadeOutContent();
  fadeInContent(resume);
  $(this).css('backgroundColor','#E9F0F2');

});

//PORTFOLIO
$('#btnPortfolio').on('click',function(){
  mozaicAnimation("white");
  fadeOutContent();
  fadeInContent(portfolio);
  $(this).css('backgroundColor','#E9F0F2');

});

//contact
$('#btnContact').on('click',function(){
  mozaicAnimation("white");
  fadeOutContent();
  fadeInContent(contact);
  $(this).css('backgroundColor','#E9F0F2');

})

/*************************************
ALL FADE OUT FUNCTION
************************************/
function fadeOutContent (){
  $('.main').find('.content').fadeOut(3000,function(){
    console.log('huraaaa');
  });
}

/***************************************
FADE IN FUNCTION
***************************************/
function fadeInContent (id){
  $(id).fadeIn(3000, function(){
    console.log("jazda");
  })
}


});
