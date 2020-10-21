import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Aux from "../../hoc/auxiliary";

import InvoiceHeader from "./invoiceHeader";
import InvoiceParties from "./invoiceParties";
import InvoiceCommodities from "./invoiceCommodities";

import * as builders from "./invoiceDataBuilder";

import { getContractors } from "../../store/contractors/contractorsActions";
import { getCommoditiesData } from "../../store/commodity/commodityActions";


const InvoiceForm = (props) => {

    useEffect(() => {
        props.getContractors(props.match.params.dbId);
        props.getCommodities(props.match.params.dbId);
    }, []);

    const [invoiceType, setInvoiceType] = useState(props.invoiceType[0]);
    const [issueDate, setIssue] = useState(new Date());
    const [sellDate, setSell] = useState(new Date());
    const [invoiceNumber, setInvoiceNumber] = useState(builders.invoiceNumberBuilder(invoiceType));
    const [placeOfIssue, setPlaceOfIssue] = useState(builders.invoicePlaceOfIssueBuilder(props.customer));
    const [partyIdTypeOption, setPartyIdTypeOption] = useState([builders.partyOption()[0], builders.partyOption()[0]]);
    const [myCompnayData, setMyCompanyData] = useState(builders.myCompanyDataBuilder(props.customer, partyIdTypeOption[0].value))
    const [contractorData, setContractorData] = useState([-1, builders.emptyData]);
    const [invoiceCommodities, setInvoiceCommodities] = useState({});

    

    const setIssueDate = (date) => {
        setIssue(date);
    }

    const setSellDate = (date) => {
        setSell(date);
    }

    const setSelectorOptions = (data) => {
        let object = props.invoiceType.find(type => type.id === data.value);
        setInvoiceType(object);
        setInvoiceNumber(builders.invoiceNumberBuilder(object));
    }

    const onHeaderChangeHandler = (event) => {
        if (event.target.name === "invoiceNumber")
            setInvoiceNumber(event.target.value);
        if (event.target.name === "placeOfIssue")
            setPlaceOfIssue(event.target.value);
    }

    const onPartiesChangeHandler = (data, action) => {
        if (action.name === "contractorName") {
            setContractorData([data.value, builders.contractorDataBuilder(props.contractors[data.value], partyIdTypeOption[1].value)]);
        }
        else if (action.name === "myDataId") {
            setPartyIdTypeOption([data, partyIdTypeOption[1]]);
            setMyCompanyData(builders.myCompanyDataBuilder(props.customer, data.value));
        }
        else if (action.name === "contractorId") {
            console.log("Contractor")
            setPartyIdTypeOption([partyIdTypeOption[0], data]);
            setContractorData([contractorData[0], builders.contractorDataBuilder(props.contractors[contractorData[0]], data.value)]);
        }
    }

    return (
        <Aux>
            <div className="width-95-white app-border-shadow">
                <InvoiceHeader
                    selectOptions={props.selectOptions}
                    setSelectorOptions={setSelectorOptions}
                    invoiceNumber={invoiceNumber}
                    onChangeHandler={onHeaderChangeHandler}
                    issueDate={issueDate}
                    setIssueDate={setIssueDate}
                    sellDate={sellDate}
                    setSellDate={setSellDate}
                    placeOfIssue={placeOfIssue}
                />
                <hr className="hr-margin" />
                <InvoiceParties
                    partyIdSelectOption={builders.partyOption()}
                    myData={myCompnayData}
                    contractorData={contractorData}
                    contractorOptions={props.contractorsSelectoptions}
                    onChangeHandler={onPartiesChangeHandler}
                    partyIdTypeOption={partyIdTypeOption}
                />
                <hr className="hr-margin" />
                <InvoiceCommodities
                    commoditySelectOptions={props.commoditySelectOptions}
                    invoiceCommodities={invoiceCommodities}
                    setInvoiceCommodities={setInvoiceCommodities}
                    commodities={props.commodities}
                    measureSelectOptions = {props.measureSelectOptions}

                />
            </div> </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        selectOptions: state.invoiceReducer.invoiceSelectOptions,
        invoiceType: state.invoiceReducer.invoiceType,
        dataAccess: state.authReducer.dataAccess,
        customer: state.customersReducer.customer,
        contractorsSelectoptions: state.contractorsReducer.contractorsSelectoptions,
        contractors: state.contractorsReducer.contractors,
        commoditySelectOptions: state.commodityReducer.commoditySelectOpotions,
        commodities: state.commodityReducer.commodities,
        measureSelectOptions: state.commodityReducer.measures
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContractors: (id) => dispatch(getContractors(id)),
        getCommodities: (id) => dispatch(getCommoditiesData(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);