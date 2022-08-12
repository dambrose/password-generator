import RangeSelect from "./RangeSelect";

export default function CategoryChoices({
                                            value1,
                                            value2,
                                            value3,
                                            onChangeCategoryChoices,
                                            setState,
                                            uppercase,
                                            lowercase,
                                            numeric,
                                            special,
                                            special1,
                                            special2,
                                            ambiguous,
                                            length,
                                            state
                                        }) {

    const specialChar1 = '!"#$%&\'()*+,-./';
    const specialChar2 = ':;<=>?@';

    return (
        <div className="passwordOptions mediumFont">


            <div className="card border-primary mb-3">
                <div className="card-body text-primary">
                    <RangeSelect value={length} setValue={num => setState({...state, length: num})} max={64} min={4}/>
                    <input readOnly value={length}/>
                    <h5 className="card-title text-center">Character Options</h5>
                    <p className="smallFont text-center">(Ambiguous characters: "O", "1", "I", etc.)</p>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="ambiguous"
                               onChange={onChangeCategoryChoices} defaultChecked={ambiguous}/>
                        <label className="form-check-label" htmlFor="ambiguous">
                            Ambiguous
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="uppercase"
                               onChange={onChangeCategoryChoices} defaultChecked={uppercase}/>
                        <label className="form-check-label" htmlFor="uppercase">
                            Uppercase
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="lowercase"
                               onChange={onChangeCategoryChoices} defaultChecked={lowercase}/>
                        <label className="form-check-label" htmlFor="lowercase">
                            Lowercase
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="numeric"
                               onChange={onChangeCategoryChoices} defaultChecked={numeric}/>
                        <label className="form-check-label" htmlFor="numeric">
                            Numeric
                        </label>
                    </div>
                    <div className="form-check d-inline-flex">
                        <input className="form-check-input" type="checkbox" id="special"
                               onChange={onChangeCategoryChoices} defaultChecked={special}/>
                        <label className="form-check-label" htmlFor="special">
                            Special
                        </label>
                        <select className="form-select form-select-sm" aria-label="Default select example">
                            <option value={value1} selected={special && !special1 && !special2}>All</option>
                            <option value={value2} selected={special1}>{specialChar1}</option>
                            <option value={value3} selected={special2}>{specialChar2}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}