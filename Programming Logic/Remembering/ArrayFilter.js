// Filter -> Sempre retornar um array com a mesma quantidade de elementos ou menos

// Retorne os números maiores que 10

const numbers = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27]

const numbersGreaterThanTen = numbers.filter(value => value > 10)

// function callbackFilter(value, index, array) {
//   if (value > 10) {
//     return true
//   } else {
//     return false
//   }
// }

console.log(numbersGreaterThanTen)
