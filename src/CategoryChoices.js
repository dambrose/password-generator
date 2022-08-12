export default function CategoryChoices({
                                            categoryChoicesClassName, categoryClassName, specialChoiceClassName,
                                            lengthID, cbID1, cbID2, cbID3, cbID4, cbID5,
                                            value1, value2, value3, value4,
                                            onChangeCategoryChoices,
                                            uppercase, lowercase, numeric, special, special1, special2, ambiguous
                                        }) {

    const specialChar1 = '!"#$%&\'()*+,-./';
    const specialChar2 = ':;<=>?@';

    return (
        <div className={categoryChoicesClassName}>

            <form>
                <label className="smallPrompt">
                    Number of characters:
                    <input
                        className="length"
                        type="number" value={value4} id={lengthID} onChange={onChangeCategoryChoices}
                    />
                </label>
            </form>

            <p className="optionsHeading">Character Options</p>
            <p className="smallerPrompt">(Ambiguous characters: "O", "1", "I", etc.)</p>

            <form className="cc">
                <div>
                    <label>
                        <input type="checkbox" id={cbID5} onChange={onChangeCategoryChoices}
                               defaultChecked={ambiguous}/>
                        Ambiguous
                    </label>
                    <label>
                        <input type="checkbox" id={cbID1} onChange={onChangeCategoryChoices}
                               defaultChecked={uppercase}/>
                        Uppercase
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" id={cbID2} onChange={onChangeCategoryChoices}
                               defaultChecked={lowercase}/>
                        Lowercase
                    </label>
                    <label>
                        <input type="checkbox" id={cbID3} onChange={onChangeCategoryChoices} defaultChecked={numeric}/>
                        Numeric
                    </label>
                </div>
                <div className="specialDrop">
                    <label>
                        <input type="checkbox" id={cbID4} onChange={onChangeCategoryChoices} defaultChecked={special}/>
                        Special
                    </label>
                    <select className={specialChoiceClassName} onChange={onChangeCategoryChoices}>
                        <option value={value1} selected={special && !special1 && !special2}>All</option>
                        <option value={value2} selected={special1}>{specialChar1}</option>
                        <option value={value3} selected={special2}>{specialChar2}</option>
                    </select>
                </div>
            </form>
        </div>
    );
}