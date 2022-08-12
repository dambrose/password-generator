export default function CategoryChoices({
                                            value1, value2, value3, value4,
                                            onChangeCategoryChoices,
                                            uppercase, lowercase, numeric, special, special1, special2, ambiguous
                                        }) {

    const specialChar1 = '!"#$%&\'()*+,-./';
    const specialChar2 = ':;<=>?@';

    return (
        <div className="passwordOptions mediumFont">

            <form>
                <label className="mediumFont">
                    Number of characters:
                    <input
                        className="smallFont"
                        type="number" value={value4} id="length" onChange={onChangeCategoryChoices}
                    />
                </label>
            </form>

            <p className="optionsHeading mediumFont">Character Options</p>
            <p className="smallFont">(Ambiguous characters: "O", "1", "I", etc.)</p>

            <form className="cc">
                <div>
                    <label>
                        <input type="checkbox" id="ambiguous" onChange={onChangeCategoryChoices}
                               defaultChecked={ambiguous}/>
                        Ambiguous
                    </label>
                    <label>
                        <input type="checkbox" id="uppercase" onChange={onChangeCategoryChoices}
                               defaultChecked={uppercase}/>
                        Uppercase
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" id="lowercase" onChange={onChangeCategoryChoices}
                               defaultChecked={lowercase}/>
                        Lowercase
                    </label>
                    <label>
                        <input type="checkbox" id="numeric" onChange={onChangeCategoryChoices}
                               defaultChecked={numeric}/>
                        Numeric
                    </label>
                </div>
                <div className="specialDrop">
                    <label>
                        <input type="checkbox" id="special" onChange={onChangeCategoryChoices}
                               defaultChecked={special}/>
                        Special
                    </label>
                    <select className="mediumFont" onChange={onChangeCategoryChoices}>
                        <option value={value1} selected={special && !special1 && !special2}>All</option>
                        <option value={value2} selected={special1}>{specialChar1}</option>
                        <option value={value3} selected={special2}>{specialChar2}</option>
                    </select>
                </div>
            </form>
        </div>
    );
}