const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL1 = '!"#$%&\'()*+,-./';
const SPECIAL2 = ':;<=>?@';
const AMBIGUOUS = 'l1IioO0';

const DEFAULT_OPTIONS = {
	length: 12,
	uppercase: true,
	lowercase: true,
	numeric: true,
	special1: true,
	special2: true,
	ambiguous: false
};

export {SPECIAL1, SPECIAL2, DEFAULT_OPTIONS};

export default function (options = {}) {

	options = {
		...DEFAULT_OPTIONS,
		...options
	};

	const {
		length,
		uppercase,
		lowercase,
		numeric,
		special1,
		special2,
		ambiguous
	} = options;

	const chars = ((lowercase ? ALPHA : '') +
		(uppercase ? ALPHA.toUpperCase() : '') +
		(numeric ? NUMBERS : '') +
		(special1 ? SPECIAL1 : '') +
		(special2 ? SPECIAL2 : ''))
		.split('')
		.filter(char => ambiguous || !new RegExp(`[${AMBIGUOUS}]`).test(char));

	return new Array(length).fill(null).map(() => {
		const randIndex = Math.round(Math.random() * chars.length);
		return chars[randIndex];
	}).join('');

}