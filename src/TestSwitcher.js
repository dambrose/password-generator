import Switcher from './Switcher';

export default function TestSwitcher() {
	const items = [
		{title: 'one', Component: Comp1},
		{title: 'two', Component: Comp2}
	];

	return (
		<div className="d-flex justify-content-center">
			<Switcher items={items}/>

			<div className="input-group mb-3">
				<input type="text" className="form-control" value={'asdfasdf'}/>
				<span onClick={() => {
					alert('here');
				}} className="input-group-text"><i className="bi-clipboard"/></span>
			</div>
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