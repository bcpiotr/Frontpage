$(function(){
  var panel = $('.panel');
  var main = $('.main');
  // var maxCoverUpTime = 1000;
  var basicAnimationTime = 2000;

  colorsArray = ["#FFFFFF"]; //tablica kolorow wykrozystywanych do animacji moza


/***************************
WYWOLYWANIE FUNKCJI PO OTWARCIU STRONY
**************************/
// mozaicAnimation("whiteBckg");
setButtons();
// mozaicAnimation();
setTimeout(function() {   //po pelnym zaslonieciu wywoluje funckje odrywania tresci
 mozaicHide();
}, 1000);


/*********************************
FUNCTION MozaicShow
********************************/
function mozaicShow(){
  panel.each(function(index){
    $(this).css('z-index', '1');
    var delayTime = Math.floor((Math.random() * 2000) + 500);
    if (index >= (panel.length-4)) {
        }
        else {
          $(this).delay(delayTime).animate({
            backgroundColor: 'white',
          },function(){
          });
        }
  });
}


/*******************************
FUNCTION MozaicHide
*******************************/
function mozaicHide(){

  panel.each(function(index){
    var delayTime = Math.floor((Math.random() * 2000) + 500);
    if (index >= (panel.length-4)) {
        }
        else {
          $(this).delay(delayTime).animate({backgroundColor: 'transparent'},function(){
          $(this).css('z-index', '0');

          });
        }
  });
}

/*******************************
FUNCTION ContentShow
*******************************/
function contentShow(id1,id2){
  $(id1).fadeIn(100,function(){ //
  });
  $(id2).fadeIn(100,function(){ //
  });
}

/*******************************
FUNCTION contentHide
*******************************/
function contentHide(){
  $('.content').fadeOut(100,function(){

  });
}


/*****************************
FUNCTION MOZAI ANIMATION2
****************************/
// function mozaicAnimation(){
//   panel.each(function(index){
//     var delayTime = Math.floor((Math.random() * basicAnimationTime) + basicAnimationTime/2);
//     $(this).css('z-index','1');
//
//
//
//     if (index >= (panel.length-4)) {
//     }
//     else {
//       $(this).animate({backgroundColor: 'transparent'},delayTime,function(){
//       $(this).css('z-index', '0');
//       });
//     }
//
//   });
// };

/*********************************************
FUNCTION MOZAIC COVER UP
*********************************************/
// function mozaicAnimationCoverUp(id1, id2){
  // panel.each(function(index){
  //   var delayTime = Math.floor((Math.random() * basicAnimationTime) + 100);
  //   var newColor = Math.floor((Math.random() * colorsArray.length) + 0); //losuje kolor do wypelnienia panelu
  //
  //   if (index >= (panel.length-4)) { //omija ostatnie 4 panele
  //   }
  //   else {
  //       $(this).animate({
  //       backgroundColor: colorsArray[newColor], //ustawia losowy kolor z tablicy
  //       zIndex: 1
  //
  //     },2000,function(){
  //
  //     });
  //   }
  // });
  // setTimeout(function() {   //po pelnym zaslonieciu wywoluje funckje odrywania tresci
// `    fadeOutContent();`
//    mozaicAnimation();
//    $('.content').fadeOut(2000,function(){ //chowa cala tresc
//      $('.panel').css('z-index','1');
//    });
// }, basicAnimationTime);


//
//
// setTimeout(function() {   //po pelnym zaslonieciu wywoluje funckje odrywania tresci
// // `    fadeOutContent();`
//  $(id1).fadeIn(basicAnimationTime,function(){ //
//  });
//  $(id2).fadeIn(basicAnimationTime,function(){ //
//  });
// }, basicAnimationTime*2);

//
// };

/**********************
FUNCTION - MOZAIC Animation
**********************/
// function mozaicAnimation(color){
//   panel.each(function( index ) {
//     var delayTime = Math.floor((Math.random() * 5000) + 1000);
//     $(this).css('display', 'none');
//     // $(this).addClass('whiteBckg');
//     $(this).delay(1000).fadeIn( delayTime, function() {
//     // Animation complete
//
//   });
//   });
// }


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
  panel.eq(-4).addClass('activeBtn'); //przy pierwszym wywolaniu ustawia klase activ na pierwszym buttonie
  panel.eq(-4).html('<i class="fa fa-user fa-2x"></i>');
}


/****************************************
AKCJE BUTTONOW - ONCLICK
***************************************/
$('div[id^="btn"]').on('click',function(){
  // mozaicAnimation("white");
  // mozaicAnimationCoverUp();
  // contentHide();
  mozaicShow();



  setTimeout(function() {   //po pelnym zaslonieciu wywoluje funckje odrywania tresci
   contentHide();
   if (btnId === "btnAbout") {
     contentShow(about_main,about_side);
       //
       // fadeInContent(about_main);
       // fadeInContent(about_side);
   }
   else if (btnId === 'btnResume') {
     contentShow(resume);
       // fadeInContent(resume);
   }
   else if (btnId === 'btnPortfolio') {
     contentShow(portfolio_main,portfolio_side);
     slider();


       // fadeInContent(portfolio_main);
       // fadeInContent(portfolio_side);
       generatePortfolio();
   }
   else if (btnId === 'btnContact') {
     contentShow(contact_main,contact_side);
       // fadeInContent(contact);
   }
 }, 3000);

 setTimeout(function() {   //po pelnym zaslonieciu wywoluje funckje odrywania tresci
  mozaicHide();
}, 5000);




  $('div[id^="btn"]').css('backgroundColor', '#737778'); //nadaje wszystkim btn nieaktywny kolor
  $(this).css('backgroundColor', '#E9F0F2'); //nadaje kliknietemu kolor aktywny
  $('div[id^="btn"]').removeClass('activeBtn'); //usuwa wszystkim buttonom klase aktiv
  $(this).addClass('activeBtn'); //nadaje klase aktiv kliknietemu butonowi

  var btnId = $(this).attr('id');
  //sprawdza po ID jaki button zostal nacisniety i laduje odpowiedni content


});


/***********************************
AKCJE BUTTONOW - MOUSEOVER/MOUSEOUT
***********************************/
$('div[id^="btn"]').on('mouseover', function(){
  if ($(this).hasClass('activeBtn')) {  //sprawdza czy button ma klase active, jak nie, to go podswietla
  }
  else {
    $(this).css('backgroundColor', '#E9F0F2')
  }

})
$('div[id^="btn"]').on('mouseout', function(){
  if ($(this).hasClass('activeBtn')) {  //sprawdza czy button ma klase active, jak nie, to go podswietla
  }
  else {
    $(this).css('backgroundColor', '#737778')
  }
})


/*************************************
ALL FADE OUT FUNCTION
************************************/
function fadeOutContent (){


}

/***************************************
FADE IN FUNCTION
***************************************/
function fadeInContent (id){

}

/**************************************
PORTFOLIO SCRIPTS
**************************************/

/**************************************
FUNKCJA GENERUJĄCA PORTFOLIO
**************************************/
function generatePortfolio(){
  var images = $('#portfolio_side').find('img');
  var details = $('#portfolio_main').find('.portfolio_details');

  images.on('click',function(){
    var imgSrc = $(this).data('src');
    var tags = $(this).data('tags');
    var gitlink = $(this).data('gitlink');
    var ownlink = $(this).data('ownlink');
    var opis = $(this).data('opis');

    $('#port_full').fadeOut(2000,function(){
      $('#port_full').attr('src', imgSrc);
      $('#port_full').fadeIn(2000);
    })

    // main.css('backgroundImage', 'url(img/portfolio/placeholder.png)');
    // panel.css('backgroundColor','transparent');


    //
    // $('#port_full').attr('src', imgSrc);
    $('#port_tags').html('<i class="fa fa-tag"></i> '+ tags);
    $('#port_git').html('| <a href='+gitlink+'><i class="fa fa-github"></i> GitHub</a>');
    $('#port_link').html('<a href='+ownlink+' target=_blank><i class="fa fa-link"></i> Otworz stronę</a> |');
    $('#port_opis').html('<i class="fa fa-pencil fa-1x"> '+opis+'</i>')
  });


}


// images.each(function( index ) {
//   var delayTime = Math.floor((Math.random() * 5000) + 1000);
//   $(this).css('display', 'none');
//   // $(this).addClass('whiteBckg');
//   $(this).delay(1000).fadeIn( delayTime, function() {
//   // Animation complete
//
// });
// });

/*****************************************************
SLIDER
******************************************************/
function slider(){
  $('.slider8').bxSlider({
    mode: 'vertical',
    slideWidth: 300,
    minSlides: 3,
    slideMargin: 10
  });
};




});
