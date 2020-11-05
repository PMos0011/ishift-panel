import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { invoiceFormStyle } from "./selectCustomStyle";
 
const ContractorForm = (props) => {

    let partySide = "buyer";
    if (props.isSeller)
        partySide = "seller";

    const buyer = <div className="margin-all-1">Nabywca</div>;
    const seller = <div className="margin-all-1">Sprzedawca</div>;
    const selectForm = <Select className="margin-all-1"
        options={props.contractorsSelectOptions}
        onChange={(data,name) => props.onSelectChange(data,name)}
        name={{[partySide]:{
            name: 'name'
        }}} />;

    const textAreaForm = <textarea className="margin-all-1 text-x-large-input"
        name="name"
        value={props.contractorData.name}
        onChange={props.onInputChange}
        readOnly={props.isReadOnly} />;

    return (
        <div className="doc-grid-2-auto-fit">
            {props.isSeller ? seller : buyer}
            {props.isTextArea ? textAreaForm : selectForm}
            <Select className="margin-all-1"
                options={props.contractorIdOptions}
                value={props.contractorIdOptions[props.contractorData.idType]}
                onChange={(data,name) => props.onSelectChange(data,name)}
                styles={invoiceFormStyle}
                isSearchable={false}
                name={{[partySide]:{
                    name: 'contractorId'
                }}}
                isDisabled={!props.newInvoice} />
            <input className="margin-all-1 text-x-large-input"
                type="text"
                name="idValue"
                value={props.contractorData.idValue[props.contractorData.idType]}
                onChange={props.onInputChange}
                readOnly={props.isReadOnly} />
            <div className="margin-all-1">Ulica</div>
            <input className="margin-all-1 text-x-large-input"
                type="text" name="street"
                value={props.contractorData.street}
                onChange={props.onInputChange}
                readOnly={props.isReadOnly} />
            <div className="margin-all-1">Miasto</div>
            <input className="margin-all-1 text-x-large-input"
                type="text"
                name="city"
                value={props.contractorData.city}
                onChange={props.onInputChange}
                readOnly={props.isReadOnly} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contractorIdOptions: state.contractorsReducer.contractorIdOptions,
        contractorsSelectOptions: state.contractorsReducer.contractorsSelectoptions,
    };
};

export default connect(mapStateToProps)(ContractorForm);