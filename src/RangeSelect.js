export default function RangeSelect({min = 0, max = 100, value, setValue}) {
	return (
		<input
			type="range"
			className="form-range"
			max={max}
			min={min}
			value={value}
			onChange={({target: {value}}) => setValue(value)}
		/>
	);
}