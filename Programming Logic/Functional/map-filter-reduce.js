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

const greatStudent = students => students.score >= 9;

const getScore = el => el.score;
// Média
const avg = (acc, el, i, array) => {
  if (i === array.length - 1) {
    return (acc + el) / array.length;
  } else {
    return acc + el;
  }
};

console.log(students.filter(greatStudent).map(getScore).reduce(avg));
