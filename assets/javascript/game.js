
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','-','ä','ö','ü'];
var geusses = [];
var correctWord = [];

var defaultWords = ['one', 'two', 'three'];
var wordBox = [];
var gameWords;

//checks to see if the player added words to the game 
if (wordBox.length = 0) 
{
    gameWords = defaultWords;
} else {
    gameWords = wordBox;
};

//randomly chooses a word from the list
randomPick = Math.floor(Math.random()*gameWords.length);
correctWord = gameWords[randomPick].split("");

//creates a div for each letter in the random word
for (var i = 0; i < correctWord.length; i++) {
    var letterDiv = document.createElement("div");
    letterDiv.classList.add(correctWord[i]);
    document.body.appendChild(letterDiv);
};

document.onkeyup = function(event) {
//write a function that passes the different variables checking the status
};