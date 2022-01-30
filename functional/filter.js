const numbers = [1, 2, 3, 4, 5, 6];

const greaterThanZero = el => el > 0;
const greaterThanTen = el => el > 10;
const even = el => el % 2 === 0;

console.log(numbers.filter(el => el > 0));
console.log(numbers.filter(greaterThanZero));
console.log(numbers.filter(greaterThanTen));
console.log(numbers.filter(even));



const students = [
  {
    name: 'Tanya',
    score: 6.4
  },
  {
    name: 'Lucas',
    score: 10
  },
  {
    name: 'Tom',
    score: 7.5
  },
  {
    name: 'Holland',
    score: 9.2
  }
];

const greatStudent = students => students.score >= 9;

const result = students.filter(greatStudent);

console.log(students, result);