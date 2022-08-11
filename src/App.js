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
			<p className="largePrompt">{instructions}</p>

			<RandomOrRequirements></RandomOrRequirements>
			<Memorable></Memorable>
		</div>
	);
}

export default App;


function RandomOrRequirements() {

	const [state, setState] = useState({
		password: "",
		type: JSON.parse(localStorage.getItem('type')) || 'random',
		length1: JSON.parse(localStorage.getItem('length1')) || 12,
		uppercase: (JSON.parse(localStorage.getItem('uppercase')) === true || JSON.parse(localStorage.getItem('uppercase')) === null),
		lowercase: (JSON.parse(localStorage.getItem('lowercase')) === true || JSON.parse(localStorage.getItem('lowercase')) === null),
		numeric: (JSON.parse(localStorage.getItem('numeric')) === true || JSON.parse(localStorage.getItem('numeric')) === null),
		specialAll: (JSON.parse(localStorage.getItem('specialAll')) === true || JSON.parse(localStorage.getItem('specialAll')) === null),
		special1: (!(JSON.parse(localStorage.getItem('special1')) === false || JSON.parse(localStorage.getItem('special1')) === null)),
		special2: (!(JSON.parse(localStorage.getItem('special2')) === false || JSON.parse(localStorage.getItem('special2')) === null)),
		ambiguous: (JSON.parse(localStorage.getItem('ambiguous')) === true || JSON.parse(localStorage.getItem('ambiguous')) === null),
	});

	const {
		password,
		type,
		length1,
		uppercase,
		lowercase,
		numeric,
		specialAll,
		special1,
		special2,
		ambiguous,
	} = state;

	let defaultPassword = (type === "random") ? randomPass(length1) : requirementsPass(length1, state);
	useEffect(() => {
		for (const property in state) {
			if (property !== password) {
				if (state[property] !== JSON.parse(localStorage.getItem(property))) {
					localStorage.setItem(property, JSON.stringify(state[property]));
				}
			}
		}

	}, [type, length1, uppercase, lowercase, numeric, specialAll, special1, special2, ambiguous])


	const passwordLabel = (password === "") ? defaultPassword : password;
	const buttonLabel = 'Generate Password';
	const lengthPrompt = 'Number of characters: ';
	const categoryPrompt = 'Character Options';
	const specialChar1 = '!"#$%&\'()*+,-./';
	const specialChar2 = ':;<=>?@';

	function handleClick(event) {

		let newState = null;

		if (event.target.id === "generate") {
			if (type === 'random')
				newState = {...state, password: randomPass(length1)};
			else if (type === "requirements")
				newState = {...state, password: requirementsPass(length1, state)}
		} else if (event.target.id === "copy") {
			const textToCopy = passwordLabel;
			navigator.clipboard.writeText(textToCopy)
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
			newState = {...state, type: "requirements", uppercase: !uppercase, password: ""};
		else if (event.target.id === "lowercase")
			newState = {...state, type: "requirements", lowercase: !lowercase, password: ""};
		else if (event.target.id === "numeric")
			newState = {...state, type: "requirements", numeric: !numeric, password: ""};
		else if (event.target.id === "special")
			newState = (special1 || special2) ? {
				...state,
				type: "requirements",
				specialAll: !specialAll,
				password: ""
			} : {
				...state,
				type: "requirements",
				specialAll: !specialAll,
				special1: false,
				special2: false,
				password: ""
			};
		else if (event.target.id === "ambiguous")
			newState = {...state, type: "requirements", ambiguous: !ambiguous};
		else if (event.target.id === "length1" && event.target.value > 3)
			newState = {...state, length1: parseInt(event.target.value), password: ""};
		else if (event.target.value === "all")
			newState = {
				...state,
				type: "requirements",
				specialAll: true,
				special1: false,
				special2: false,
				password: ""
			};
		else if (event.target.value === "spec1")
			newState = {...state, type: "requirements", special1: true, special2: false, password: ""};
		else if (event.target.value === "spec2")
			newState = {...state, type: "requirements", special1: false, special2: true, password: ""};

		if (newState !== null)
			setState(newState);

		/*if (uppercase && lowercase && numeric && specialAll && !special1 && !special2 && ambiguous && type === "requirements") {
			console.log('hello');
			newState = {...state, type: "random"};
			setState(newState);
		}*/
	}

	return (
		<div>
			<p className="password">{passwordLabel}</p>

			<Button className="copyButton"
					label="Copy"
					id="copy"
					onClickButton={handleClick}
			>
			</Button>

			<CategoryChoices categoryChoicesClassName="categoryChoices" categoryClassName="categoryGroup1"
							 specialChoiceClassName="smallPrompt" length1Prompt={lengthPrompt}
							 prompt={categoryPrompt}
							 cbID1="uppercase" cbID2="lowercase" cbID3="numeric" cbID4="special" cbID5="ambiguous"
							 value1="all" value2="spec1" value3="spec2" value4={length1}
							 label1="Uppercase" label2="Lowercase" label3="Numeric" label4="Special" label5="All"
							 label6={specialChar1} label7={specialChar2} label8="Ambiguous"
							 textID1="uppercaseNum" textID2="lowercaseNum" textID3="numericNum" textID4="specialNum"
							 onChangeCategoryChoices={handleChange}
							 uppercase={uppercase} lowercase={lowercase} numeric={numeric} special={specialAll}
							 special1={special1} special2={special2} ambiguous={ambiguous}
			>
			</CategoryChoices>

			<Button className="generateButton"
					label={buttonLabel}
					id="generate"
					onClickButton={handleClick}
			>
			</Button>
		</div>
	);
}

function Memorable() {

	const [state, setState] = useState({
		password: "",
		length2: JSON.parse(localStorage.getItem('length')) || 4,
		separator: JSON.parse(localStorage.getItem('separator')) || ";"
	});

	const {
		password,
		length2,
		separator
	} = state;

	let defaultPassword = dicePass(length2, separator);

	useEffect(() => {
		for (const property in state) {
			if (property !== password) {
				if (state[property] !== JSON.parse(localStorage.getItem(property))) {
					localStorage.setItem(property, JSON.stringify(state[property]));
				}
			}
		}

	}, [length2, separator])

	const passwordLabel = (password === "") ? defaultPassword : password;
	const buttonLabel = 'Generate Password';
	const lengthPrompt = 'Number of words: ';
	const separatorPrompt = 'Separator Options';

	function handleClick(event) {

		let newState = null;

		if (event.target.id === "generate") {
			newState = {...state, password: dicePass(length2, separator)};
		} else if (event.target.id === "copy") {
			const textToCopy = passwordLabel;
			navigator.clipboard.writeText(textToCopy)
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
		else if (event.target.id === "length2" && event.target.value > 0)
			newState = {...state, length2: parseInt(event.target.value), password: ""};

		if (newState !== null)
			setState(newState);

	}

	return (
		<div>
			<p className="password">{passwordLabel}</p>

			<Button className="copyButton"
					label="Copy"
					id="copy"
					onClickButton={handleClick}
			>
			</Button>

			<form className="separatorInput">
				<form>
					<label className="smallPrompt">
						{lengthPrompt}
						<input
							className="length"
							type="number" value={length2} id="length2" onChange={handleChange}
						/>
					</label>
				</form>
				<p className="optionsHeading">{separatorPrompt}</p>
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
					label={buttonLabel}
					id="generate"
					onClickButton={handleClick}
			>
			</Button>
		</div>
	);
}

