import RangeSelect from './RangeSelect';
import {useState} from 'react';

export default function RangeSelectTest() {

	const [length, setLength] = useState(8);

	return (
		<>
			<RangeSelect value={length} setValue={setLength} max={64} min={4}/>
			<input readOnly value={length}/>
		</>
	);
}