export default function CategoryChoices({
                                            categoryChoicesClassName, categoryClassName, specialChoiceClassName,
                                            prompt, length1Prompt,
                                            cbID1, cbID2, cbID3, cbID4, cbID5,
                                            label1, label2, label3, label4, label5, label6, label7, label8,
                                            value1, value2, value3, value4,
                                            onChangeCategoryChoices,
                                            uppercase, lowercase, numeric, special, special1, special2, ambiguous
                                        }) {

    return (
        <div className={categoryChoicesClassName}>

            <form>
                <label className="smallPrompt">
                    {length1Prompt}
                    <input
                        className="length"
                        type="number" value={value4} id="length1" onChange={onChangeCategoryChoices}
                    />
                </label>
            </form>

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


            <form className="cc">
                <div>
                    <label>
                        <input type="checkbox" id={cbID5} onChange={onChangeCategoryChoices}
                               defaultChecked={ambiguous}/>
                        {label8}
                    </label>
                    <label>
                        <input type="checkbox" id={cbID1} onChange={onChangeCategoryChoices}
                               defaultChecked={uppercase}/>
                        {label1}
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" id={cbID2} onChange={onChangeCategoryChoices}
                               defaultChecked={lowercase}/>
                        {label2}
                    </label>
                    <label>
                        <input type="checkbox" id={cbID3} onChange={onChangeCategoryChoices} defaultChecked={numeric}/>
                        {label3}
                    </label>
                </div>
            </form>


            {/* <form className="cc">
                <input type="checkbox" id={cbID5} onChange={onChangeCategoryChoices} defaultChecked={ambiguous}/>
                <label>
                    {label8}
                </label>
                <input type="checkbox" id={cbID1} onChange={onChangeCategoryChoices} defaultChecked={uppercase}/>
                <label>
                    {label1}
                </label>
                <input type="checkbox" id={cbID2} onChange={onChangeCategoryChoices} defaultChecked={lowercase}/>
                <label>
                    {label2}
                </label>
                <input type="checkbox" id={cbID3} onChange={onChangeCategoryChoices} defaultChecked={numeric}/>
                <label>
                    {label3}
                </label>
            </form>*/}


            {/*<div>
                <form style={{columnCount: 2}}>
                    <input type="checkbox" id={cbID5} onChange={onChangeCategoryChoices} defaultChecked={ambiguous}/>
                    <label>
                        {label8}
                    </label>
                    <input type="checkbox" id={cbID1} onChange={onChangeCategoryChoices} defaultChecked={uppercase}/>
                    <label>
                        {label1}
                    </label>
                    <input type="checkbox" id={cbID2} onChange={onChangeCategoryChoices} defaultChecked={lowercase}/>
                    <label>
                        {label2}
                    </label>
                    <input type="checkbox" id={cbID3} onChange={onChangeCategoryChoices} defaultChecked={numeric}/>
                    <label>
                        {label3}
                    </label>
                </form>







                <div style={{display: "inline"}}>
                    <form style={{display: "inline", marginRight: "20px"}}>
                        <input type="checkbox" id={cbID5} onChange={onChangeCategoryChoices} defaultChecked={ambiguous}/>
                        <label>
                            {label8}
                        </label>
                    </form>
                    <form style={{display: "inline"}}>
                        <input className={categoryClassName} type="checkbox" id={cbID1} onChange={onChangeCategoryChoices} defaultChecked={uppercase}/>
                        <label>
                            {label1}
                        </label>
                    </form>
                </div>
                <div style={{display: "inline"}}>
                    <form style={{display: "inline", verticalAlign: "top"}}>
                        <input type="checkbox" id={cbID2} onChange={onChangeCategoryChoices} defaultChecked={lowercase}/>
                        <label>
                            {label2}
                        </label>
                    </form>
                    <form style={{display: "inline"}}>
                        <input className={categoryClassName} type="checkbox" id={cbID3} onChange={onChangeCategoryChoices} defaultChecked={numeric}/>
                        <label>
                            {label3}
                        </label>
                    </form>
                </div>
            </div>*/}


            {/*<form>
                <input type="checkbox" id={cbID5} onChange={onChangeCategoryChoices} defaultChecked={ambiguous}/>
                <label>
                    {label8}
                </label>
                <input className={categoryClassName} type="checkbox" id={cbID1} onChange={onChangeCategoryChoices} defaultChecked={uppercase}/>
                <label>
                    {label1}
                </label>
            </form>

            <form>
                <input type="checkbox" id={cbID2} onChange={onChangeCategoryChoices} defaultChecked={lowercase}/>
                <label>
                    {label2}
                </label>
                <input className={categoryClassName} type="checkbox" id={cbID3} onChange={onChangeCategoryChoices} defaultChecked={numeric}/>
                <label>
                    {label3}
                </label>
            </form>*/}

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