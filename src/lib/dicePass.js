import wordList from './wordlist';

const DEFAULT_OPTIONS = {
	length: 4,
	separator: ';'
};

const SEPARATORS = [';', '-', ':', '+'];

const dicePass = (options = {}) => {

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

export default dicePass;
export {DEFAULT_OPTIONS, SEPARATORS};