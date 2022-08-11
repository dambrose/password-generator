export default function CategoryChoices({
                                            categoryChoicesClassName, categoryClassName, specialChoiceClassName,
                                            prompt,
                                            cbID1, cbID2, cbID3, cbID4, cbID5,
                                            label1, label2, label3, label4, label5, label6, label7, label8,
                                            value1, value2, value3,
                                            onChangeCategoryChoices,
                                            uppercase, lowercase, numeric, special, special1, special2, ambiguous
                                        }) {

    return (
        <div className={categoryChoicesClassName}>
            {/*<div>
                <p className="smallPrompt">{prompt}</p>
                <p>(Ambiguous characters: I, l, 1, o, O, 0)</p>
            </div>*/}
            <p className="optionsHeading">{prompt}</p>
            <p className="smallerPrompt">(Ambiguous characters: "O", "1", "I", etc.)</p>


            {/*<form>
                <form className={categoryClassName}>
                    <input type="checkbox" id={cbID5} onChange={onChangeCategoryChoices} defaultChecked={ambiguous}/>
                    <label>
                        {label8}
                    </label>
                    <input type="checkbox" id={cbID2} onChange={onChangeCategoryChoices} defaultChecked={lowercase}/>
                    <label>
                        {label2}
                    </label>
                </form>
                <form className={categoryClassName}>
                    <input type="checkbox" id={cbID1} onChange={onChangeCategoryChoices} defaultChecked={uppercase}/>
                    <label>
                        {label1}
                    </label>
                    <input type="checkbox" id={cbID3} onChange={onChangeCategoryChoices} defaultChecked={numeric}/>
                    <label>
                        {label3}
                    </label>
                </form>
            </form>*/}

            <form className={categoryClassName}>
                <input type="checkbox" id={cbID5} onChange={onChangeCategoryChoices} defaultChecked={ambiguous}/>
                <label>
                    {label8}
                </label>
                <input type="checkbox" id={cbID1} onChange={onChangeCategoryChoices} defaultChecked={uppercase}/>
                <label>
                    {label1}
                </label>
            </form>

            <form className={categoryClassName}>
                <input type="checkbox" id={cbID2} onChange={onChangeCategoryChoices} defaultChecked={lowercase}/>
                <label>
                    {label2}
                </label>
                <input type="checkbox" id={cbID3} onChange={onChangeCategoryChoices} defaultChecked={numeric}/>
                <label>
                    {label3}
                </label>
            </form>

            <form>
                <input type="checkbox" id={cbID4} onChange={onChangeCategoryChoices} defaultChecked={special}/>
                <label>
                    {label4}
                </label>
                <select className={specialChoiceClassName} onChange={onChangeCategoryChoices}>
                    <option value={value1} selected={special && !special1 && !special2}>{label5}</option>
                    <option value={value2} selected={special1}>{label6}</option>
                    <option value={value3} selected={special2}>{label7}</option>
                </select>
            </form>
        </div>
    );
}