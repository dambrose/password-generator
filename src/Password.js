import {useEffect, useState} from 'react';

const NO = 'no';
const YES = 'yes';
const ERROR = 'err';

export default function Password({password}) {

	const [copied, setCopied] = useState(NO);

	useEffect(() => setCopied(NO), [password]);

	function handleCopy() {
		navigator.clipboard.writeText(password)
			.then(() => setCopied(YES))
			.catch(err => setCopied(ERROR));
	}

	const icon = (() => {
		if (copied === NO) return 'clipboard';
		if (copied === YES) return 'clipboard-check';
		if (copied === ERROR) return 'exclamation-triangle';
	})();

	const color = (() => {
		if (copied === NO) return 'primary';
		if (copied === YES) return 'success';
		if (copied === ERROR) return 'danger';
	})();

	return (
		<div className="input-group mb-3 mt-2">
			<input
				onClick={e => e.target.select()}
				type="text" className="form-control text-break"
				readOnly
				value={password}
			/>
			<span
				title="Copy to Clipboard"
				onClick={handleCopy}
				className={`input-group-text text-bg-${color}`}
				style={{cursor: 'pointer'}}>
				<i className={`bi-${icon}`}/>
			</span>
		</div>
	);
}