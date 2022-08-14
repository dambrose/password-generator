import {useEffect, useState} from 'react';
import dicePass from './lib/dicePass';
import RangeSelect from './RangeSelect';
import Button from './Button';


export default function Memorable() {

	const [state, setState] = useState({
		password: dicePass(JSON.parse(localStorage.getItem('memorableLength')) || 4, JSON.parse(localStorage.getItem('separator')) || ';'),
		length: JSON.parse(localStorage.getItem('memorableLength')) || 4,
		separator: JSON.parse(localStorage.getItem('separator')) || ';'
	});

	const {
		password,
		length,
		separator
	} = state;

	useEffect(() => {
		for (const property in state) {
			if (property !== 'password') {
				if (state[property] !== JSON.parse(localStorage.getItem(property))) {
					(property === 'length') ? localStorage.setItem('memorableLength', state[property]) : localStorage.setItem(property, JSON.stringify(state[property]));
				}
			}
		}

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

	function handleClick(event) {
		setState({...state, password: dicePass(length, separator)});
	}

	function handleChange(event) {

		let newState = null;

		if (event.target.id === ';' || event.target.id === '-' || event.target.id === ':' || event.target.id === '+')
			newState = {...state, separator: event.target.id};

		if (newState !== null)
			setState(newState);

	}

	return (
		<div>

			<div className="input-group mb-3 mt-2">
				<input type="text" className="form-control text-break" value={password}/>
				<span id="copy" onClick={handleCopy} className="input-group-text"><i className="bi-clipboard"/></span>
			</div>

			<div className="card border-primary mb-3">
				<div className="card-body text-primary">
					<RangeSelect value={length} setValue={num => setState({...state, length: num})} max={64} min={4}/>
					<input readOnly value={length}/>
					<h5 className="card-title text-center">Separator Options</h5>
					<div className="text-center">
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id=";" onChange={handleChange}
							       checked={separator === ';'}/>
							<label className="form-check-label" htmlFor=";">
								;
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="-" onChange={handleChange}
							       checked={separator === '-'}/>
							<label className="form-check-label" htmlFor="-">
								-
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id=":" onChange={handleChange}
							       checked={separator === ':'}/>
							<label className="form-check-label" htmlFor=":">
								:
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="+" onChange={handleChange}
							       checked={separator === '+'}/>
							<label className="form-check-label" htmlFor="+">
								+
							</label>
						</div>
					</div>
				</div>
			</div>

			<Button id="generate" onClickButton={handleClick}>Generate Password</Button>
		</div>
	);
}

