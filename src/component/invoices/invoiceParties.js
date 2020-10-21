import React, { useState } from "react";
import Select from "react-select"

const InvoiceParties = (props) => {

    const [customerSource, setCustomerSource] = useState(true);

    const changeCustomerState = () =>{
        setCustomerSource(!customerSource);
    }

    let disable = false;
    if (props.contractorData[0] < 0)
        disable = true;

        const onCustomerDataChange = (event) =>{

            let newData = {...props.contractorData[1]};
            newData[event.target.name]=event.target.value;

            props.setContractorData([props.contractorData[0],newData])
        }


    const customerFromDb = <div className="doc-grid-2-auto-fit">
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

const ownCustomer = <div className="doc-grid-2-auto-fit">
<div className="margin-all-1">Nabywca</div>
<textarea className="margin-all-1 text-x-large-input" name="name" value={props.contractorData[1].name} onChange={onCustomerDataChange} />
<Select className="margin-all-1"
    options={props.partyIdSelectOption}
    defaultValue={props.partyIdSelectOption[0]}
    styles={customStyles}
    isSearchable={false}
    name="contractorId"
/>
<input className="margin-all-1 text-x-large-input input-number-no-arrow"
    type="number"
    name="idType"
    value=
    {props.contractorData[1].idType}
    onChange={onCustomerDataChange} />
<div className="margin-all-1">Ulica</div>
<input className="margin-all-1 text-x-large-input" type="text" name="street" value={props.contractorData[1].street} onChange={onCustomerDataChange} />
<div className="margin-all-1">Miasto</div>
<input className="margin-all-1 text-x-large-input" type="text" name="city" value={props.contractorData[1].city} onChange={onCustomerDataChange} />
</div>

    return (
        <div className="doc-grid-2-50-container">
            <div />
            <div className="grid-4-parties">
                <input type="checkbox" name="fromDb" checked={customerSource} onClick={changeCustomerState} readOnly />
                <h4>Klient z bazy danych</h4>
                <input type="checkbox" name="own" checked={!customerSource} onClick={changeCustomerState} readOnly/>
                <h4>Własne dane</h4>
            </div>
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
            {customerSource?customerFromDb:ownCustomer}
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

export default InvoiceParties;