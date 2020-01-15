
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("start");
    //defines the initial components of the game
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var guesses = [];
    var remainingLetters = [];

    //defines the words used and hints
    var animalObjects = [
        {
            name: 'Bee',
            sound: ["bzz", "bun", "sum", "vzz", "boong"],
            language: ["English", "Japanese", "German", "Turkish", "Korean"]
        },
        {
            name: 'Bird',
            sound: ["Tweet", "Cui-Cui", "Pio-Pio", "Chun-Chun", "Pip-Pip", "Tjiep", "Jick-Jick", "TsiouTsiou", "Chip"],
            language: ["English", "French", "Spanish", "Japanese", "Swedish", "Dutch", "Turkish", "Greek", "Italian"]
        },
        {
            name: 'Cat',
            sound: ["Meow", "Mjau", "Myau", "Miau", "Miao", "Meo", "Miaou", "Yaong", "Nyan", "Nau"],
            language: ["English", "Swedish", "Russian", "Spanish", "Italian", "Vietnamese", "French", "Korean", "Japanese", "Estonian"]	
        },
        {
            name: 'Cockerel',
            sound: ["Cock-a-doodle-doo", "Kikiriki", "Cocorico", "Ko-ki-oh", "Kok-e-kok-ko"],
            language: ["English", "Spanish", "French", "Korean", "Japanese"]
        },
        {
            name: 'Dog',
            sound: ["Woof", "Gav", "Waouh", "Guau", "Blaf", "Wan", "Voff", "Ham", "Bau", "Wong", "Hev", "Haap", "Guk", "Meong"],
            language: ["English", "Russian", "French", "Spanish", "Dutch", "Japanese", "Icelandic", "Romanian", "Italian", "Cantonese", "Turkish", "Persian", "Indonesian", "Korean"]
        },
        {
            name: 'Duck',
            sound: ["Quack", "Rap", "Mac", "Hap", "Vak", "Coin", "Praaks"],
            language: ["English", "Danish", "Romanian", "Hungarian", "Turkish", "French", "Estonian"]
        },
        {
            name: 'Frog',
            sound: ["Ribbit", "Cra-Cra", "Vrak", "Kwaak", "Kum-kum", "Gae-Gool", "OpOp", "GuoGuo", "Brekeke", "Kerokero"],
            language: ["English", "Italian", "Turkish", "German", "Polish", "Korean", "Thai", "Chinese", "Hungarian", "Japanese"]
        },
        {
            name: 'Horse',
            sound: ["Neigh", "Vrinsk", "Hihiin", "Gnagg", "I-go-go", "I-haaa", "Nyihaha"],
            language: ["English", "Danish", "Japanese", "Swedish", "Russian", "Polish", "Hungarian"]
        },
        {
            name: 'Mouse',
            sound: ["Squeak", "Piep", "Pip-pip", "Squitt", "Chuu", "Zi", "Jjik", "Cin"],
            language: ["English", "Dutch", "Swedish", "Italian", "Japanese", "Mandarian", "Korean", "Hungarian"]
        },
        {
            name: 'Pig',
            sound: ["Oink", "Hunk", "Buu", "Grunz", "Knor", "Noff"],
            language: ["English", "Albanian", "Japanese", "German", "Dutch", "Sweedish"]
        }];

    //selects the animal and hints from the animalObject
    var gameWord = [];
    var randomAnimal = Math.floor(Math.random()*animalObjects.length);
    var nameHint = animalObjects[randomAnimal].name;
    var randomSound = Math.floor(Math.random()*animalObjects[randomAnimal].sound.length);
    var defaultWord = animalObjects[randomAnimal].sound[randomSound];
    var languageHint = animalObjects[randomAnimal].language[randomSound];

    console.log('Selected Animal: ' + nameHint);
    console.log('Language Hint: ' + languageHint);
    console.log('Word to guess: ' + defaultWord);
    var matchCase = defaultWord.toString().toLowerCase();
    var gameWord = matchCase;

    remainingLetters = gameWord;
    console.log('remaining Letters: ' + remainingLetters);

    //creates a div for each letter in the random word
    console.log("Creates a div for each letter");
    for (var i = 0; i < gameWord.length; i++) {
        var emptyWord = document.querySelector(".wordContainer");
        var letterDiv = document.createElement("div");
        if (gameWord[i] === "-") {
            letterDiv.classList.add("dash");
            letterDiv.innerHTML = "-";
        } else {
            letterDiv.classList.add(gameWord[i]);
            letterDiv.insertAdjacentText("afterbegin", "_");
        };
        emptyWord.appendChild(letterDiv);
    };

    //Displays the correct guesses
    console.log("Replaces each div for the correct letter");

    document.onkeyup = function(event) {
    //Selects all of the divs with the matching class
        var guess = document.querySelectorAll("." + event.key);

    //Prevents the same letter from being guessed twice
        var message = document.querySelector(".messageBox");
        message.innerHTML = "";

        if(alphabet.indexOf(event.key) === -1) {    
            message.insertAdjacentText("afterbegin", event.key + " has already been guessed or cannot be used. Please make another selection.");
            return;
        } else {
    //Changes the allowable guesses so the same letter cannot be guessed twice
            function replaceGuess () {
                var abc = '';
                abc = alphabet.toString();
                abc = abc.replace(event.key,"");
                abc = abc.replace(",,",",");
                alphabet = abc.split(",");
                guesses.push(event.key);
            };
            replaceGuess();
        };

    //Displays the wrong guesses in a seperate div
        if (guess.length === 0) {
            var badGuess = document.querySelector(".wrongLetters");
            var letterDiv = document.createElement("div");
            letterDiv.classList.add("badGuess");
            letterDiv.insertAdjacentText("afterbegin", event.key);
            badGuess.appendChild(letterDiv);
        } else {
    //Changes the _ for the correct letter
            for (var i = 0; i < guess.length; i++) {
                guess[i].replaceWith(event.key);
    //Removes the correct letter and lets you know the remaining letters
                function lettersRemain() {
                    removeLetter = remainingLetters.toString();
                    removeLetter = removeLetter.replace("-","");
                    removeLetter = removeLetter.replace(event.key,"");
                    removeLetter = removeLetter.replace(/,/g,"");
                    remainingLetters = removeLetter.split("");
                }
                lettersRemain();
            };
            console.log('remaining letters: ' + remainingLetters);
            console.log(remainingLetters);
        }
//Runs the winning functions
        if (remainingLetters.length == 0) {
            message.innerHTML = "You won!!!";
            var pictureDiv = document.querySelector(".picture");
            var notWinningPicture = pictureDiv.getElementsByClassName("normal");
            console.log(notWinningPicture);
            for (var i=0; i < notWinningPicture.length; i++) {
                notWinningPicture[i].classList.add("hidden");
            }
            pictureDiv.querySelector("." + nameHint).classList.remove("hidden");
            pictureDiv.querySelector(".display" + nameHint).classList.remove("hidden");
            pictureDiv.querySelector(".display" + nameHint).classList.remove("normal");
            var findButtons = document.querySelectorAll(".button"); // .giveLanguage .giveLetter .playSound
            for (var i=0; i < findButtons.legth; i++) {
                findButtons[i].classList.add(".hidden");
            }
            console.log(findButtons);
            var giveName = document.querySelector(".question");
            giveName.innerHTML = "What sound does a " + nameHint + " make in "+ languageHint + "?"
            playSound();
        }
    };

    //Gives the animal name
    giveAnimalName = function() {
        var giveName = document.querySelector(".question");
        if (giveName.classList.contains("addedLanguage") === true) {
            giveName.innerHTML = "What sound does a " + nameHint + " make in "+ languageHint + "?"
            giveName.classList.add("addedName");
            document.querySelectorAll("img").height = "20%";
            document.querySelectorAll("img").width = "20%";
        } else {
            giveName.innerHTML = "What sound does a " + nameHint + " make in (langauge)?"
            giveName.classList.add("addedName");
            document.querySelectorAll("img").height = "20%";
            document.querySelectorAll("img").width = "20%";
        }
    //removes the other pictures and adds the correct animal picture
        var img = document.createElement("img");
        img.src = "assets/images/" + nameHint + ".jpg";
        img.id = nameHint;
        var findPicture = document.querySelector(".picture");
        findPicture.innerHTML = '';
        findPicture.appendChild(img);
        findPicture.classList.add("winningPicture");
    };

    //Gives the language
    giveLanguageName = function() {
        var giveLanguage = document.querySelector(".question");
        if (giveLanguage.classList.contains("addedName") === true) {
            giveLanguage.innerHTML = "What sound does a " + nameHint + " make in " + languageHint + "?"
            giveLanguage.classList.add("addedLanguage");
        } else {
            giveLanguage.innerHTML = "What sound does a (animal) make in " + languageHint + "?"
            giveLanguage.classList.add("addedLanguage");
        }
    };
    //gives a letter
    giveLetter = function() {
        var randomLetter = Math.floor(Math.random()*remainingLetters.length);
        var letterGive = document.querySelector(".messageBox");
        letterGive.innerHTML = "Try " + remainingLetters[randomLetter];
    }

    playSound = function() {
        if (nameHint === 'Duck' || nameHint === 'Mouse' || nameHint === 'Frog' || nameHint === 'Pig' || nameHint === 'Dog') {
            var soundFile = "./assets/sounds/" + nameHint.toLowerCase() + "Sound.wav";
        } else {
            var soundFile = "./assets/sounds/" + nameHint.toLowerCase() + "Sound.mp3";
        }
        console.log('Sound File: ' + soundFile);
        var audioTag = document.getElementById('player');
        var emptySourceTag = audioTag.innerHTML = '';
        var sourceTag = document.createElement("source");
        sourceTag.src = soundFile;
        audioTag.appendChild(sourceTag);
        audioTag.play();
    }

    //Restarts the game
    reload = function() {
        location.reload();
    }
});
