$(function(){
  var panel = $('.panel');
  var main = $('.main');


/***************************
WYWOLYWANIE FUNKCJI PO OTWARCIU STRONY
**************************/
mozaicAnimation("whiteBckg");
setButtons();


/**********************
FUNCTION - MOZAIC Animation
**********************/
function mozaicAnimation(color){
  panel.each(function( index ) {
    var delayTime = Math.floor((Math.random() * 5000) + 1000);
    $(this).css('display', 'none');
    // $(this).addClass('whiteBckg');
    $(this).delay(1000).fadeIn( delayTime, function() {
    // Animation complete

  });
  });
}


/*************************
FUNCTION PANEL RESIZE
*************************/
//przy wejsciu sprawdza szerokosc 'main' i ew. zmienia css height dla panelu
  var width = main.width()/10;
  if (main.width() < 670) {
    panel.css("height", width);
  }

//Przy resize zmienia w css height i width panelu
  $(window).on('resize',function(){
    width = main.width()/10;
    console.log(width);
    panel.css("height", width, "width", width);
  })

/*****************************************
FUNCTION SET BUTTONS - ustawia buttony na ostatnich panelach
****************************************/
function setButtons(){
  panel.last().attr('id', 'btnContact');
  panel.last().html('<i class="fa fa-envelope fa-2x"></i>');


  panel.eq(-2).attr('id', 'btnPortfolio');
  panel.eq(-2).html('<i class="fa fa-folder fa-2x"></i>');

  panel.eq(-3).attr('id', 'btnResume');
  panel.eq(-3).html('<i class="fa fa-graduation-cap fa-2x"></i>');

  panel.eq(-4).attr('id', 'btnAbout');
  panel.eq(-4).css('backgroundColor', '#E9F0F2'); //przy pierwszym wywoalniu ustawia jasny kolor dla about
  panel.eq(-4).html('<i class="fa fa-user fa-2x"></i>');
}


/****************************************
AKCJE BUTTONOW - ONCLICK
***************************************/
$('div[id^="btn"]').on('click',function(){
  mozaicAnimation("white");
  fadeOutContent();
  $('div[id^="btn"]').css('backgroundColor', '#737778');
  $(this).css('backgroundColor', '#E9F0F2');

  var btnId = $(this).attr('id');
  //sprawdza po ID jaki button zostal nacisniety i laduje odpowiedni content
  if (btnId === "btnAbout") {
      fadeInContent(about_main);
      fadeInContent(about_side);
  }
  else if (btnId === 'btnResume') {
      fadeInContent(resume);
  }
  else if (btnId === 'btnPortfolio') {
      fadeInContent(portfolio);
  }
  else if (btnId === 'btnContact') {
      fadeInContent(contact);
  }
})

/***********************************
AKCJE BUTTONOW - MOUSEOVER/MOUSEOUT
***********************************/
$('div[id^="btn"]').on('mouseover', function(){
  $(this).css('backgroundColor', '#E9F0F2')
})
$('div[id^="btn"]').on('mouseout', function(){
  $(this).css('backgroundColor', '#737778')
})

/*************************************
ALL FADE OUT FUNCTION
************************************/
function fadeOutContent (){
  $('.main').find('.content').fadeOut(3000,function(){
  });
}

/***************************************
FADE IN FUNCTION
***************************************/
function fadeInContent (id){
  $(id).fadeIn(3000, function(){
  })
}




});
