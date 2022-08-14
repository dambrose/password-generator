import {useEffect, useState} from 'react';
import dicePass, {DEFAULT_OPTIONS, SEPARATORS} from './lib/dicePass';
import RangeSelect from './RangeSelect';
import Button from './Button';

export default function Memorable() {
	const savedOptions = {
		...DEFAULT_OPTIONS,
		...JSON.parse(localStorage.getItem('MEMORABLE_OPTIONS') ?? '{}')
	};

	const [password, setPassword] = useState(dicePass(savedOptions));
	const [options, setOptions] = useState(savedOptions);

	const {
		length,
		separator
	} = options;

	useEffect(() => {
		localStorage.setItem('MEMORABLE_OPTIONS', JSON.stringify({
			length,
			separator
		}));
	}, [length, separator]);

	function handleCopy() {
		navigator.clipboard.writeText(password)
			.then(() => {
				console.log('successful copy');
			})
			.catch(err => {
				console.error(err);
			});
	}

	const handleGenerate = () => setPassword(dicePass(options));

	const handleLength = len => {
		const newOptions = {...options, length: parseInt(len)};
		setPassword(dicePass(newOptions));
		setOptions(newOptions);
	};

	const handleSeparator = separator => () => {
		const newOptions = {
			...options,
			separator
		};
		setPassword(dicePass(newOptions));
		setOptions(newOptions);
	};

	return (
		<div>
			<div className="input-group mb-3 mt-2">
				<input type="text" className="form-control text-break" value={password}/>
				<span id="copy" onClick={handleCopy} className="input-group-text"><i className="bi-clipboard"/></span>
			</div>
			<div className="card border-primary mb-3">
				<div className="card-body text-primary">
					<div className="h5 card-title text-center">Options</div>
					<div className="d-flex gap-2">
						<div>Length</div>
						<RangeSelect value={length} setValue={handleLength} max={6} min={3}/>
						<div>{length}</div>
					</div>
					<div className="d-flex gap-2">
						<div>Separator</div>
						<div>
							{SEPARATORS.map(char => (
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="radio"
										name={char}
										onChange={handleSeparator(char)}
										checked={separator === char}
									/>
									<label className="form-check-label" htmlFor={char}>{char}</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="d-grid gap-2">
				<Button onClick={handleGenerate}>Generate Password</Button>
			</div>
		</div>
	);
}

