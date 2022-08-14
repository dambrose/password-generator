import Switcher from './Switcher';
import Random from './Random';
import Memorable from './Memorable';

export default function App() {

	const title = 'Password Generator!';
	const items = [
		{title: 'Random', Component: Random},
		{title: 'Memorable', Component: Memorable}
	];

	return (
		<div className="root">
			<header className="d-flex justify-content-center fs-3">{title}</header>
			<div className="d-flex justify-content-center m-3">
				<Switcher items={items}/>
			</div>
		</div>
	);
}