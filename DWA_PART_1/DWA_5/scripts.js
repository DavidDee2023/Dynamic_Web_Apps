// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const dividendInput = event.target.querySelector('input[name="dividend"]');
  const dividerInput = event.target.querySelector('input[name="divider"]');

  const dividendValue = parseFloat(dividendInput.value);
  const dividerValue = parseFloat(dividerInput.value);

  /**
   * the "if" below is there to handle where the input values would be not valid numbers
   * Should display results as an error masseage pop-up to the console.
   */

  if (isNaN(dividendValue) || isNaN(dividerValue)) {
    result.innerText = "Something critical went wrong. Please reload the page. “Division not performed. Both values are required in inputs. Try again”."; 
    console.error("Invalid input provided.");
    return;
  }

  /**
   * The code below handles issues where if you attempt to divide by zero or a number less than zero.
   * An error message will pop-up for both cases if you divide by zero or negative number.
   */

  if (dividerValue === 0 || dividerValue < 0 ) {
    result.innerText = "Division not performed. Invalid number provided. Try again";
    console.error("Attempted to divide by zero.");
    return;
  }

  /**
   * The code below will check if both divider and dividend value are whole numbers.
   * An error message will pop-up in the console numbers are not whole numbers.
   */

  if (!Number.isInteger(dividendValue) || !Number.isInteger(dividerValue)) {
    result.innerText = "Division not performed. Both values must be whole numbers.";
    console.error("Non-integer values provided.");
    return;
  }

  /**
   * this code below is responsible for ensuring that the calculated division result is finite and handling the scenario where it might not be.
   * An error message will pop-up if the scenario is not handled.
   */

  const quotient = Math.floor(dividendValue / dividerValue); //The `Math.floor()` function is used to perform integer division. It divides dividendValue by dividerValue and then rounds the result down to the nearest
  if (!Number.isFinite(quotient)) {
    result.innerText = "Something critical went wrong. Please reload the page.";
    console.error("Division result is not finite.");
    return;
  }

  result.innerText = quotient;
});