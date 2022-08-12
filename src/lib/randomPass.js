const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL1 = '!"#$%&\'()*+,-./';
const SPECIAL2 = ':;<=>?@';

export default function (length, {
	lowercase = true,
	uppercase = true,
	numeric = true,
	specialAll = true,
	special1 = true,
	special2 = true,
	ambiguous = false
} = {}) {

	const chars = (lowercase ? ALPHA : '') +
		(uppercase ? ALPHA.toUpperCase() : '') +
		(numeric ? NUMBERS : '') +
		(specialAll || special1 ? SPECIAL1 : '') +
		(specialAll || special2 ? SPECIAL2 : '')
			.split('')
			.filter(char => !ambiguous || !/l1IoO0/.test(char));

	return new Array(length).fill(null).map(() => {
		const randIndex = Math.random() * chars.length;
		return chars[randIndex];
	}).join('');

}