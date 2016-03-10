$(function(){
  var panel = $('.panel');
  var main = $('.main');
  var basicAnimationTime = 1500; //okresla wyjsciowy czas trwania animacji

  var colorsArray = ["#FFFFFF"]; //tablica kolorow wykrozystywanych do animacji mozaiki, umozliwia ustawienie wiele kolorow mozaiki


/***************************
WYWOLYWANIE FUNKCJI PO OTWARCIU STRONY
**************************/
setButtons();
loadingBar(basicAnimationTime/2);

setTimeout(function() {   //po pelnym zaslonieciu wywoluje funckje odrywania tresci
 mozaicHide();
}, basicAnimationTime/2);


/********************************************
FUNCTION MozaicShow - przykrywa tresc mozaika
********************************************/
function mozaicShow(){
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
function mozaicHide(){
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
  var btnId = $(this).attr('id');
  var clickedBtn = $(this); //wykorzystywany do ustawiania klasy aktiv na kliknietym btn

  if ($(this).hasClass('activeBtn')) { //sprawdza czy button nie jest aktywny i ew. blokuje klikniecie
    console.log('brejk!');
    return 0;
  }

  mozaicShow(); //pokazuje mozaike
  loadingBar(basicAnimationTime); //uruchamia loadingBar'a

  setTimeout(function() {   //po pelnym zaslonieciu wywoluje funckje odrywania tresci
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
     slider();
     generatePortfolio();
     $('.bx-controls-direction').addClass('content');
   }

   else if (btnId === 'btnContact') {
     contentShow(contact_main,contact_side);
     formValidation();
   }

 }, basicAnimationTime*1.5);

 setTimeout(function() {   //po pelnym zaladowaniu tresci chowa mozaike
  mozaicHide();
}, basicAnimationTime*1.5);


  $('div[id^="btn"]').css('backgroundColor', '#737778'); //nadaje wszystkim btn nieaktywny kolor
  $(this).css('backgroundColor', '#E9F0F2'); //nadaje kliknietemu kolor aktywny
  $('div[id^="btn"]').addClass('activeBtn'); //nadaje wszystkim kalse aktiv
  setTimeout(function() {   //po pelnym zaladowaniu tresci chowa mozaike
  $('div[id^="btn"]').removeClass('activeBtn');//usuwa wszystkim buttonom klase aktiv
  clickedBtn.addClass('activeBtn'); //nadaje klase aktiv kliknietemu butonowi
}, basicAnimationTime*3);




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
  if (!$(this).hasClass('activeBtn')) {  //sprawdza czy button ma klase active, jak nie, to go podswietla
    $(this).css('backgroundColor', '#737778');
  }
})



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

    $('#port_tags').html('<i class="fa fa-tag"></i> '+ tags);
    $('#port_git').html('<a href='+gitlink+'><i class="fa fa-github"></i></a>');
    $('#port_link').html('<a href='+ownlink+' target=_blank><i class="fa fa-link"></i></a>');
    $('#port_opis').html('<i class="fa fa-pencil"> '+opis+'</i>')
  });


}

/*****************************************************
SLIDER
******************************************************/
function slider(){
  $(document).ready(function(){
  $('.slider1').bxSlider({
    slideWidth: 200,
    minSlides: 4,
    maxSlides: 6,
    slideMargin: 10
  });
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
/*************************************************
LOADING BAR FUNCTION
************************************************/
function loadingBar(time){
  $('.loadingBar').css('width','0%');
  $('.loadingBar').animate({width: '100%'},time*3);
}

/************************************************
RESUME EXPAND FUNCTION
************************************************/
$('#expand').on('click',function(){
  var text = $('#resume_content').html(); //pobiera tresc z sekcji resume_side
  var newDiv = $("<div id='expanded'>"+text+"<span id='closeBtn'><i class='fa fa-times'></i></span></div>");
  newDiv.appendTo(document.body);
  $('#expanded').fadeIn(2000);
  console.log(text);

  $('#closeBtn').on('click',function(){
    $('#expanded').fadeOut(2000);
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
    // error = 0;
  }

  if(email.indexOf('@') === -1){
    $('#email-error').html('<i class="fa fa-exclamation-triangle" style="color:red"></i>');
    event.preventDefault();
    error = 1;
  }
  else {
    $('#email-error').html('');
    // error = 0;
  }

  if(message.length <= 0) {
    $('#contact-message').attr('placeholder','Are You sure?').css('backgroundColor','#737778');
    event.preventDefault();
    error = 1;
  }
  else {
    $('#contact-message').css('backgroundColor','white');
    // error = 0;
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
$('#logo').on('click',function(){
  basicAnimationTime = 500;
  console.log(basicAnimationTime);
})
$('.settingBtnSpeed').on('click',function(){
  var selectedSpeed = $(this).attr('id');
  switch (selectedSpeed) {
    case 'superFast':
    basicAnimationTime = 500;
    break;
    case 'normal':
    basicAnimationTime = 1500;
    break;
    case 'verySlow':
    basicAnimationTime = 3000;
    break;
    // case 'various':
    // colorsArray = ['red','blue','green'];
    // break;
    // case 'gray':
    // colorsArray = ['#d3d3d3','#bdbdbd','#a8a8a8','#939393','#7e7e7e','#696969','#545454'];
    // break;
    // case 'white':
    // colorsArray = ['#FFFFFF'];
    // break;
  }
  $('.settingBtnSpeed').each(function(index){
    $(this).css('border','none');
  });
  $(this).css('border','1px solid black');
})

$('.settingBtnColor').on('click',function(){
  var selectedColor = $(this).attr('id');
  switch (selectedColor) {
    case 'various':
    colorsArray = ['#3A3E5B','#191A2D','#313550','#484A69','#717895','#8E93B0','#646986'];
    // $('body').css('backgroundImage','url("img/various_pattern.jpg")');
    $('body').css('backgroundImage','url("img/background2.jpg")');
    break;
    case 'gray':
    colorsArray = ['#EBEBEB','#ECECEC','#EDEDED','#EEEEEE','#EFEFEF','#F0F0F0','#F1F1F1'];
    $('body').css('backgroundImage','url("img/background.png")');
    break;
    case 'white':
    colorsArray = ['#FFFFFF'];
    $('body').css('backgroundImage','url("img/white_pattern.jpg")');
    // $('body').css('backgroundColor','#f2f2f2');
    break;
  }
  $('.settingBtnColor').each(function(index){
    $(this).css('border','none');
  });
  $(this).css('border','1px solid black');
})



});
