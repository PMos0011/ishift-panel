import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { withAlert } from 'react-alert'

import InvoiceHeader from "./invoiceHeader";
import InvoiceParties from "./invoiceParties";
import InvoiceCommodities from "./invoiceCommodities";
import InvoiceSummary from "./invoiceSummary";

import * as builders from "./invoiceDataBuilder";

import { getContractors } from "../../store/contractors/contractorsActions";
import { getCommoditiesData } from "../../store/commodity/commodityActions";
import { getBankAccountsData } from "../../store/bankAccounts/bankActions";
import { putInvoice, test } from "../../store/invoice/invoiceAction";


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
        if (buyer.idValue === undefined || buyer.idValue === null || buyer.idValue === "") {
            buyer.idValue = ""
            buyer.idName = ""
        }

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

        if (buyer.name === "")
            props.alert.error("Brak nabywcy!");
        else if (commodities.length < 1)
            props.alert.error("Brak towarów!");
        else
        // props.putInvoice(props.match.params.dbId, data);
        props.test(data)
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
                summaryData={summaryData}
                setSummaryData={setSummaryData}
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
        putInvoice: (id, data) => dispatch(putInvoice(id, data)),
        test: (data) => dispatch(test(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(InvoiceForm));