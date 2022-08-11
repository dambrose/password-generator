import wordList from './wordlist';

const dicePass = (length, separator) => new Array(parseInt(length)).fill(null).map(() => {
	const key = new Array(5).fill(null).map(() => Math.round(Math.random() * 5) + 1).join('');
	const {word} = wordList.find(l => l.key === key);
	return word;
}).join(';');

export default dicePass;