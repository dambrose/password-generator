export default function Password({password}) {

	function handleCopy() {
		navigator.clipboard.writeText(password)
			.then(() => {
				console.log('successful copy');
			})
			.catch(err => {
				console.error(err);
			});
	}

	return (
		<div className="input-group mb-3 mt-2">
			<input type="text" className="form-control text-break" readOnly value={password}/>
			<span id="copy" onClick={handleCopy} className="input-group-text"><i className="bi-clipboard"/></span>
		</div>
	);
}