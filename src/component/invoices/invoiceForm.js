import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import InvoiceHeader from "./invoiceHeader";
import InvoiceParties from "./invoiceParties";
import InvoiceCommodities from "./invoiceCommodities";
import InvoiceSummary from "./invoiceSummary";

import * as builders from "./invoiceDataBuilder";

import { getContractors } from "../../store/contractors/contractorsActions";
import { getCommoditiesData } from "../../store/commodity/commodityActions";


const InvoiceForm = (props) => {

    useEffect(() => {
        props.getContractors(props.match.params.dbId);
        props.getCommodities(props.match.params.dbId);
    }, []);

    const [headerData, setHeaderData] = useState(builders.setHeaderBeginState(
        props.invoiceTypeSelectOptions,
        props.seller,
        props.invoiceType));

    const [partiesData, setPartiesData] = useState(
        builders.setPartiesDatatBeginState(props.seller, props.contractorIdOptions[0]));

    const [invoiceCommodities, setInvoiceCommodities] = useState({});

    return (
        <div className="width-95-white app-border-shadow">
            <InvoiceHeader
                headerData={headerData}
                setHeaderData={setHeaderData}
            />
            <hr className="hr-margin" />
            <InvoiceParties
                partiesData={partiesData}
                setPartiesData={setPartiesData}

            />
            <hr className="hr-margin" />
            <InvoiceCommodities
                invoiceCommodities={invoiceCommodities}
                setInvoiceCommodities={setInvoiceCommodities}

            />
            <hr className="hr-margin" />
            <InvoiceSummary />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        invoiceTypeSelectOptions: state.invoiceReducer.invoiceSelectOptions,
        invoiceType: state.invoiceReducer.invoiceType,
        seller: state.customersReducer.customer,
        contractorIdOptions: state.contractorsReducer.contractorIdOptions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContractors: (id) => dispatch(getContractors(id)),
        getCommodities: (id) => dispatch(getCommoditiesData(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);