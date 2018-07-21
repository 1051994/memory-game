// ------------ Controller Area ----- //
var Opencards = [];
var Movcounter   = 0;
// var stars      = 0;
var ratingStars = $('i');
var clickes   = 0;
CardsList     = CardsImplement();
var timer = document.querySelector(".timer");
var interval;
var gameEnded =  false;
timer.innerHTML = "0 mins : 0 secs";

var shuffled = shuffle(CardsList);
DisplayCards();
var click= 0;

//add event listner
$('.card').on ('click',function(){
	click++;
	if(click == 1){ startTimer(); }
	Matcher(this);
});

//----------------------- Model Area --------------------------//
/* ---------------------Create a list to put all cards------------------ */ 
function CardsImplement(){
	var Cards=[];
	Cards=document.getElementsByClassName("card");
	return transformer(Cards);
};
// convert object into array 
function transformer(obj){
	var transformed =[];
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			transformed.push(obj[key].innerHTML);
		}
	}
	return transformed;
}
 //----------------------------------------------------------------------------
/* -------------------------------display cards --------------------------- */ 
function DisplayCards(){
	var list =CreateCards();
	replacer (list);
};

function replacer(list){
	document.getElementsByClassName("deck")[0].innerHTML= list.innerHTML;
};
//  -------------- end of display block -------------------
// ------------ create cards to shuflled it--------------- 
function CreateCards(){
	var list = document.createElement("ul");
	for(var x=0; x < shuffled.length ; x++){
		var li = document.createElement("li");
		li.innerHTML=shuffled[x];
		li.classList.add("card");
		list.appendChild(li);
	}
	return list;
};
 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
 // ---------------------- Done shuflled cards -------------------------
//  -----------------------handel method ------------------
function Matcher(card){
	if(isClicked(card)){
		return;
	}
	Displayicons(card);
	Markedopen(card);
}; // ------------------- Done handeld method ------------
/*when cards is clicked this function will check cards thats already use show and open class or no 
and return  true when using this clases */ 
 function isClicked(card)
 {
 	if( $(card).hasClass("show") || $(card).hasClass("open")){
 		return true;
 	}
 	return false;
 }//------------------------end of  checkd cards-------------------

 //  when i clicked cards this function 'Displayicons' will display icons on cards 
function Displayicons(card){
	$(card).addClass("show open");
}; // ---------------------end of display icons -------------------

 // increment moves when user clicked cards 
function incMoves(card){
	if(gameEnded || $(card).hasClass("match") || $(card).is($(Opencards[0])) ){
		return false;
	}
	Movcounter ++;
	Rating(Movcounter);
	$('.moves').text(Movcounter);
};
// -------------------------------end of increment moves----------------------
 /* Check  two cards is similar html content and class ' icons ' or no  */ 
function IsMatch(Opencards){
	let Case1= Opencards[0].innerHTML != Opencards[1].innerHTML; 
	let Case2= $(Opencards[0]) .is($(Opencards[1]));
	if(Case1 || Case2){
		return false;
	}else{
		return true;
	}
};

function matched(Opencards){
	closeOpenCards(Opencards);
	markAsMatched(Opencards);
	openedCards = [];
};

function markAsMatched(Opencards){
	for(let i= Opencards.length -1; i>= 0;i--)
	{
		$(Opencards[i]).addClass("match");
	}
}
function nomatched(Opencards){
	var currentcards = Opencards;
	Animate(currentcards);
	setTimeout(function(){
		hideicons(currentcards);
	},1000);
	 openedCards = [];
};
// -----------------------------------end of matched ---------------------------------------------
//-------------------------- rate to incremet moves when i clicked new card--------------
function Rating(moves){
  let score = 3;
  if(moves <= 15) {
    ratingStars.eq(3).removeClass('fa-star').addClass('fa-star-o');
    score = 3;
  } else if (moves > 15 && moves <= 22) {
    ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
    score = 2;
  } else if (moves > 22) {
    ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
    score = 1;
  }
  return score;
}
//---------------------------- end of rating -----------------------
 //------------------------- animate cards-----------------------------
function Animate(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).addClass("unmatched");
	} 
}
// -----------------------End of the Animate-------------------
//-------------------------start hide icons--------------
function hideicons(Opencards){
	for (var i = Opencards.length - 1; i >= 0; i--) {
		$(Opencards[i]).removeClass("open show unmatched");
	}
}; // -----------------end of the hideicons---------------
// -------------------- lock  open cards after matched it --------------
function closeOpenCards(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).removeClass( "open" );
	}
}// ---------------------end of lock Open cards-----------------------
  /* // ------------------------danger function ---------------------
 function styledanger(Opencards){
 	for (var i = Opencards.length - 1; i >= 0; i--) {
 		Opencards[i].classList.add("danger");
 	}
 };
 // ---------------------end of the danger------------------- */ 

function checkMatchedAll(){
	var all = true;
	$('.card').each(function(){
		return all =  $(this).hasClass( "match"); // in just one not have it will fail
	});// end each
	if(all){
		showStatistics();
		gameEnded = true;
	}
}// end checkMatchedAll---------


function handleReset (){
	window.location.reload();
};

function showStatistics() {
	var score = Rating(Movcounter);
	clearInterval(interval);
	var time  = getTimer();
	owesomeAlert('Congratulation! Winning',  ' with ' + Movcounter + ' Moves '+ ' , Scoring ' + score + ' Star!' + '  in ' + time + ' Time ' , 'success', 'Play again', 'Stay');
};
// trying to implement es5 todd-------------------------
function getTimer(){
	return $('#timer').text();
};

function Markedopen(card){
	if(Opencards.length > 0){
		incMoves(card);
		//Displayicons(card);
		Opencards.push(card);
		if(IsMatch(Opencards)){
			matched(Opencards);
			Opencards = [];
		}else {
			nomatched(Opencards);
			Opencards = [];
		}
	}else {
		Opencards.push(card);
		incMoves(card);
	}
	checkMatchedAll();
};


// timer for calculate time gaming it
var second = 0, minute = 0; hour = 0;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+" : "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
// end of timer block 








function owesomeAlert(titleToBind, textToShow ,typeToBind, confirmbtnText = null, cbtnText = null , confirmStyle = null){
    swal({
      title: titleToBind,
      text: textToShow,
      type: typeToBind,
      showCancelButton: cbtnText ? true : false,
      // showCancelButton: true, ATH [DONE flip dependency 2:40 pm 2018-01-17]
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmbtnText,
      cancelButtonText: cbtnText,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Reloading' ,
          text:  'have fun todd.',
          type : 'success',
          timer : 2500
        })//swal
        setTimeout(function(){// submit from confirmOwesomeAlert has no time ATH
            window.location.reload();
        }, 2000);// setTimeOut
      // result.dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      } else if (result.dismiss === 'cancel') {
        swal({
          title: 'Pausing',
          text: 'Refresh the page to play again',
          type: 'info',
          animation: false,
          customClass: 'animated tada',
          timer: 1000
        })//swal
      }//fi
    })

}// function  owesomeAlert
$(".restart").on("click",function(e)
{
	e.preventDefault();
	handleReset();
});