// Params

function logParams(a, b, c) {
  console.log(a, b, c);
}

logParams(1, 2, 3);

function defaultParams(a, b, c = 11) {
  console.log(a, b, c);
}

defaultParams(1, 2);

// Spread/Rest
// function logNums(...nums) {
//   console.log(Array.isArray(nums));
//   for (let n of nums) {
//     console.log(n);
//   }
// }

// logNums([1, 2, 3]);

// Spread/Rest simple function
function logNums(...nums) {
  console.log(nums);
}

logNums(1, 2, 3);

function sumAll(...nums) {
  let total = 0;
  for (let n of nums) {
    total += n;
  }
  return total;
}

console.log(sumAll(1, 2, 3, 4, 5));
