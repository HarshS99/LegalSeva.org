/**
 * Performs a basic arithmetic operation between two numbers.
 * Supports addition, subtraction, multiplication, and division.
 *
 * @param {number} a The first operand.
 * @param {number} b The second operand.
 * @param {string} op The operator to perform. Valid operators are '+', '-', '*', '/'.
 * @returns {number | null} The result of the operation, or `null` if the operator is invalid.
 * @throws {Error} If the operator is '/' and the second operand `b` is 0.
 */
function calc(a, b, op) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') {
    if (b === 0) throw new Error('Divide by zero');
    return a / b;
  }
  return null;
}

/**
 * Processes an array of numbers.
 * Even numbers in the input array are doubled, while odd numbers remain unchanged.
 *
 * @param {number[]} arr The input array of numbers to process.
 * @returns {number[]} A new array containing the processed numbers.
 */
function processArray(arr) {
  let r = [];
  for(let i=0; i<arr.length; i++) {
    if(arr[i] % 2 === 0) {
      r.push(arr[i] * 2);
    } else {
      r.push(arr[i]);
    }
  }
  return r;
}

module.exports = { calc, processArray };