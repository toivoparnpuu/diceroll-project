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
    let rollingList = parseDices(input.value);
    rollDice(rollingList);
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
    let result = dicesInput.trim().split('+');
    return result;
}

function rollDice(){
    
    console.log("TODO");
}

function displayResults(textToOutput){
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(textToOutput));
    writeout.appendChild(li);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }
  