import {useEffect, useState} from 'react';
import randomPass from './lib/randomPass';
import CategoryChoices from './CategoryChoices';
import Button from './Button';

export default function Random() {

	const [state, setState] = useState({
		password: randomPass(JSON.parse(localStorage.getItem('randomLength')) || 12),
		type: JSON.parse(localStorage.getItem('type')) || 'random',
		length: JSON.parse(localStorage.getItem('randomLength')) || 12,
		uppercase: (JSON.parse(localStorage.getItem('uppercase')) === true || JSON.parse(localStorage.getItem('uppercase')) === null),
		lowercase: (JSON.parse(localStorage.getItem('lowercase')) === true || JSON.parse(localStorage.getItem('lowercase')) === null),
		numeric: (JSON.parse(localStorage.getItem('numeric')) === true || JSON.parse(localStorage.getItem('numeric')) === null),
		specialAll: (JSON.parse(localStorage.getItem('specialAll')) === true || JSON.parse(localStorage.getItem('specialAll')) === null),
		special1: (!(JSON.parse(localStorage.getItem('special1')) === false || JSON.parse(localStorage.getItem('special1')) === null)),
		special2: (!(JSON.parse(localStorage.getItem('special2')) === false || JSON.parse(localStorage.getItem('special2')) === null)),
		ambiguous: (JSON.parse(localStorage.getItem('ambiguous')) === true || JSON.parse(localStorage.getItem('ambiguous')) === null)
	});

	const {
		password,
		type,
		length,
		uppercase,
		lowercase,
		numeric,
		specialAll,
		special1,
		special2,
		ambiguous
	} = state;

	useEffect(() => {
		for (const property in state) {
			if (property !== 'password') {
				if (state[property] !== JSON.parse(localStorage.getItem(property))) {
					(property === 'length') ? localStorage.setItem('randomLength', JSON.stringify(state[property])) : localStorage.setItem(property, JSON.stringify(state[property]));
				}
			}
		}

	}, [type, length, uppercase, lowercase, numeric, specialAll, special1, special2, ambiguous]);

	useEffect(() => {
		if (type === 'requirements') {
			setState({...state, password: randomPass(length, state)});
		}
	}, []);

	function handleCopy() {
		navigator.clipboard.writeText(password)
			.then(() => {
				console.log('successful copy');
			})
			.catch(err => {
				console.error(err);
			});
	}

	function handleClick() {
		setState({...state, password: randomPass(length, state)});
	}

	function handleChange(event) {

		let newState = null;

		if (event.target.id === 'uppercase')
			newState = {...state, type: 'requirements', uppercase: !uppercase};
		else if (event.target.id === 'lowercase')
			newState = {...state, type: 'requirements', lowercase: !lowercase};
		else if (event.target.id === 'numeric')
			newState = {...state, type: 'requirements', numeric: !numeric};
		else if (event.target.id === 'special')
			newState = (special1 || special2) ? {
				...state,
				type: 'requirements',
				specialAll: !specialAll
			} : {
				...state,
				type: 'requirements',
				specialAll: !specialAll,
				special1: false,
				special2: false
			};
		else if (event.target.id === 'ambiguous')
			newState = {...state, type: 'requirements', ambiguous: !ambiguous};
		else if (event.target.value === 'all')
			newState = {
				...state,
				type: 'requirements',
				specialAll: true,
				special1: false,
				special2: false
			};
		else if (event.target.value === 'spec1')
			newState = {...state, type: 'requirements', special1: true, special2: false};
		else if (event.target.value === 'spec2')
			newState = {...state, type: 'requirements', special1: false, special2: true};

		if (newState !== null)
			setState(newState);
	}

	return (
		<div>
			<div className="input-group mb-3 mt-2">
				<input type="text" className="form-control" value={password}/>
				<span id="copy" onClick={handleCopy} className="input-group-text"><i className="bi-clipboard"/></span>
			</div>

			<CategoryChoices
				value1="all" value2="spec1" value3="spec2" value4={length}
				onChangeCategoryChoices={handleChange} setState={setState}
				uppercase={uppercase} lowercase={lowercase} numeric={numeric} special={specialAll}
				special1={special1} special2={special2} ambiguous={ambiguous} length={length} state={state}

			/>

			<Button id="generate" onClickButton={handleClick}>Generate Password</Button>
		</div>
	);
}
