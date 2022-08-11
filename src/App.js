import './App.css';
import randomPass from './lib/randomPass';
import dicePass from './lib/dicePass';

function App() {
	return (
		<div>
			<p>{randomPass()}</p>
			<p>{dicePass()}</p>
		</div>
	);
}

export default App;
