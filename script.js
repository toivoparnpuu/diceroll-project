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
// class

class Dice {
    #results = new Map();
    #total = 0;
    #input = [];
    #inputStr = '';
    constructor(diceCodeList) {
        this.#inputStr = diceCodeList;
        this.#results.set('total', 0);
        this.#parseDices();

    }

    #parseDices() {
        this.#input = this.#inputStr.toLowerCase().replace(/\s/g, "").split('+');
        this.#input.forEach(oneDice => {
            this.#results.set(oneDice, [])
        }); //forEach
    }
    doRolls() {
        this.#results.forEach((diceValue, diceKey, map) => {

            let rolls = diceKey.split('d')[0];
            let sides = diceKey.split('d')[1];
            this.#results.set(diceKey, this.#roll(rolls, sides));

        });
        this.#results.set('total', [this.#total]);

    }
    #roll(rolls, sides) {
        let result = [];
        let randomNr = 0;
        for (let i = 0; i < rolls; i++) {
            randomNr = Math.floor(Math.random() * sides) + 1;
            this.#total = this.#total + randomNr;
            result.push(randomNr);
        }
        return result;
    }
    get diceList() {
        return this.#input
    }
    get rollResults() {
        return this.#results;
    }
} // class Dice

// functions
function clickOnRollDice() {
    const myDice = new Dice(input.value);
    myDice.doRolls()
    displayResults(myDice);
    //displayResults('KOKKU: ' + diceList.join(' + ') + ' = ' + diceTotal);
}

function resetInputAndLog() {
    input.value = "";
    while (writeout.firstChild) {
        writeout.removeChild(writeout.firstChild);
    }
}

function displayResults(diceObject) {
    let textRow = '';
    let rollMap = diceObject.rollResults;
    let diceInput = diceObject.diceList;
    diceInput.push('total');

    console.log(diceInput);
    diceInput.forEach((element) => {
        rollMap.get(element).forEach((diceResult) => {
            let li = document.createElement('li');
            if (element.match('d20') && diceResult == 20) {
                textRow = `1d20 : ${diceResult} - critical hit!`;
                li.className='criticalhit';
                console.log('hei');
            }  else if (element.match('d20') && diceResult == 1) {
                textRow = `1d20 : ${diceResult} - critical miss!`;
                li.className='criticalmiss';

            }  else if  (element == 'total'){
                textRow = `Total : ${rollMap.get('total')}`;
            } else {
                textRow = `1d${element.split('d')[1]} : ${diceResult}`;
            }

            li.appendChild(document.createTextNode(textRow));
            writeout.appendChild(li);
        });

    });
}
//https://codepen.io/vicentemundim/pen/nXNvBw