const randomPass = (length) => new Array(parseInt(length)).fill().map(() => String.fromCharCode(33 + Math.round(Math.random() * (126 - 33)))).join('');
export default randomPass;