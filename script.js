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
resetButton.addEventListener("click", function () {
    resetInputAndLog();
});

rollButton.addEventListener("click", function () {
    clickOnRollDice();
});

// functions
function clickOnRollDice() {
    let rollingList = parseDices(input.value);
    let diceTotal = 0;
    diceList = [];
    
    rollingList.forEach(element => {
        let diceCode = element.split('d')[1];
        let diceRolls = element.split('d')[0];

        for (let i = 0; i < diceRolls; i++) {
            let diceResult = getRandomInt(diceCode);
            diceList.push(diceResult[0]);
            displayResults('d' + diceCode + ': ' + diceResult.join(' '));
            diceTotal = diceTotal + diceResult[0];
        }
    });

    displayResults('KOKKU: ' + diceList.join(' + ') + ' = ' + diceTotal);
}

function resetInputAndLog() {
    input.value = "";
    while (writeout.firstChild) {
        writeout.removeChild(writeout.firstChild);
    }
}

function parseDices(dicesInput) {
    let result = dicesInput.trim().split('+');
    return result;
}

function displayResults(textToOutput) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(textToOutput));
    writeout.appendChild(li);
} 

function getRandomInt(max) {
    let extraMsg = '';
    let diceRoll = Math.floor(Math.random() * max) + 1;

    if (max ==20) {
        if (diceRoll == 1){
            extraMsg = '(critical miss)';
            console.log(extraMsg);
        }
        else if (diceRoll == 20) {
            extraMsg = '(critical hit)';
            console.log(extraMsg);
        }
    };

    return [diceRoll, extraMsg];
}
