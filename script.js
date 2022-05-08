const selectors = {
    resetButton: '.js-reset-btn',
    rollButton: '.js-roll-btn',
    input: '.js-dice-input',
    writeout: '.js-list'
}



const resetButton = document.querySelector(selectors.resetButton);
const rollButton = document.querySelector(selectors.rollButton);
const input = document.querySelector(selectors.input);
const writeout = document.querySelector(selectors.writeout);


//event listeners
resetButton.addEventListener("click", function() {
    resetInputAndLog();
  });
  
rollButton.addEventListener("click", function(){
    parseDices(input.value);
    rollDice();
});



// functions
function resetInputAndLog(){
    input.value = "";
    //https://www.javascripttutorial.net/javascript-dom/javascript-removechild/
    while (writeout.firstChild){
        writeout.removeChild(writeout.firstChild);
    }
}
function parseDices(dicesInput){
    console.log(dicesInput);
    return 0;
}

function rollDice(){
    console.log("TODO");
}

function displayResults(){
    console.log("TODO");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }
  