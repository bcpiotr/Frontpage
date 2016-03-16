$(function(){
/*********************************
VARIABLES
*********************************/
  var panel = $('.panel');
  var main = $('.main');
  var basicAnimationTime = 1200; //okresla wyjsciowy czas trwania animacji
  var colorsArray = ["#FFFFFF"]; //tablica kolorow wykrozystywanych do animacji mozaiki, umozliwia ustawienie wiele kolorow mozaiki
  var portfolioArray = [
    [1, 'http://github.com', 'http://rollpack.pl', 'bootstrap RWD', 'Description...<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ligula quis est euismod aliquet sed ac ex. ', "img/portfolio/rollpack.png"],
    [2, 'http://github.com', 'http://google.pl', 'rwd flexbox onepage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ligula quis est euismod aliquet sed ac ex. Donec nec ligula quis est euismod aliquet sed ac ex.', "img/portfolio/portfBckg2.png"],
    [3, 'http://github.com', 'http://google.pl', 'tag#1 tag#2 tag#3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ligula quis est euismod aliquet sed ac ex.', "img/portfolio/placeholder.png"],
    [4, 'http://github.com', 'http://google.pl', 'tag#1 tag#2 tag#3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ligula quis est euismod aliquet sed ac ex.', "img/portfolio/placeholder.png"],
    [5, 'http://github.com', 'http://google.pl', 'tag#1 tag#2 tag#3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ligula quis est euismod aliquet sed ac ex.', "img/portfolio/placeholder.png"]
  ];

/***************************
WYWOLYWANIE FUNKCJI PO OTWARCIU STRONY
**************************/
setButtons(); //ustawia buttony na ostatnich 4 panelach mozaiki
loadingBar(basicAnimationTime*0.8); //pierwsze wywolanie loadingbara jest krotsze dwukrotnie

setTimeout(function() {   //po pelnym zaslonieciu wywoluje funckje odrywania tresci
 mozaicHide(basicAnimationTime);
}, basicAnimationTime/2);



/********************************************
FUNCTION MozaicShow - przykrywa tresc mozaika
********************************************/
function mozaicShow(time){
  panel.each(function(index){
    $(this).css('z-index', '1');
    var delayTime = Math.floor((Math.random() * basicAnimationTime) + 100);
    var colors = Math.floor((Math.random() * colorsArray.length) + 0);
    if (index < (panel.length-4)) {
      $(this).delay(delayTime).animate({
        backgroundColor: colorsArray[colors],
      },function(){
      });
    }
  });
}


/*********************************************
FUNCTION MozaicHide - chowa mozaike pod tresc
*********************************************/
function mozaicHide(time){
  panel.each(function(index){
    var delayTime = Math.floor((Math.random() * basicAnimationTime) + 100);
    if (index < (panel.length-4)) {
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
  $(id1).fadeIn(100,function(){
  });
  $(id2).fadeIn(100,function(){
  });
}

/*******************************
FUNCTION contentHide
*******************************/
function contentHide(){
  $('.content').fadeOut(100,function(){
  });
}

/*************************************************
LOADING BAR FUNCTION
************************************************/
function loadingBar(time){
  $('.loadingBar').css('width','0%');
  $('.loadingBar').animate({width: '100%'},time*2.5);
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
    panel.css("height", width);
    panel.css("width", width);
  })

/*****************************************
FUNCTION SET BUTTONS - ustawia buttony na ostatnich 4 panelach
przy robieniu RWD bedzie mozna dowolnie usuwac/dodawac panele
a buttony beda sie ustawiac na ostatnich 4-ech
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


  ///blokuje klikniecie przy otwarciu strony
    $('div[id^="btn"]').addClass('activeBtn');
    setTimeout(function() {
     $('div[id^="btn"]').not("#btnAbout").removeClass('activeBtn'); //usuwa klase aktiv wszystkim poza jednym-about
   }, basicAnimationTime*2);

}

/****************************************
AKCJE BUTTONOW - ONCLICK
***************************************/
$('div[id^="btn"]').on('click',function(){
  var btnId = $(this).attr('id');
  var clickedBtn = $(this); //wykorzystywany do ustawiania klasy aktiv na kliknietym btn

  if ($(this).hasClass('activeBtn')) { //sprawdza czy button nie jest aktywny i ew. blokuje klikniecie
    return 0;
  }
  loadingBar(basicAnimationTime*1.2);

  if (basicAnimationTime !== 0) { //sprawdza czy animacje nie sa wylaczone
    mozaicShow(basicAnimationTime);
  }

  setTimeout(function() {   //gdy mozaika zakryje tresc, podmienia odpowiednia tresc dla klinietego btn
   main.css('backgroundImage','none'); //resetuje tlo main, gdy wczesniej bylo ogladane portfolio
   contentHide();
   if (btnId === "btnAbout") {
     contentShow(about_main,about_side);
   }

   else if (btnId === 'btnResume') {
     contentShow(resume_main,resume_side);
     progress(80, $('#progressBarHTML'),'HTML');
     progress(60, $('#progressBarCSS'),'CSS');
     progress(70, $('#progressBarJS'),'JS');
     progress(60, $('#progressBarPS'),'PHOTOSHOP');
   }

   else if (btnId === 'btnPortfolio') {
     contentShow(portfolio_main,portfolio_side);
     showPortfolio(basicAnimationTime,0);
     $( "#0" ).trigger( "click" ); //po przejsciu do portfolio uruchamia event z id 0
   }

   else if (btnId === 'btnContact') {
     contentShow(contact_main,contact_side);
     formValidation();
   }

 }, basicAnimationTime*1.5);

 setTimeout(function() {   //po pelnym zaladowaniu tresci chowa mozaike
  mozaicHide(basicAnimationTime);
}, basicAnimationTime*1.5);

  $('div[id^="btn"]').css('backgroundColor', '#737778')
    .addClass('activeBtn'); //nadaje wszystkim btn nieaktywny kolor i klase activeBtn-blokuje klikniecie
  $(this).css('backgroundColor', '#E9F0F2'); //nadaje kliknietemu kolor aktywny

  setTimeout(function() {   //po pelnym zaladowaniu tresci chowa mozaike
  $('div[id^="btn"]').removeClass('activeBtn');//usuwa wszystkim buttonom klase aktiv
  clickedBtn.addClass('activeBtn'); //nadaje klase aktiv kliknietemu butonowi
}, basicAnimationTime*4);

});

/***********************************
AKCJE BUTTONOW - MOUSEOVER/MOUSEOUT
***********************************/
$('div[id^="btn"]').on('mouseover', function(){
  if (!$(this).hasClass('activeBtn')) {  //sprawdza czy button ma klase active, jak nie, to go podswietla
    $(this).css('backgroundColor', '#E9F0F2');
  }

})
$('div[id^="btn"]').on('mouseout', function(){
  if (!$(this).hasClass('activeBtn')) {  //sprawdza czy button ma klase active, jak nie, to nadaje mu nieaktywny kolor
    $(this).css('backgroundColor', '#737778');
  }
})



/**************************************
PORTFOLIO SCRIPTS
**************************************/

/*****************************************************
FUNCKJA SLIDER PORTFOLIO
*****************************************************/
  var index = 0;
  var counterMarks = $('#portfolio_side').find('i[class*="mark"]'); //kwadraty-liczniki

  var color;

function showPortfolio(time,index){
  counterMarks.on('click',function(e){
    var id = $(this).attr('id');
      if(e.isTrigger){ //sprawdza czy event jest wywoalny przez czlowieka czy trigger - przy pierwszym otwarciu portfolio
        main.css('backgroundImage','url('+portfolioArray[id][5]+')');
      }
      else {
        loadingBar(basicAnimationTime*1.2);
        console.log('asdasdasd');
        if (basicAnimationTime !== 0){ //sprawdza czy nie sa wylaczone animacje
          mozaicShow(basicAnimationTime*1.2);
        }
      }

        counterMarks.each(function(index){ //odznacza wszystkie kwadraty, a potem zaznacza klikniety
          $(this).removeClass('fa-square');
          $(this).addClass('fa-square-o');
        });

        setTimeout(function() {
        $('#port_opis').html('<p> '+portfolioArray[id][4]+'</p>'); //zmienia kolor pola na pobrany z tablicy i wrzuca opis z tablicy
        $('#port_tags').html('<i class="fa fa-tag"></i> '+ portfolioArray[id][3]+'a');
        $('#port_git').html('<a href='+portfolioArray[id][2]+' target=_blank><i class="fa fa-github"></i></a>');
        $('#port_link').html('<a href='+portfolioArray[id][3]+' target=_blank><i class="fa fa-link"></i></a>');
        main.css('backgroundImage','url('+portfolioArray[id][5]+')');
        mozaicHide(basicAnimationTime*1.2);
      }, basicAnimationTime*1.3);
        $(this).toggleClass('fa-square fa-square-o');
  });
};

/****************************************************
FUNCKJA ANIMUJACA PROGRESS bary
*****************************************************/
function progress(percent, $element,skill) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').delay(basicAnimationTime*1.5).animate({ width: progressBarWidth }, 1500).html(skill);
    $element.find('div').addClass('progressBar');
}


/************************************************
RESUME EXPAND FUNCTION
************************************************/
$('#expand').on('click',function(){
  var text = $('#resume_content').html(); //pobiera tresc z sekcji resume_side
  var newDiv = $("<div id='expanded'>"+text+"<span id='closeBtn'><i class='fa fa-times'></i></span></div>");
  newDiv.appendTo(document.body);
  $('#expanded').fadeIn(basicAnimationTime);

  $('#closeBtn').on('click',function(){
    $('#expanded').fadeOut(basicAnimationTime);
  });
});

/*********************************************
FORM VALIDATION FUNCTION
*********************************************/
function formValidation(){
  $( '#contact-form' ).submit(function( event ) {
    var name = $('#contact-name').val();
    var email = $('#contact-email').val();
    var message = $('#contact-message').val();
    var error = 0;

  if (name.length <= 0) {
    $('#name-error').html('<i class="fa fa-exclamation-triangle" style="color:red"></i>');
    event.preventDefault();
    error = 1;
  }
  else {
    $('#name-error').html('');
  }

  if(email.indexOf('@') === -1){
    $('#email-error').html('<i class="fa fa-exclamation-triangle" style="color:red"></i>');
    event.preventDefault();
    error = 1;
  }
  else {
    $('#email-error').html('');
  }

  if(message.length <= 0) {
    $('#contact-message').attr('placeholder','Are You sure?').css('backgroundColor','#737778');
    event.preventDefault();
    error = 1;
  }
  else {
    $('#contact-message').css('backgroundColor','white');
  }

  if (error === 0) {
    $('#message-success').html("I'll get back to you as soon as possible!").css('color','green');
  }
  else {
    event.preventDefault();
  }
});
}

/*******************************
PRZYSPIESZENIE animacji
*******************************/
$('.settingBtnSpeed').on('click',function(){
  var selectedSpeed = $(this).attr('id');
  switch (selectedSpeed) {
    case 'none':
    basicAnimationTime = 0;
    $('.loadingBar').css('display','none');
    break;
    case 'normal':
    basicAnimationTime = 1200;
    $('.loadingBar').css('display','block');
    break;
    case 'verySlow':
    basicAnimationTime = 3000;
    break;
  }
  $('.settingBtnSpeed').each(function(index){
    $(this).css('border','none');
  });
  $(this).css('border','1px solid black');
})

/***********************************************
ZMIANA KOLOROW
***********************************************/
$('.settingBtnColor').on('click',function(){
  var selectedColor = $(this).attr('id');
  switch (selectedColor) {
    case 'various':
    colorsArray = ['#3A3E5B','#191A2D','#313550','#484A69','#717895','#8E93B0','#646986'];
    $('body').css('backgroundImage','url("img/background2.jpg")');
    break;
    case 'gray':
    colorsArray = ['#EBEBEB','#ECECEC','#EDEDED','#EEEEEE','#EFEFEF','#F0F0F0','#F1F1F1'];
    $('body').css('backgroundImage','url("img/background.png")');
    break;
    case 'white':
    colorsArray = ['#FFFFFF'];
    $('body').css('backgroundImage','url("img/white_pattern.jpg")');
    break;
  }
  $('.settingBtnColor').each(function(index){
    $(this).css('border','none');
  });
  $(this).css('border','1px solid black');
})

});
