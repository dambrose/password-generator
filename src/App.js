import Switcher from './Switcher';
import Random from './Random';
import Memorable from './Memorable';

export default function App() {
	return (
		<div className="root">
			<header className="d-flex justify-content-center fs-3">
				<h1 className="h2">Password Generator</h1>
			</header>
			<div className="d-flex justify-content-center m-3">
				<Switcher items={[
					{title: 'Random', Component: Random},
					{title: 'Memorable', Component: Memorable}
				]}/>
			</div>
		</div>
	);
}