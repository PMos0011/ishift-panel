import React, { useState } from "react";
import { connect } from 'react-redux';
import ContractorForm from "./contractorForm";
import { buyerDataBuilder } from "./invoiceDataBuilder";


const InvoiceParties = (props) => {

    const [customerSource, setCustomerSource] = useState(true);

    const changeCustomerState = () => {
        setCustomerSource(!customerSource);
    }

    const onInputChange = (event) => {
        let newData = { ...props.partiesData }

        if (event.target.name === "idValue")
            newData.buyer.idValue[newData.buyer.idType] = event.target.value;
        else
            newData.buyer[event.target.name] = event.target.value;

        props.setPartiesData(newData);
    }

    const onSelectChange = (data, name) => {

        const key = Object.keys(name.name)[0];
        const objName = name.name[key].name;

        let newData = { ...props.partiesData };

        if (objName === "contractorId") {
            newData[key].idType = data.value;
            newData[key].idName = data.label;
        }
        if (objName === "name") {
            newData[key] = buyerDataBuilder(props.contractors[data.value], newData[key])
        }
        props.setPartiesData(newData);
    }

    return (
        <div className="doc-grid-2-50-container">
            <div />
            <div className="grid-4-parties">
                <input type="checkbox" name="fromDb" checked={customerSource} onClick={changeCustomerState} readOnly />
                <h4>Klient z bazy danych</h4>
                <input type="checkbox" name="own" checked={!customerSource} onClick={changeCustomerState} readOnly />
                <h4>Własne dane</h4>
            </div>
            <ContractorForm
                isReadOnly={true}
                isSeller={true}
                isTextArea={true}
                onSelectChange={onSelectChange}
                contractorData={props.partiesData.seller}
                onInputChange={onInputChange}
            />
            <ContractorForm
                isReadOnly={customerSource}
                isSeller={false}
                isTextArea={!customerSource}
                onSelectChange={onSelectChange}
                contractorData={props.partiesData.buyer}
                onInputChange={onInputChange}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contractors: state.contractorsReducer.contractors,
    };
};

export default connect(mapStateToProps)(InvoiceParties);