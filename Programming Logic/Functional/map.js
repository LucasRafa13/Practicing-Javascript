const numbers = [1, 2, 3, 4, 5, 6];

const numbersV2 = numbers.map(el => el * 2);

console.log(numbersV2);

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
    score: 6.9
  }
];

const getScore = el => el.score;

const result = students.map(getScore).map(Math.ceil);

console.log(students, result);
