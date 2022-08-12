import Switcher from './Switcher';

export default function TestSwitcher() {
	const items = [
		{title: 'one', Component: Comp1},
		{title: 'two', Component: Comp2}
	];

	return (
		<div className="d-flex justify-content-center">
			<Switcher items={items}/>
		</div>
	);
}


function Comp1() {
	return (
		<div>1</div>
	);
}

function Comp2() {
	return (
		<div>2</div>
	);
}