const randomPass = require('./src/lib/randomPass');
const dicePass = require('./src/lib/dicePass');

console.log('Random:');
console.log(randomPass());

console.log('');

console.log('Dice:');
console.log(dicePass());