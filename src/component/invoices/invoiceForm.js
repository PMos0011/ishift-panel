import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import InvoiceHeader from "./invoiceHeader";
import InvoiceParties from "./invoiceParties";
import InvoiceCommodities from "./invoiceCommodities";
import InvoiceSummary from "./invoiceSummary";

import * as builders from "./invoiceDataBuilder";

import { getContractors } from "../../store/contractors/contractorsActions";
import { getCommoditiesData } from "../../store/commodity/commodityActions";
import { getBankAccountsData } from "../../store/bankAccounts/bankActions";
import { putInvoice } from "../../store/invoice/invoiceAction";


const InvoiceForm = (props) => {

    useEffect(() => {
        props.getContractors(props.match.params.dbId);
        props.getCommodities(props.match.params.dbId);
        props.getBankAccounts(props.match.params.dbId);
    }, []);

    const [headerData, setHeaderData] = useState(builders.setHeaderBeginState(
        props.invoiceTypeSelectOptions,
        props.seller,
        props.invoiceType));

    const [partiesData, setPartiesData] = useState(
        builders.setPartiesDatatBeginState(props.seller, props.contractorIdOptions[0]));

    const [invoiceCommodities, setInvoiceCommodities] = useState({});
    const [summaryData, setSummaryData] = useState(
        builders.setSummaryBeginState(props.invoicePaymnetStatusOptions[0])
    );

    const onPreviewClick = () => {

        let seller = { ...partiesData.seller };
        let buyer = { ...partiesData.buyer };
        let header = { ...headerData };
        let summary = { ...summaryData }

        const commodities = []
        for (let key in invoiceCommodities)
            commodities.push(invoiceCommodities[key]);

        seller.idValue = partiesData.seller.idValue[partiesData.seller.idType];
        buyer.idValue = partiesData.buyer.idValue[partiesData.buyer.idType];

        header.issueDate = builders.timeZoneCorrection(headerData.issueDate);
        header.sellDate = builders.timeZoneCorrection(headerData.sellDate);

        if (summary.paidDay !== null)
            summary.paidDay = builders.timeZoneCorrection(summaryData.paidDay);
        if (summary.paymentDay !== null)
            summary.paymentDay = builders.timeZoneCorrection(summaryData.paymentDay);

        const data = {
            header,
            seller,
            buyer,
            commodities,
            summary
        }

        props.putInvoice(props.match.params.dbId, data);
    }

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
            <InvoiceSummary
                summaryData={summaryData}
                setSummaryData={setSummaryData} />

            <hr className="hr-margin" />
            <input type="submit" value="Podgląd" onClick={onPreviewClick} />

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        invoiceTypeSelectOptions: state.invoiceReducer.invoiceSelectOptions,
        invoiceType: state.invoiceReducer.invoiceType,
        seller: state.customersReducer.customer,
        contractorIdOptions: state.contractorsReducer.contractorIdOptions,
        invoicePaymnetStatusOptions: state.invoiceReducer.invoicePaymnetStatusOptions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContractors: (id) => dispatch(getContractors(id)),
        getCommodities: (id) => dispatch(getCommoditiesData(id)),
        getBankAccounts: (id) => dispatch(getBankAccountsData(id)),
        putInvoice: (id, data) => dispatch(putInvoice(id, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);