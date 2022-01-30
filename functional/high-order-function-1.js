// Curring 

function finalPrice(tax, price) {
  return price * (1 + tax);
}

console.log(finalPrice(0.0875, 25.1));

//

function finalPrice2(tax) {
  return function (price) {
    return price * (1 + tax);
  };
}

console.log(finalPrice2(0.0875)(25.1));
//

function finalPrice3(tax) {
  return function (price) {
    return price * (1 + tax);
  };
}
const nycFinalPrice = finalPrice3(0.0875);

console.log(nycFinalPrice(0.0875));
