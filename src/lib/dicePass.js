import wordList from './wordlist';

const DEFAULT_OPTIONS = {
	length: 4,
	separator: ';'
};

const SEPARATORS = [';', '-', ':', '+'];

export {DEFAULT_OPTIONS, SEPARATORS};

export default function dicePass(options = {}) {

	options = {
		...DEFAULT_OPTIONS,
		...options
	};

	const {length, separator} = options;

	return new Array(parseInt(length)).fill(null).map(() => {
		const key = new Array(5).fill(null).map(() => Math.round(Math.random() * 5) + 1).join('');
		const {word} = wordList.find(l => l.key === key);
		return word;
	}).join(separator);
};