import {useEffect, useState} from 'react';
import randomPass, {DEFAULT_OPTIONS, SPECIAL1, SPECIAL2} from './lib/randomPass';
import Button from './Button';
import RangeSelect from './RangeSelect';

export default function Random() {
	const savedOptions = {
		...DEFAULT_OPTIONS,
		...JSON.parse(localStorage.getItem('RANDOM_OPTIONS') ?? '{}')
	};

	const [password, setPassword] = useState(randomPass(savedOptions));
	const [options, setOptions] = useState(savedOptions);

	const {
		length,
		uppercase,
		lowercase,
		numeric,
		special1,
		special2,
		ambiguous
	} = options;

	useEffect(() => {
		localStorage.setItem('RANDOM_OPTIONS', JSON.stringify({
			length,
			uppercase,
			lowercase,
			numeric,
			special1,
			special2,
			ambiguous
		}));
	}, [length, uppercase, lowercase, numeric, special1, special2, ambiguous]);

	function handleCopy() {
		navigator.clipboard.writeText(password)
			.then(() => {
				console.log('successful copy');
			})
			.catch(err => {
				console.error(err);
			});
	}

	const handleGenerate = () => setPassword(randomPass(options));

	const handleCheckbox = name => () => {
		const newOptions = {
			...options,
			[name]: !options[name]
		};
		setPassword(randomPass(newOptions));
		setOptions(newOptions);
	};

	const handleLength = len => {
		const newOptions = {...options, length: parseInt(len)};
		setPassword(randomPass(newOptions));
		setOptions(newOptions);
	};

	return (
		<div>
			<div className="input-group mb-3 mt-2">
				<input readOnly type="text" className="form-control" value={password}/>
				<span onClick={handleCopy} className="input-group-text"><i className="bi-clipboard"/></span>
			</div>
			<div className="card border-primary mb-3">
				<div className="card-body text-primary">
					<div className="h5 card-title text-center">Options</div>
					<div className="d-flex gap-2">
						<label htmlFor="customRange3" className="form-label">Length</label>
						<RangeSelect value={length} setValue={handleLength} max={64} min={4}/>
						<div>{length}</div>
					</div>

					<p className="smallFont text-center"></p>
					<div className="form-check">
						<input className="form-check-input" type="checkbox" name="lowercase"
						       onChange={handleCheckbox('lowercase')} checked={lowercase}/>
						<label className="form-check-label" htmlFor="lowercase">
							Lowercase
						</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="checkbox" name="uppercase"
						       onChange={handleCheckbox('uppercase')} checked={uppercase}/>
						<label className="form-check-label" htmlFor="uppercase">
							Uppercase
						</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="checkbox" name="numeric"
						       onChange={handleCheckbox('numeric')} checked={numeric}/>
						<label className="form-check-label" htmlFor="numeric">
							Numeric
						</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="checkbox" id="ambiguous"
						       onChange={handleCheckbox('ambiguous')} checked={ambiguous}/>
						<label className="form-check-label" htmlFor="ambiguous">
							Ambiguous ("O", "0", "1", "I", etc.)
						</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="checkbox" name="special1"
						       onChange={handleCheckbox('special1')} checked={special1}/>
						<label className="form-check-label" htmlFor="special1">
							{SPECIAL1}
						</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="checkbox" name="special2"
						       onChange={handleCheckbox('special2')} checked={special2}/>
						<label className="form-check-label" htmlFor="special2">
							{SPECIAL2}
						</label>
					</div>
				</div>
			</div>
			<div className="d-grid gap-2">
				<Button onClick={handleGenerate}>Generate Password</Button>
			</div>
		</div>
	);
}
