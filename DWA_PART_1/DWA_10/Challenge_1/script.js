// scripts.js

const MAX_NUMBER = 25;
const MIN_NUMBER = -25;
const STEP_AMOUNT = 1;
const RESET_VALUE = 0;

/**
 *  domElements is created to store references to various HTML elements using document.querySelector().
 */

const domElements = {
    number: document.querySelector('[data-key="number"]'),
    subtract: document.querySelector('[data-key="subtract"]'),
    add: document.querySelector('[data-key="add"]'),
    reset: {
        reset: document.querySelector('[data-key="reset"]'),
        resetOverlay: document.querySelector('[data-key="reset-button"]')
    }
}

/**
 * The subtractHandler function is responsible for handling the subtraction operation.
 * It retrieves the current value of the number input field, subtracts STEP_AMOUNT from it, and updates the input field with the new value.
 * It then checks if the "add" button is disabled (meaning the number was at its maximum), and if so, it enables the "add" butto
 */
const subtractHandler = () => {
    const newValue = parseInt(domElements.number.value) - STEP_AMOUNT;
    domElements.number.value = newValue;

    if (domElements.add.disabled === true) {
        domElements.add.disabled = false;
    }

    if (newValue <= MIN_NUMBER) {
        domElements.subtract.disabled = true;
    }
}

/**
 * The addHandler function handles the addition operation in a similar way.
 * It adds STEP_AMOUNT to the current value, updates the input field, and checks if the "subtract" button is disabled (indicating the number was at its minimum).
 * If the "subtract" button was disabled, it enables it.
 */
const addHandler = () => {
    const newValue = parseInt(domElements.number.value) + STEP_AMOUNT;
    domElements.number.value = newValue;

    if (domElements.subtract.disabled === true) {
        domElements.subtract.disabled = false;
    }

    if (newValue >= MAX_NUMBER) {
        domElements.add.disabled = true;
    }
}


//the resetHandler function resets the number input field to RESET_VALUE.
//It also checks if domElements.reset.resetOverlay exists and has a show() method (to avoid errors), and if so, it calls the show() method.

const resetHandler = () => {
    domElements.number.value = RESET_VALUE;

    // Using if statement to check if resetOverlay has a show() method
    if (domElements.reset.resetOverlay && typeof domElements.reset.resetOverlay.show === 'function') {
        domElements.reset.resetOverlay.show();
    }
}

domElements.add.addEventListener('click', addHandler);
domElements.subtract.addEventListener('click', subtractHandler);
domElements.reset.reset.addEventListener('click', resetHandler);





