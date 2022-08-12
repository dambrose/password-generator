import {useRef} from 'react';

export default function RangeSelect({min = 0, max = 100, value, setValue}) {
	const id = useRef(`range_${(Math.random() * 10000000).toFixed(0)}`);

	return (
		<>
			<label htmlFor={id.current} className="form-label">Example range</label>
			<input
				id={id.current}
				type="range"
				className="form-range"
				max={max}
				min={min}
				value={value}
				onChange={({target: {value}}) => setValue(value)}
			/>
		</>
	);
}