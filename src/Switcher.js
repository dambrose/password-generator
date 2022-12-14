import {useState} from 'react';

export default function Switcher({items}) {

	const [index, setIndex] = useState(0);

	const {Component} = items[index];

	const handleClick = i => () => {
		setIndex(i);
		document.activeElement.blur();
	};

	return (
		<div>
			<div className="btn-group d-flex justify-content-center">
				{items.map(({title}, i) => (
					<button
						key={i}
						className={`btn btn-${index === i ? 'primary' : 'outline-secondary'}`}
						onClick={handleClick(i)}
					>
						{title}
					</button>
				))}
			</div>
			<Component/>
		</div>
	);

}