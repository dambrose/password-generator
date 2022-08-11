const randomPass = () => new Array(12 + Math.round(Math.random() * 25)).fill().map(() => String.fromCharCode(33 + Math.round(Math.random() * (126 - 33)))).join('');
export default randomPass;