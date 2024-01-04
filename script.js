let displayValue = '0';
let currentInput = '';
let inputArray = [];
let resultDisplayed = false;

function updateDisplay() {
    document.getElementById('display').innerText = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    currentInput = '';
    inputArray = [];
    resultDisplayed = false;
    updateDisplay();
}

function appendNumber(number) {
    if (resultDisplayed) {
        displayValue = number;
        currentInput = number;
        inputArray = [number];
        resultDisplayed = false;
    } else {
        currentInput += number;

        currentInput = currentInput.replace(/^0+/, '');

        displayValue = currentInput;
    }
    updateDisplay();
}


function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        displayValue += '.';
    }
    updateDisplay();
}

function appendOperator(op) {
    if (resultDisplayed) {
        inputArray = [displayValue];
        resultDisplayed = false;
    } else {
        inputArray.push(currentInput);
    }

    inputArray.push(op);
    displayValue += op;
    currentInput = '';
    updateDisplay();
}

function calculateResult() {
    if (currentInput !== '') {
        inputArray.push(currentInput);
    }

    if (inputArray.length >= 3) {
        let result = parseFloat(inputArray[0]);
        for (let i = 1; i < inputArray.length; i += 2) {
            const operator = inputArray[i];
            const operand = parseFloat(inputArray[i + 1]);
            switch (operator) {
                case '+':
                    result += operand;
                    break;
                case '-':
                    result -= operand;
                    break;
                case '*':
                    result *= operand;
                    break;
                case '/':
                    if (operand !== 0) {
                        result /= operand;
                    } else {
                        displayValue = 'Error';
                        updateDisplay();
                        return;
                    }
                    break;
            }
        }
        displayValue = result;
        inputArray = [result];
        currentInput = result.toString();
        resultDisplayed = true;
        updateDisplay();
    }
}

updateDisplay();
