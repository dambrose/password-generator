import './App.css';
import {useEffect, useState} from "react";
import randomPass from './lib/randomPass';
import dicePass from './lib/dicePass';
import requirementsPass from './lib/requirementsPass';
import Button from './Button.js';
import CategoryChoices from './CategoryChoices';

function App() {


	localStorage.clear();

	const [state, setState] = useState({
		password1: "",
		password2: "",
		type: JSON.parse(localStorage.getItem('type')) || 'random',
		length1: JSON.parse(localStorage.getItem('length1')) || 12,
		length2: JSON.parse(localStorage.getItem('length2')) || 4,
		uppercase: (JSON.parse(localStorage.getItem('uppercase')) === true || JSON.parse(localStorage.getItem('uppercase')) === null),
		lowercase: (JSON.parse(localStorage.getItem('lowercase')) === true || JSON.parse(localStorage.getItem('lowercase')) === null),
		numeric: (JSON.parse(localStorage.getItem('numeric')) === true || JSON.parse(localStorage.getItem('numeric')) === null),
		specialAll: (JSON.parse(localStorage.getItem('specialAll')) === true || JSON.parse(localStorage.getItem('specialAll')) === null),
		special1: (!(JSON.parse(localStorage.getItem('special1')) === false || JSON.parse(localStorage.getItem('special1')) === null)),
		special2: (!(JSON.parse(localStorage.getItem('special2')) === false || JSON.parse(localStorage.getItem('special2')) === null)),
		ambiguous: (JSON.parse(localStorage.getItem('ambiguous')) === true || JSON.parse(localStorage.getItem('ambiguous')) === null),
		separator: JSON.parse(localStorage.getItem('separator')) || ";"
	});

	const [error, setError] = useState(false);

	const {
		password1,
		password2,
		type,
		length1,
		length2,
		uppercase,
		lowercase,
		numeric,
		specialAll,
		special1,
		special2,
		ambiguous,
		separator
	} = state;

	let defaultPassword1 = (type === "random") ? randomPass(length1) : requirementsPass(length1, state);
	/*console.log(defaultPassword1);*/

	useEffect(() => {
		dicePass(length2, separator)
			.then(pass => {
				setState({...state, password2: pass});
			})
			.catch(err => {
				console.error(err)
				setError(true);
			});
	}, [length2, separator])

	useEffect(() => {
		for (const property in state) {
			if (property !== password1 && property !== password2) {
				if (state[property] !== JSON.parse(localStorage.getItem(property))) {
					localStorage.setItem(property, JSON.stringify(state[property]));
				}
			}
		}

	}, [type, length1, length2, uppercase, lowercase, numeric, specialAll, special1, special2, ambiguous, separator])


	const title = 'Welcome to Password Generator!';
	const instructions = 'Click the button below to create a strong, secure, randomized or memorable password.';
	const passwordLabel1 = (password1 === "") ? defaultPassword1 : password1;
	const passwordLabel2 = password2;
	const buttonLabel = 'Generate Passwords';
	const length1Prompt = 'How long would you like your password to be?';
	const length2Prompt = 'How many words would you like to be in your password?';
	const separatorPrompt = 'Separator Options'; /*'If you would like a different special character to separate your words, please select it below. \n';*/
	const categoryPrompt = 'Password Options';
	const specialChar1 = '!"#$%&\'()*+,-./';
	const specialChar2 = ':;<=>?@';

	function handleClick(event) {

		let newState = null;

		if (event.target.id === "generate") {
			dicePass(length2, separator)
				.then(pass => {
					setState({...state, password2: pass});
				})
				.catch(err => {
					console.error(err);
				});

			if (type === 'random')
				newState = {...state, password: randomPass(length1)};
			else if (type === "requirements")
				newState = {...state, password1: requirementsPass(length1, state)}
		} else if (event.target.id === "copy1" || event.target.id === "copy2") {
			const textToCopy = (event.target.id === "copy1") ? passwordLabel1 : passwordLabel2;
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
			newState = {...state, type: "requirements", uppercase: !uppercase, password1: ""};
		else if (event.target.id === "lowercase")
			newState = {...state, type: "requirements", lowercase: !lowercase, password1: ""};
		else if (event.target.id === "numeric")
			newState = {...state, type: "requirements", numeric: !numeric, password1: ""};
		else if (event.target.id === "special")
			newState = (special1 || special2) ? {
				...state,
				type: "requirements",
				specialAll: !specialAll,
				password1: ""
			} : {
				...state,
				type: "requirements",
				specialAll: !specialAll,
				special1: false,
				special2: false,
				password1: ""
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
				password1: ""
			};
		else if (event.target.value === "spec1")
			newState = {...state, type: "requirements", special1: true, special2: false, password1: ""};
		else if (event.target.value === "spec2")
			newState = {...state, type: "requirements", special1: false, special2: true, password1: ""};
		else if (event.target.id === ";" || event.target.id === "-" || event.target.id === ":" || event.target.id === "+")
			newState = {...state, separator: event.target.id};
		else if (event.target.id === "length2" && event.target.value > 0)
			newState = {...state, length2: parseInt(event.target.value)};

		if (newState !== null)
			setState(newState);

		if (uppercase && lowercase && numeric && specialAll && !special1 && !special2 && ambiguous && type === "requirements") {
			newState = {...state, type: "random"};
			setState(newState);
		}
	}

	return (
		<div>
			{error && <div>An error occurred</div>}

			<header className="header">{title}</header>
			<p className="largePrompt">{instructions}</p>

			<p className="password">{passwordLabel1}</p>

			<Button className="copyButton"
					label="Copy"
					id="copy1"
					onClickButton={handleClick}
			>
			</Button>

			<form>
				<label className="smallPrompt">
					{length1Prompt}
					<input
						className="length"
						type="number" value={length1} id="length1" onChange={handleChange}
					/>
				</label>
			</form>
			<CategoryChoices categoryChoicesClassName="categoryChoices" categoryClassName="categoryGroup1"
							 specialChoiceClassName="smallPrompt"
							 prompt={categoryPrompt}
							 cbID1="uppercase" cbID2="lowercase" cbID3="numeric" cbID4="special" cbID5="ambiguous"
							 value1="all" value2="spec1" value3="spec2"
							 label1="Uppercase" label2="Lowercase" label3="Numeric" label4="Special" label5="All"
							 label6={specialChar1} label7={specialChar2} label8="Ambiguous"
							 textID1="uppercaseNum" textID2="lowercaseNum" textID3="numericNum" textID4="specialNum"
							 onChangeCategoryChoices={handleChange}
							 uppercase={uppercase} lowercase={lowercase} numeric={numeric} special={specialAll}
							 special1={special1} special2={special2} ambiguous={ambiguous}
			>
			</CategoryChoices>

			<p className="password">{passwordLabel2}</p>

			<Button className="copyButton"
					label="Copy"
					id="copy2"
					onClickButton={handleClick}
			>
			</Button>

			<form>
				<label className="smallPrompt">
					{length2Prompt}
					<input
						className="length"
						type="number" value={length2} id="length2" onChange={handleChange}
					/>
				</label>
			</form>
			<form className="separatorInput">
				<p className="optionsHeading">{separatorPrompt}</p>
				<label>
					<input className="separatorInput" type="checkbox" id=";" onChange={handleChange}
						   checked={separator === ";"}/>
					;
					<input className="separatorInput" type="checkbox" id="-" onChange={handleChange}
						   checked={separator === "-"}/>
					-
					<input className="separatorInput" type="checkbox" id=":" onChange={handleChange}
						   checked={separator === ":"}/>
					:
					<input className="separatorInput" type="checkbox" id="+" onChange={handleChange}
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

export default App;

