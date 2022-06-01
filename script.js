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
    constructor(diceCodeList){
        this.#inputStr = diceCodeList;
        this.#results.set('total',0);
        this.#parseDices();
  
    }

    #parseDices(){
        this.#input = this.#inputStr.toLowerCase().replace(/\s/g, "").split('+');
        this.#input.forEach(oneDice => {
            this.#results.set(oneDice,[])
        }); //forEach
    }
    doRolls(){
            this.#results.forEach((diceValue, diceKey, map) => {
                
                let rolls = diceKey.split('d')[0]; 
                let sides = diceKey.split('d')[1];
                this.#results.set(diceKey, this.#roll(rolls, sides));
                 
            });
            console.log('veeretatud: ', this.#results);
            this.#results.set('total',[this.#total]);
            return this.#results;
        }
    #roll(rolls, sides){
        let result = [];
        let randomNr = 0;
        for (let i = 0; i < rolls; i++) {
            randomNr = Math.floor(Math.random() * sides) + 1;
            this.#total = this.#total + randomNr;
            result.push(randomNr); 
        }
        return result;
    }
    } // class Dice

// functions
function clickOnRollDice() {
    const myDice = new Dice(input.value);
    displayResults(myDice.doRolls());
    //displayResults('KOKKU: ' + diceList.join(' + ') + ' = ' + diceTotal);
}

function resetInputAndLog() {
    input.value = "";
    while (writeout.firstChild) {
        writeout.removeChild(writeout.firstChild);
    }
}

function displayResults(mapToOutput) {
    textRow = '';
    mapToOutput.forEach((value, key) => {
        if (key == 'total') {
            
        } else {
            let li = document.createElement('li');
            textRow = `${'d' + key.split('d')[1]} : ${value.join(', ')}`;
            li.appendChild(document.createTextNode(textRow));
            writeout.appendChild(li);            
        }
    }); //forEach

    let li = document.createElement('li');
    textRow = `Total : ${mapToOutput.get('total')}`;
    li.appendChild(document.createTextNode(textRow));
    writeout.appendChild(li);  


} 
//https://codepen.io/vicentemundim/pen/nXNvBw
