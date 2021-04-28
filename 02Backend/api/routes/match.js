const prompt = require("prompt-sync")();

const num = prompt("Enter a number: ");
let n = Number(num);

function checkParentheses(n) {
  let row = [],correctList = [],incorrectList = [];
  let count = 0,countL = 0,countR = 0;
  let temp = "";

  for (let i = Math.pow(2, n * 2) - 1; i >= 0; i--) {
    for (let j = n * 2 - 1; j >= 0; j--) {
      row[j] = i & Math.pow(2, j) ? "(" : ")";
      temp += row[j];
    }
    count = (temp.match(/\(/g) || []).length;
    if (temp[0] == "(" && temp[n * 2 - 1] == ")" && count == n) {
      for (let i = 0; i <= temp.length - 1; i++) {
        if (temp[i] == "(") {
          countL++;
        } else if (temp[i] == ")") {
          countR++;
        }
        if (countR > countL) {
          incorrectList.push(temp);
        }
      }
      correctList.push(temp);
    }
    temp = "";
  }
  return correctList.filter(n => !incorrectList.includes(n));
}

console.log(checkParentheses(n))
