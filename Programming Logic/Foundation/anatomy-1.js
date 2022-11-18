// Function Declaration Without Argument

function sayHello() {
  console.log('Hello Luke!');
}

sayHello();

// Function Declaration With Argument

function sayHelloTo(name) {
  console.log('Hello' + name);
  console.log(`Hello ${name}!!!`);
}

sayHelloTo('Mike');

function returnHi() {
  return 'Hi!';
}

// Let, const or Var
let greeting = returnHi();
console.log(greeting);
console.log(returnHi);

function returnHiTo(name) {
  return `Hi ${name}!`;
}

console.log(returnHiTo('John'));
