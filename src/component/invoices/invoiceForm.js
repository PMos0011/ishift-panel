import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import InvoiceHeader from "./invoiceHeader";
import InvoiceParties from "./invoiceParties";
import InvoiceCommodities from "./invoiceCommodities";
import InvoiceSummary from "./invoiceSummary";
import InvoiceCorrectionHeader from "./invoiceCorrectionHeader";
import Currency from "./currency";

import * as builders from "./invoiceDataBuilder";
import getDataToSend from "./formCheck";
import createInvoiceData from "./correctionsCheck";

import { getContractors } from "../../store/contractors/contractorsActions";
import { getCommoditiesData } from "../../store/commodity/commodityActions";
import { getBankAccountsData } from "../../store/bankAccounts/bankActions";
import { saveInvoice, invoicePreview, saveInvoiceAndDownload, getLastInvoices } from "../../store/invoice/invoiceAction";


const InvoiceForm = (props) => {

    useEffect(() => {
        props.getLastInvoices(props.match.params.dbId);
        props.getContractors(props.match.params.dbId);
        props.getCommodities(props.match.params.dbId);
        props.getBankAccounts(props.match.params.dbId);
    }, []);



    let [currentInvoiceId, setCurrentInvoiceId] = useState(props.match.params.id);
    if (currentInvoiceId !== props.match.params.id)
        setCurrentInvoiceId(props.match.params.id)

    useEffect(() => {
        if (props.match.params.id == 0) {
            setInvoiceCommodities({});
            setCorrectionInvoiceCommodities({});

            setHeaderData(builders.setHeaderBeginState(
                props.invoiceTypeSelectOptions[0],
                props.seller,
                props.invoiceType,
                props.lastInvoice,
                new Date()))
        }
    }, [currentInvoiceId])

    useEffect(() => {
        let selectOption = 0;               //sell invoice
        let sellDate;
        let id;
        try {
            if (props.match.params.id != 0) {
                selectOption = 1;           //correction invoice
                let selectedInvoice = props.invoices.find(inv => inv.id == props.match.params.id);
                sellDate = selectedInvoice.sellDate;
                id = selectedInvoice.id;
            }

            setHeaderData(builders.setHeaderBeginState(
                props.invoiceTypeSelectOptions[selectOption],
                props.seller,
                props.invoiceType,
                props.lastInvoice,
                sellDate,
                id))
        }
        catch (error) { }
    }, [props.lastInvoice])

    const invoiceData = createInvoiceData(props.invoices, props.match.params.id, props.seller, props.contractorIdOptions[0], props.invoicePaymnetStatusOptions[0]);
    let invoice = invoiceData.invoice;
    let newCurrencyData = invoiceData.newCurrencyData;
    let newInvoice = invoiceData.newInvoice;

    const [headerData, setHeaderData] = useState(invoice.headerData);
    const [correctionData, setCorrectionData] = useState(invoice.correctionData);
    const [partiesData, setPartiesData] = useState(invoice.partiesData);
    const [invoiceCommodities, setInvoiceCommodities] = useState(invoice.invoiceCommodities);
    const [usedAdvancedInvoices, setUsedAdvancedInvoices] = useState([]);
    const [correctionInvoiceCommodities, setCorrectionInvoiceCommodities] = useState({});
    const [currencyData, setCurrencyData] = useState(newCurrencyData);
    const [summaryData, setSummaryData] = useState(builders.setSummaryBeginState(props.invoicePaymnetStatusOptions[0]));
    let [invoicePaymentAmount, setInvoicePaymentAmount] = useState(0);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (headerData.invoiceTypeId === 1) {
            setInvoiceCommodities({});
        } else if (headerData.invoiceTypeId === 3) {
            setInvoiceCommodities(builders.setAdvancedPayment());
        }
    }, [headerData.invoiceTypeId])


    let redirectTo = null;
    if (redirect)
        redirectTo = <Redirect to={"/"} />

    const onSubmitClick = (event) => {
        const data = getDataToSend(partiesData, invoiceCommodities, headerData, summaryData, correctionData, currencyData, usedAdvancedInvoices, newInvoice)
        if (data)
            switch (event.target.name) {
                case "view":
                    props.invoicePreview(props.match.params.dbId, data);
                    break;
                case "save":
                    props.saveInvoice(props.match.params.dbId, data);
                    setRedirect(true);
                    break;
                case "saveView":
                    props.saveInvoiceAndDownload(props.match.params.dbId, data);
                    setRedirect(true);
                    break;
            }
    }

    const invoiceCorrectionHeader = <InvoiceCorrectionHeader
        correctionData={correctionData}
        setCorrectionData={setCorrectionData} />

    const submit = <div className="grid-3-invoice-submit">
        <input type="submit" value="Podgląd" name="view" onClick={onSubmitClick} />
        <input type="submit" value="Zapisz" name="save" onClick={onSubmitClick} />
        <input type="submit" value="Zapisz i pobierz" name="saveView" onClick={onSubmitClick} />
    </div>

    return (
        <div className="width-95-white app-border-shadow">
            {props.match.params.dbId !== "demo" ? redirectTo : null}
            <InvoiceHeader
                headerData={headerData}
                setHeaderData={setHeaderData}
                newInvoice={newInvoice}
            />
            {newInvoice ? null : invoiceCorrectionHeader}
            <hr className="hr-margin" />
            <InvoiceParties
                partiesData={partiesData}
                setPartiesData={setPartiesData}
                newInvoice={newInvoice}
            />
            <hr className="hr-margin" />
            <InvoiceCommodities
                invoiceCommodities={invoiceCommodities}
                setInvoiceCommodities={setInvoiceCommodities}
                usedAdvancedInvoices={usedAdvancedInvoices}
                setUsedAdvancedInvoices={setUsedAdvancedInvoices}
                summaryData={summaryData}
                setSummaryData={setSummaryData}
                setInvoicePaymentAmount={setInvoicePaymentAmount}
                correctionInvoiceCommodities={correctionInvoiceCommodities}
                setCorrectionInvoiceCommodities={setCorrectionInvoiceCommodities}
                newInvoice={newInvoice}
                invoiceType={headerData.invoiceTypeId}
                dbId={props.match.params.dbId}
                currencyData={currencyData}
            />

            <hr className="hr-margin" />
            <Currency
                currencyData={currencyData}
                setCurrencyData={setCurrencyData}
                headerData={headerData}
            />

            <hr className="hr-margin" />
            <InvoiceSummary
                summaryData={summaryData}
                setSummaryData={setSummaryData}
                invoicePaymentAmount={invoicePaymentAmount} />

            <hr className="hr-margin" />
            {newInvoice ? submit : submit}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        invoiceTypeSelectOptions: state.invoiceReducer.invoiceSelectOptions,
        invoiceType: state.invoiceReducer.invoiceType,
        lastInvoice: state.invoiceReducer.lastInvoice,
        seller: state.customersReducer.customer,
        contractorIdOptions: state.contractorsReducer.contractorIdOptions,
        invoicePaymnetStatusOptions: state.invoiceReducer.invoicePaymnetStatusOptions,
        invoices: state.invoiceReducer.invoices
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContractors: (id) => dispatch(getContractors(id)),
        getCommodities: (id) => dispatch(getCommoditiesData(id)),
        getBankAccounts: (id) => dispatch(getBankAccountsData(id)),
        saveInvoice: (id, data) => dispatch(saveInvoice(id, data)),
        invoicePreview: (id, data) => dispatch(invoicePreview(id, data)),
        saveInvoiceAndDownload: (id, data) => dispatch(saveInvoiceAndDownload(id, data)),
        getLastInvoices: (id) => dispatch(getLastInvoices(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);