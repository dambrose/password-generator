import randomPass from './randomPass';

describe('randomPass', () => {
	test('length', () => {
		expect(randomPass({length: 10}).length).toBe(10);
	});
});