//https://codesandbox.io/s/animated-3d-dice-roll-forked-f4fpmy?file=/index.html

const {readFileSync} = require('fs');
const {join} = require('path');

const wordlist = readFileSync(join(__dirname, 'wordlist.txt'), 'utf-8').split('\n').map(line => line.split('\t')).map(([key, word]) => ({
	key,
	word
}));

module.exports = () => new Array(5).fill(null).map(() => {
	const key = new Array(5).fill(null).map(() => Math.round(Math.random() * 5) + 1).join('');
	const {word} = wordlist.find(l => l.key === key);
	return word;
}).join(';');