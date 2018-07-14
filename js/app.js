/*
 * made by Dalia Adel Saber
 */
var OpenCards =[];
var MoveCounter =0;
var  ratingStars =0;
var clickes =0;
CardsList=CardsImplement();
var gameEnded=false;

var interval;
var timer=document.querySelector(".timer");
//var timer=$("#timer");
timer.innerHTML="0 mins:0 secs";

 //dd(typeof CardsList,'i am cardsList here','c');
 var shuffled=shuffle(CardsList);
 //dd(shuffledOne,'shuffledOne','c');
DisplayCards ();
var click=0;
 //ddS((".card"),'this cards to click event','c');
 $('.cards').on('click',function(){
click++;
if (click==1) {startTimer();
    //code
}
fireMatched(this);
 });
 function CardsImplement(){
     var Cards = [];
    Cards = document.getElementsByClassName("card");
 // dd(domCards,"this is cards exist in the dom right now","c");
  return  transformer (Cards);
 };
 
function transformer(obj) {
    var transformed =[];
    for (var key in obj){
       if( obj.hasOwnProperty(key)){
        transformed.push(obj[key].innerHTML);
       }
    }
   return transformed; 
}



 function DisplayCards() {
    var list=CreateCards();
    replacer(list);
    
 };
 function replacer(list) {
      document.getElementByClassName("deck")[0].innerHTML = list.innerHTML;
 };
 function CreateCard() {
    var list=document.createElement("ul");
    for (var x=0; x < shuffled.length;x++){
        var li = document.createElement("li");
        li.innerHTML=shuffled[x];
        li.classList.add("card");
        list.appendChild(li);
        
    }
    return list;
 };
 
 
 
 
 
 function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
     while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
     }
return array;}
 
 
 
function fireMatched(card) {
    if (isClisked(card)) {
        return;
        
    }
      displaySymbol (card);
   markedOpened(card);
};
    function isClicked(card) {
        if ($(card).hasClass("show") || $(card).hasClass("open")){
            return true;
            //code
       
        }
        return false;
    }
  

 function Displayicons(card){
    $(card).addClass("show open");
    //dd(card,'i am card to display','c')
    
 };
 
 function incmentMoves(card){
    if (gameEnded || $(card).hasClass("match")|| $(card).is($(OpenedCards[0])) ) {
        return false;
    }
    
   MoveCounter ++;
   Rating(MoveCounter);
   $('.moves').text(MoveCounter);
 };
  function IsMatch (openedCards){
    
    let case1 =openedCards[0].innerHTML!=openedCards[1].innerHTML;
    let case2 =$(openedCrds[0]).is($(openedCards[1]));
    if (case1||case2) {
        return false;
    }else
    {
    return true;}
 };
 function matched (openCardsds){
    closeOpenCard(openedCards);
    markAsMatched(openCards);
    openCards =[];
 };
 function markAsMatched (openedCards){
    for (let i =openedCards.length-1;i>=0;i--){
        
        $(openedCards[i].addClass("match");
    }
    
 };
 function nOMatched(openedCards){

    
    var currentCards =openedCards;
    Animate(currentCards);
    
    setTimeout(function(){
         hideicons(currentCards);
        
        },1000);

    openCards[];
    
 };
 function Rating(moves) {
    let score=3;
    if (moves<=15) {
        ratingStars.eq(3).removeClass('fa-star').addClass('fa-star-o');
        score=3;
    }else if (moves>15&& move <=22) {
        ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
        score=2;
    }
    else if (moves>22) {
        ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
        score =1;
    }
    return score;
 }
 
  function Animate(openedCards){
    
    for (var i= openCards.length-1;i>=0;i--){
        $(openedCards[i].addClass("unmatched");
    }
 }
  function hideicons(openedCards){
  for(var i=openedCards.length-1;i>=0;i--){
    $(openedCards[i]).removeClass("open Show unMatched");}  
 }
 function closeOpenCards(openCards) {
    for (var i =openCards.length-1;1>=0;i--) {
      $(openedCards[i]).removeClass("open");}   
    }
 
 
    
    checkMatchedAll();
 }
 checkMatchedAll =()=>{
    let all=true;
    $('.card').each(function(){
        return all=$(this).hasClass("match");
        });
    if (all) {
        //owSomeAlert();
        showStatistics();
        gameEnded = true;
        //code
    }
 }
 function handleReset() {
    window.location.reload();
 };
 function showStatistics() {
    var score= Rating(Moveconter);
    clearInterval(interval);
    var time =getTimer();
    
    owesomeAlert('congratulation ! Winning' ,'With' + MoveCounter+' Moves' '+',Scoring+score+'Star!'+'in'+ time+'Time','success','play again','stay');
}
 function getTimer() {
    
    return $('#timer').text();
 };
 function Markedopen(card) {
    if (Opencards.length>0) {
        incMoves(card);
        opencards.push(card);
        if (IsMatch(Opencards)) {
            matched(Opencards);
            Opencards=[];
        }else
        {
            nomatched(Opencards);
            Opencards [];
        }
        }
        else {
            Opencards.push(card);
            incMoves(card);
        }
        checkMatchedAll();
    };
    var second = 0;minute=0; hour=0;
    function startTimer() {
        interval =setInterval(function(){timer.innerHTML =minute +"mins "+": "+second+"secs";
                              second++;
                              if (second == 60) {
                                minute++;
                                second=0;
                              }
                              if (minute == 60) {
                                hour++;
                                minute =0;
                              }
            
    },1000);
 }

 function  owesometAlert (titleToBind,textToShow,typeToBind,confirmbtnText = null,cbtnText)
   swal({
  title: titleToBind,
  text: textToShow,
  type: typeToBind,
  showCancelButton:cbtnText, true:false,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: confirmbtnText,
  confirmButtonText:cbtnText,
  confirmButtonClass:'btn btn-success',
  
   confirmButtonClass:'btn btn-danger',
   buttonsStyling:false,
   buttonsButtons:true
}).then((result) => {
  if (result.value) {
    swal(
        titlt:'Reloading'
        text:'have fun todd.',
        type:'success',
        timer=2500
  }}setTimeout (function(){
    window.location.reload();
  },2000);
     
    
else if (
    // Read more about handling dismissals
    result.dismiss === 'cancel'){
    

    swal({
        title:'pausing',
      text:'Refresh the page to play again',
      type:'info',
      animation:'false',
      customClass:'animated tada',
      timer:1000;
      
    } )
  }
})
    }

    
 