import React from "react";
import Select from "react-select"

 const invoiceParties = (props) => {
  
    let disable = false;
    if (props.contractorData[0] < 0)
        disable = true;

    return (
        <div className="doc-grid-2-50-container">
            <div className="doc-grid-2-auto-fit">
                <div className="margin-all-1">Sprzedawca</div>
                <textarea className="margin-all-1 text-x-large-input" name="seller" value={props.myData.name} readOnly />
                <Select className="margin-all-1"
                    options={props.partyIdSelectOption}
                    defaultValue={props.partyIdSelectOption[0]}
                    onChange={props.onChangeHandler}
                    styles={customStyles}
                    isSearchable={false}
                    name="myDataId" />
                <input className="margin-all-1 text-x-large-input"
                    type="text" name="sellerNip"
                    value={props.myData.idType}
                    readOnly />
                <div className="margin-all-1">Ulica</div>
                <input className="margin-all-1 text-x-large-input" type="text" name="sellerStreet" value={props.myData.street} readOnly />
                <div className="margin-all-1">Miasto</div>
                <input className="margin-all-1 text-x-large-input" type="text" name="sellerCity" value={props.myData.city} readOnly />
            </div>
            <div className="doc-grid-2-auto-fit">
                <div className="margin-all-1">Nabywca</div>
                <Select className="margin-all-1"
                    options={props.contractorOptions}
                    onChange={props.onChangeHandler}
                    name="contractorName"
                />
                <Select className="margin-all-1"
                    options={props.partyIdSelectOption}
                    defaultValue={props.partyIdSelectOption[0]}
                    onChange={props.onChangeHandler}
                    styles={customStyles}
                    isSearchable={false}
                    isDisabled={disable}
                    name="contractorId"
                    />
                <input className="margin-all-1 text-x-large-input"
                    type="text"
                    name="sellerNip"
                    value=
                    {props.contractorData[1].idType}
                    readOnly />
                <div className="margin-all-1">Ulica</div>
                <input className="margin-all-1 text-x-large-input" type="text" name="sellerStreet" value={props.contractorData[1].street} readOnly />
                <div className="margin-all-1">Miasto</div>
                <input className="margin-all-1 text-x-large-input" type="text" name="sellerCity" value={props.contractorData[1].city} readOnly />
            </div>
        </div>
    )
}

const customStyles = {
    option: (styles, state) => ({

        ...styles,
        fontSize: '12px',
        textAlign: 'left',
        width: 'auto',

    }),
    control: (styles, state) => ({
        ...styles,
        border: 'none',
        width: '90px'
    }),
    dropdownIndicator: (styles, state) => ({
        ...styles,
        padding: '0px'
    }),
    indicatorSeparator: (styles, state) => ({
        ...styles,
        width: '0px'
    }),
}

export default invoiceParties;