import './App.css';
import randomPass from './lib/randomPass';
import dicePass from './lib/dicePass';
import requirementsPass from './lib/requirementsPass';

function App() {
	return (
		<div>
			<p>{randomPass()}</p>
			<p>{dicePass()}</p>
		</div>
	);
}

export default App;

