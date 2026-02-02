const outputField = document.getElementById('output-field');
const clearEntryButton = document.getElementById('clear-entry');
const clearAllButton = document.getElementById('clear-all');
const decimalButton = document.getElementById('decimal');
const equalsButton = document.getElementById('equals');
const numberButtons = document.querySelectorAll('.number-btn')
const operatorButtons = document.querySelectorAll('.operator-btn')

let currentInput = null;
let previousInput = null;
let operator = null;
let replaceCurr = false;
let equalPress = false;

updateDisplay();

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.value);
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        setOperator(button.dataset.value);
    })
})

decimalButton.addEventListener('click', () => {
    addDecimal()
})

clearEntryButton.addEventListener('click', () => {
    clearEntry();
})

clearAllButton.addEventListener('click', () => {
    clearAll();
})

equalsButton.addEventListener('click', () => {
    calculate();
    replaceCurr = true;
})


function appendNumber(number) {
    if (replaceCurr || currentInput == '0' || currentInput == null){
        currentInput = number;
        replaceCurr = false;
    } else {
        currentInput += number;
    }
    console.log(`previous:${previousInput}, Current: ${currentInput}, Operator:${operator}`)
    updateDisplay()
}

function clearEntry(){
    currentInput = null;
    updateDisplay()
    console.log(`previous:${previousInput}, Current: ${currentInput}, Operator:${operator}`)
}

function clearAll(){
    currentInput = null;
    previousInput = null;
    operator = null;
    updateDisplay();
    console.log(`previous:${previousInput}, Current: ${currentInput}, Operator:${operator}`)
}

function addDecimal(){
    if(replaceCurr == true || currentInput == null){
        currentInput = '0.'
        replaceCurr = false;
        console.log(`previous:${previousInput}, Current: ${currentInput}, Operator:${operator}`)
    }
    else if (!currentInput.includes('.')){
        currentInput += '.'; 
        console.log(`previous:${previousInput}, Current: ${currentInput}, Operator:${operator}`)
    }
    updateDisplay();
}

function setOperator(op){
    if (equalPress == true) {
        previousInput = outputField.value;
        currentInput = null;
        operator = op;
        replaceCurr = true;
        equalPress == false;
    }
    if (operator !== null && currentInput !== null){
        calculate();
        previousInput = outputField.value;
        currentInput = null;
        operator = op;
        replaceCurr = true;
        console.log(`previous:${previousInput}, Current: ${currentInput}, Operator:${operator}`)
        return;
    }
    previousInput = outputField.value;
    operator = op;
    currentInput = null;
    replaceCurr = true;
    console.log(`previous:${previousInput}, Current: ${currentInput}, Operator:${operator}`)
    
}

function calculate(){
    if (operator == null){
        return;
    }
    const prev = parseFloat(previousInput);
    if (currentInput == null){
        currentInput = outputField.value;
    }
    const curr = parseFloat(currentInput);

    console.log(`previous:${previousInput}, Current: ${currentInput}, Operator:${operator}`)

    let result;
    switch(operator){
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '/':
            result = prev / curr;
            break;
        case '*':
            result = prev * curr;
            break;
        default:
            return;
    }

    outputField.value = result.toString();
    previousInput = result.toString();
    equalPress = true;
    console.log(`previous:${previousInput}, Current: ${currentInput}, Operator:${operator}`)
}

function updateDisplay() {
    if (currentInput == null){
        outputField.value = '0';
    } else {
        outputField.value = currentInput;
    }
    
}
