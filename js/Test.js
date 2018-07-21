// ------------ Controller Area ----- //
var Opencards =[];
var counter   =0;
var stars      =0;
var clickes   =0;
CardsList     = CardsImplement ();

var shuffled = shuffle(CardsList);
DisplayCards();
//add event listner
$(".card") on('click',function(){
	Matcher(this);
})

//----------------------- Model Area --------//

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

// display cards --------------------------------
function DisplayCards(){
	var list =CreateCards();
	replacer (list);
};

function replacer(list){
	document.getElementsByClassName("deck")[0].innerHTML= list.innerHTML;
};

function CreateCards(){
	var list = document.createElement("ul");
	for(var x=0; x < shuffled.length ; x++){
		var li = document.createElement("li");
		li.innerHTML=shuffled[x];
		li.classList.add("card");
		list.appendChild("li");
	}
	return list;
};



function Matcher(card){
	Displayicons(card);
	Opencard(card);
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


function Displayicons(card){
	$(card).addClass("show open");

};

function Opencard(card){
	
};