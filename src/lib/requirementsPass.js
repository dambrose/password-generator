function getReplacementCodeRange(code) {

    if (code >= 65 && code <= 90)
        return [65, 90];
    else if (code >= 97 && code <= 122)
        return [97, 122];
    else if (code >= 48 && code <= 57)
        return [48, 57];
    else {
        let random = 1 + Math.round(Math.random());
        return (random === 1) ? [33, 47] : [58, 64];
    }
}

export function checkRepeats(password) {
    const arr = password.split('');
    let count;
    const indexes = [];

    for (let i = 0; i < password.length; i++) {
        count = 0;
        indexes.length = 0;
        for (let j = 0; j < password.length; j++) {
            if (arr[j] === arr[i]) {
                count++
                indexes.push(j);
            }
        }
        if (count >= 4) {
            const numToReplace = count - 3;
            let x = indexes.length - 1;
            const code = password.charCodeAt(i);

            const codeRange = getReplacementCodeRange(code);

            for (let j = 1; j <= numToReplace; j++) {
                const replace = String.fromCharCode(codeRange[0] + Math.round(Math.random() * (codeRange[1] - codeRange[0])));
                arr[indexes[x]] = replace;
                x--;
            }
        }
    }
    return arr.join('');
}

export function checkUnique(password) {
    const arr = password.split('');
    const repeats = [];
    const replacements = [];
    let unique = 0;
    let repeat = false;

    for (let i = 0; i < password.length; i++) {
        repeat = false;
        for (let j = i + 1; j < password.length; j++) {
            if (j !== i && arr[j] === arr[i]) {
                repeats.push(arr[j]);
                repeat = true;
            }
        }
        if (!repeat)
            unique++;
    }

    if (unique >= 5)
        return arr.join('');

    for (let x = 0; x < (5 - unique); x++) {
        const code = password.charCodeAt(arr.indexOf(repeats[x]));

        const codeRange = getReplacementCodeRange(code);

        let replacement = String.fromCharCode(codeRange[0] + Math.round(Math.random() * (codeRange[1] - codeRange[0])));
        while (replacement === repeats[x] || replacements.includes(replacement))
            replacement = String.fromCharCode(codeRange[0] + Math.round(Math.random() * (codeRange[1] - codeRange[0])));

        replacements.push(replacement);
        arr[arr.indexOf(repeats[x])] = replacement;
    }

    return arr.join('');
}

function shiftRight(arr, start, end) {
    const arr2 = arr.slice();
    const temp = arr2[start];

    for (let x = start; x > end; x--)
        arr2[x] = arr2[x - 1];
    arr2[end] = temp;

    return arr2;
}

function shiftLeft(arr, start, end) {
    const arr2 = arr.slice();
    const temp = arr2[start];

    for (let x = start; x < end; x++)
        arr2[x] = arr2[x + 1];
    arr2[end] = temp;

    return arr2;
}

export function checkNumSeq(password) {
    let arr = password.split('');
    let count = 0;

    for (let i = 0; i < password.length; i++) {
        count = (/\d/.test(arr[i])) ? (count + 1) : 0;

        if (count === 4) {
            if (!(/\d/.test(arr[0])))
                arr = shiftRight(arr, i, 0);
            else if (!(/\d/.test(arr[arr.length - 1]))) {
                arr = shiftLeft(arr, i, password.length - 1);
                i--;
            } else {
                let numOther = 0;
                let j = 0;

                while (numOther !== 2 && j < password.length) {
                    numOther = (!(/\d/.test(arr[j]))) ? (numOther + 1) : 0;
                    j++;
                }
                if (numOther === 2) {
                    if ((j - 1) < i)
                        arr = shiftRight(arr, i, j - 1);
                    else {
                        arr = shiftLeft(arr, i, j - 2);
                        i--;
                    }
                } else {
                    let numSeq = 0;
                    let seqFound = false;
                    let x = 0;

                    while (x < password.length && !seqFound) {
                        (/\d/.test(arr[x])) ? numSeq++ : (numSeq <= 2) ? seqFound = true : numSeq = 0;
                        x++;
                    }
                    if (seqFound)
                        arr = shiftRight(arr, i, x - 1);
                }
            }
            count = 3;
        }
    }
    return arr.join('');
}

