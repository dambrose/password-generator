import './App.css';
import {useEffect, useState} from "react";
import randomPass from './lib/randomPass';
import dicePass from './lib/dicePass';
import requirementsPass from './lib/requirementsPass';
import Button from './Button.js';
import CategoryChoices from './CategoryChoices';


function App() {

	/*localStorage.clear();*/

	const title = 'Welcome to Password Generator!';
	const instructions = 'Click the button below to create strong, secure, randomized and memorable passwords.';

	return (
		<div className="root">
			<header className="header">{title}</header>
			{/*<p className="largePrompt">{instructions}</p>*/}

			<RandomOrRequirements></RandomOrRequirements>
			<Memorable></Memorable>
		</div>
	);
}

export default App;


function RandomOrRequirements() {

	const initialState = {
		password: "",
		type: JSON.parse(localStorage.getItem('type')) || 'random',
		length: JSON.parse(localStorage.getItem('randomLength')) || 12,
		uppercase: (JSON.parse(localStorage.getItem('uppercase')) === true || JSON.parse(localStorage.getItem('uppercase')) === null),
		lowercase: (JSON.parse(localStorage.getItem('lowercase')) === true || JSON.parse(localStorage.getItem('lowercase')) === null),
		numeric: (JSON.parse(localStorage.getItem('numeric')) === true || JSON.parse(localStorage.getItem('numeric')) === null),
		specialAll: (JSON.parse(localStorage.getItem('specialAll')) === true || JSON.parse(localStorage.getItem('specialAll')) === null),
		special1: (!(JSON.parse(localStorage.getItem('special1')) === false || JSON.parse(localStorage.getItem('special1')) === null)),
		special2: (!(JSON.parse(localStorage.getItem('special2')) === false || JSON.parse(localStorage.getItem('special2')) === null)),
		ambiguous: (JSON.parse(localStorage.getItem('ambiguous')) === true || JSON.parse(localStorage.getItem('ambiguous')) === null)
	}


	const [state, setState] = useState({
		password: (initialState.type === "random") ? randomPass(JSON.parse(localStorage.getItem('randomLength')) || 12) : requirementsPass(JSON.parse(localStorage.getItem('randomLength')) || 12, initialState),
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
		ambiguous,
	} = state;

	useEffect(() => {
		for (const property in state) {
			if (property !== "password") {
				if (state[property] !== JSON.parse(localStorage.getItem(property))) {
					(property === "length") ? localStorage.setItem('randomLength', JSON.stringify(state[property])) : localStorage.setItem(property, JSON.stringify(state[property]));
				}
			}
		}

	}, [type, length, uppercase, lowercase, numeric, specialAll, special1, special2, ambiguous])

	function handleClick(event) {

		let newState = null;

		if (event.target.id === "generate") {
			if (type === 'random')
				newState = {...state, password: randomPass(length)};
			else if (type === "requirements")
				newState = {...state, password: requirementsPass(length, state)}
		} else if (event.target.id === "copy") {
			navigator.clipboard.writeText(password)
				.then(() => {
					console.log('successful copy');
				})
				.catch(err => {
					console.error(err)
				});
		}

		if (newState !== null)
			setState(newState);
	}

	function handleChange(event) {

		let newState = null;

		if (event.target.id === "uppercase")
			newState = {...state, type: "requirements", uppercase: !uppercase};
		else if (event.target.id === "lowercase")
			newState = {...state, type: "requirements", lowercase: !lowercase};
		else if (event.target.id === "numeric")
			newState = {...state, type: "requirements", numeric: !numeric};
		else if (event.target.id === "special")
			newState = (special1 || special2) ? {
				...state,
				type: "requirements",
				specialAll: !specialAll,
			} : {
				...state,
				type: "requirements",
				specialAll: !specialAll,
				special1: false,
				special2: false,
			};
		else if (event.target.id === "ambiguous")
			newState = {...state, type: "requirements", ambiguous: !ambiguous};
		else if (event.target.id === "length" && event.target.value > 3)
			newState = {...state, length: parseInt(event.target.value)};
		else if (event.target.value === "all")
			newState = {
				...state,
				type: "requirements",
				specialAll: true,
				special1: false,
				special2: false,
			};
		else if (event.target.value === "spec1")
			newState = {...state, type: "requirements", special1: true, special2: false};
		else if (event.target.value === "spec2")
			newState = {...state, type: "requirements", special1: false, special2: true};

		if (newState !== null)
			setState(newState);
	}

	return (
		<div>
			<p className="password">{password}</p>

			<Button className="copyButton"
					label="Copy"
					id="copy"
					onClickButton={handleClick}
			>
			</Button>

			<CategoryChoices categoryChoicesClassName="passwordOptions" categoryClassName="categoryGroup1"
							 specialChoiceClassName="smallPrompt"
							 lengthID="length" cbID1="uppercase" cbID2="lowercase" cbID3="numeric" cbID4="special"
							 cbID5="ambiguous"
							 value1="all" value2="spec1" value3="spec2" value4={length}
							 textID1="uppercaseNum" textID2="lowercaseNum" textID3="numericNum" textID4="specialNum"
							 onChangeCategoryChoices={handleChange}
							 uppercase={uppercase} lowercase={lowercase} numeric={numeric} special={specialAll}
							 special1={special1} special2={special2} ambiguous={ambiguous}
			>
			</CategoryChoices>

			<Button className="generateButton"
					label="Generate Password"
					id="generate"
					onClickButton={handleClick}
			>
			</Button>
		</div>
	);
}

function Memorable() {

	const [state, setState] = useState({
		password: dicePass(JSON.parse(localStorage.getItem('memorableLength')) || 4, JSON.parse(localStorage.getItem('separator')) || ";"),
		length: JSON.parse(localStorage.getItem('memorableLength')) || 4,
		separator: JSON.parse(localStorage.getItem('separator')) || ";"
	});

	const {
		password,
		length,
		separator
	} = state;

	useEffect(() => {
		for (const property in state) {
			if (property !== "password") {
				if (state[property] !== JSON.parse(localStorage.getItem(property))) {
					(property === "length") ? localStorage.setItem('memorableLength', state[property]) : localStorage.setItem(property, JSON.stringify(state[property]));
				}
			}
		}

	}, [length, separator])

	function handleClick(event) {

		let newState = null;

		if (event.target.id === "generate") {
			newState = {...state, password: dicePass(length, separator)};
		} else if (event.target.id === "copy") {
			navigator.clipboard.writeText(password)
				.then(() => {
					console.log('successful copy');
				})
				.catch(err => {
					console.error(err)
				});
		}

		if (newState !== null)
			setState(newState);
	}

	function handleChange(event) {

		let newState = null;

		if (event.target.id === ";" || event.target.id === "-" || event.target.id === ":" || event.target.id === "+")
			newState = {...state, separator: event.target.id};
		else if (event.target.id === "length" && event.target.value > 0)
			newState = {...state, length: parseInt(event.target.value)};

		if (newState !== null)
			setState(newState);

	}

	return (
		<div>
			<p className="password">{password}</p>

			<Button className="copyButton"
					label="Copy"
					id="copy"
					onClickButton={handleClick}
			>
			</Button>

			<form className="passwordOptions">
				<form>
					<label className="smallPrompt">
						Number of words:
						<input
							className="length"
							type="number" value={length} id="length" onChange={handleChange}
						/>
					</label>
				</form>
				<p className="optionsHeading">Separator Options</p>
				<label>
					<input type="checkbox" id=";" onChange={handleChange}
						   checked={separator === ";"}/>
					;
					<input className="separator" type="checkbox" id="-" onChange={handleChange}
						   checked={separator === "-"}/>
					-
					<input className="separator" type="checkbox" id=":" onChange={handleChange}
						   checked={separator === ":"}/>
					:
					<input className="separator" type="checkbox" id="+" onChange={handleChange}
						   checked={separator === "+"}/>
					+
				</label>
			</form>

			<Button className="generateButton"
					label="Generate Password"
					id="generate"
					onClickButton={handleClick}
			>
			</Button>
		</div>
	);
}