function getPossibleCharacters(passObj) {
    const characters = [];
    let index = 0;

    function addCharacters(start, end) {
        for (let i = start; i <= end; i++) {
            characters[index] = String.fromCharCode(i);
            index++;
        }
    }

    if (passObj.uppercase)
        addCharacters(65, 90);
    if (passObj.lowercase)
        addCharacters(97, 122);
    if (passObj.numeric)
        addCharacters(48, 57);
    if (passObj.specialAll && !passObj.special1 && !passObj.special2) {
        addCharacters(33, 47);
        addCharacters(58, 64);
    }
    if (passObj.special1 && passObj.specialAll)
        addCharacters(33, 47);
    if (passObj.special2 && passObj.specialAll)
        addCharacters(58, 64);
    if (!passObj.ambiguous) {
        const arr = ['l', '1', 'I', 'o', 'O', "0"];
        for (let i = 0; i < arr.length; i++) {
            if (characters.includes(arr[i])) {
                const remove = characters.indexOf(arr[i]);
                characters.splice(remove, 1);
            }
        }
    }

    return characters;
}

function getPassword(characters, length) {
    const arr = characters.slice();
    let password = "";

    for (let i = 1; i <= length; i++)
        password += arr[Math.round(Math.random() * (arr.length - 1))];

    return password;
}

function checkCategoriesPresent(password, passObj) {
    const arr = password.split('');
    const replaced = [];
    let index;

    function findIndex() {
        index = Math.round(Math.random() * (arr.length - 1));
        while (replaced.includes(index))
            index = Math.round(Math.random() * (arr.length - 1));
        replaced.push(index);

        return index;
    }

    if (passObj.uppercase && !/[A-Z]/.test(arr.join(''))) {
        index = Math.round(Math.random() * (arr.length - 1));
        arr[index] = String.fromCharCode(65 + Math.round(Math.random() * (90 - 65)));
        replaced.push(index);
    }
    if (passObj.lowercase && !/[a-z]/.test(arr.join('')))
        arr[findIndex()] = String.fromCharCode(97 + Math.round(Math.random() * (122 - 97)));
    if (passObj.numeric && !/\d/.test(arr.join('')))
        arr[findIndex()] = String.fromCharCode(48 + Math.round(Math.random() * (57 - 48)));
    if (passObj.specialAll && !passObj.special1 && !passObj.special2 && !/[!"#$%&'()*+,-./:;<=>?@]/.test(arr.join(''))) {
        let random = 1 + Math.round(Math.random());
        arr[findIndex()] = (random === 1) ? String.fromCharCode(33 + Math.round(Math.random() * (47 - 33))) : String.fromCharCode(58 + Math.round(Math.random() * (64 - 58)));
    }
    if (passObj.special1 && passObj.specialAll && !/[!"#$%&'()*+,-./]/.test(arr.join('')))
        arr[findIndex()] = String.fromCharCode(33 + Math.round(Math.random() * (47 - 33)));
    if (passObj.special2 && passObj.specialAll && !/[:;<=>?@]/.test(arr.join('')))
        arr[findIndex()] = String.fromCharCode(58 + Math.round(Math.random() * (64 - 58)));

    return arr.join('');
}

export default function requirementsPass(length, passObj) {

    const characters = getPossibleCharacters(passObj);

    console.log(characters);

    let password = getPassword(characters, length);

    password = checkCategoriesPresent(password, passObj);

    password = checkRepeats(password);

    if (length <= 10)
        password = checkUnique(password);

    password = checkNumSeq(password);

    return password;
}