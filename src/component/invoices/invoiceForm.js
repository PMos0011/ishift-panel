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
import { isBankAccountNumberIncorrect } from "../bankAccounts/converters";

import { getContractors } from "../../store/contractors/contractorsActions";
import { getCommoditiesData } from "../../store/commodity/commodityActions";
import { getBankAccountsData } from "../../store/bankAccounts/bankActions";
import { saveInvoice, invoicePreview, saveInvoiceAndDownload, getLastInvoices } from "../../store/invoice/invoiceAction";
import { setMessage } from '../../store/alerts/alertsActions';


const InvoiceForm = (props) => {

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
        props.getLastInvoices(props.match.params.dbId);
        props.getContractors(props.match.params.dbId);
        props.getCommodities(props.match.params.dbId);
        props.getBankAccounts(props.match.params.dbId);
    }, []);

    useEffect(() => {
        let selectOption = 0;
        let sellDate;
        let id;
        try {
            if (props.match.params.id != 0) {
                selectOption = 1;
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

    let newInvoice = true;
    if (props.match.params.id != 0)
        newInvoice = false;

    let invoice = {
        headerData: {
            invoiceNumber: ""
        },
        correctionData: {},
        partiesData: builders.setPartiesDatatBeginState(props.seller, props.contractorIdOptions[0]),
        invoiceCommodities: {},
        summaryData: builders.setSummaryBeginState(props.invoicePaymnetStatusOptions[0])
    }
    if (!newInvoice) {
        try {
            let invoiceToCorrection = props.invoices.find(inv => inv.id == props.match.params.id);

            invoice.correctionData = {
                correctedInvoiceNumber: invoiceToCorrection.invoiceTypeName + " " + invoiceToCorrection.invoiceNumber,
                correctedInvoiceDate: new Date(invoiceToCorrection.issueDate),
                correctionReason: "",
            }

            let seller = invoiceToCorrection.partiesData.find(party => party.partyId === 0);
            let buyer = invoiceToCorrection.partiesData.find(party => party.partyId === 1);

            if (seller.idName === "NIP") {
                invoice.partiesData.seller = {
                    name: seller.name,
                    idType: 0,
                    idName: "NIP",
                    idValue: [seller.idValue, ""],
                    street: seller.street,
                    city: seller.city
                }
            } else {
                invoice.partiesData.seller = {
                    name: seller.name,
                    idType: 1,
                    idName: "REGON",
                    idValue: ["", seller.idValue],
                    street: seller.street,
                    city: seller.city
                }
            }

            if (buyer.idName === "NIP") {
                invoice.partiesData.buyer = {
                    name: buyer.name,
                    idType: 0,
                    idName: "NIP",
                    idValue: [buyer.idValue, ""],
                    street: buyer.street,
                    city: buyer.city
                }
            } else {
                invoice.partiesData.buyer = {
                    name: buyer.name,
                    idType: 1,
                    idName: "REGON",
                    idValue: ["", buyer.idValue],
                    street: buyer.street,
                    city: buyer.city
                }
            }

            invoice.invoiceCommodities = invoiceToCorrection.invoiceCommodities;
            invoice.summaryData = invoiceToCorrection.summaryData;
        }
        catch (error) { }
    }

    const [headerData, setHeaderData] = useState(invoice.headerData);
    const [correctionData, setCorrectionData] = useState(invoice.correctionData);

    const [partiesData, setPartiesData] = useState(invoice.partiesData);

    const [invoiceCommodities, setInvoiceCommodities] = useState(invoice.invoiceCommodities);
    const [usedAdvancedInvoices, setUsedAdvancedInvoices] = useState([]);
    const [correctionInvoiceCommodities, setCorrectionInvoiceCommodities] = useState({});
    const [currencyData, setCurrencyData] = useState({
        currentCurrency: "PLN",
        exchangeDate: null,
        exchangeRate: null,
        exchangeBasis: null
    })

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

    const basicsFormCheck = () => {
        if (partiesData.buyer.name === "")
            props.setMessage("Brak nabywcy!", true);
        else if (Object.keys(invoiceCommodities) < 1)
            props.setMessage("Brak towarów!", true);
        else if (headerData.placeOfIssue === "")
            props.setMessage("Brak miejsca sprzedaży!", true);
        else if (headerData.invoiceNumber === "")
            props.setMessage("Brak numeru faktury!", true);
        else if (summaryData.bankAcc !== null && summaryData.bankAcc === "")
            props.setMessage("Numer konta jest nieuzupełniony!", true);
        else if (summaryData.bankAcc !== null && isBankAccountNumberIncorrect(summaryData.bankAcc))
            props.setMessage("Niepoprawny numer konta!", true);
        else if (summaryData.paid !== null && summaryData.paid == "")
            props.setMessage("Nie ma wpisanej kwoty w \"Zapłacono\"!", true);
        else if (summaryData.paidDay !== null && summaryData.paidDay == "")
            props.setMessage("Nie wybrano daty płatności!", true);
        else if (summaryData.paidWay !== null && summaryData.paidWay == "")
            props.setMessage("Nie wybrano sposobu płatności!", true);
        else if (summaryData.paymentDay !== null && summaryData.paymentDay == "")
            props.setMessage("Nie wybrano terminu płatności!", true);
        else if (summaryData.comments !== null && summaryData.comments == "")
            props.setMessage("Uwagi są niewpisane!", true);
        else if (summaryData.vatExemptionValueNp !== null && summaryData.vatExemptionLabelNp !== "" && summaryData.vatExemptionValueNp == "")
            props.setMessage("Podstawa podatku VAT np jest niewpisana!", true);
        else if (summaryData.vatExemptionValueZw !== null && summaryData.vatExemptionLabelZw !== "" && summaryData.vatExemptionValueZw == "")
            props.setMessage("Podstawa zwlnienia podatku VAT zw jest niewpisana!", true);
        else if (correctionData.correctionReason === "" && !newInvoice)
            props.setMessage("Brak powodu korekty", true);
        else
            return true;

        return false;
    }

    const commoditiesCheck = () => {

        const commodities = []
        for (let key in invoiceCommodities) {
            if (invoiceCommodities[key].name === "") {
                props.setMessage("Brak nawzy towaru bądź usługi!", true);
                return null;
            }
            if (invoiceCommodities[key].measure === "") {
                props.setMessage("Gdzieś nie jest wybrana jednostka miary!", true);
                return null;
            }
            if (invoiceCommodities[key].amount <= 0 && newInvoice) {
                props.setMessage("Chcesz sprzedać 0 towaru!", true);
                return null;
            }
            commodities.push(invoiceCommodities[key]);
        }

        return commodities;
    }

    const createDataToSend = (commodities) => {
        let seller = { ...partiesData.seller };
        let buyer = { ...partiesData.buyer };
        let header = { ...headerData };
        let summary = { ...summaryData }
        let usedAdvInvoices = [...usedAdvancedInvoices]

        seller.idValue = partiesData.seller.idValue[partiesData.seller.idType];
        buyer.idValue = partiesData.buyer.idValue[partiesData.buyer.idType];
        if (buyer.idValue === undefined || buyer.idValue === null || buyer.idValue === "") {
            buyer.idValue = ""
            buyer.idName = ""
        }

        if (!newInvoice)
            header.correctionReason = correctionData.correctionReason;
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
            summary,
            usedAdvInvoices
        }

        return data;
    }

    const onPreviewClick = () => {

        if (basicsFormCheck()) {
            const commodities = commoditiesCheck();
            if (commodities !== null) {
                const data = createDataToSend(commodities);
                props.invoicePreview(props.match.params.dbId, data);
            }
        }
    }

    const onSaveClick = () => {

        if (basicsFormCheck()) {
            const commodities = commoditiesCheck();
            if (commodities !== null) {
                const data = createDataToSend(commodities);
                props.saveInvoice(props.match.params.dbId, data);
                setRedirect(true);
            }
        }
    }

    const onSaveAndDownload = () => {

        if (basicsFormCheck()) {
            const commodities = commoditiesCheck();
            if (commodities !== null) {
                const data = createDataToSend(commodities);
                props.saveInvoiceAndDownload(props.match.params.dbId, data);
                setRedirect(true);
            }
        }
    }

    const invoiceCorrectionHeader = <InvoiceCorrectionHeader
        correctionData={correctionData}
        setCorrectionData={setCorrectionData} />

    const submit = <div className="grid-3-invoice-submit">
        <input type="submit" value="Podgląd" onClick={onPreviewClick} />
        <input type="submit" value="Zapisz" onClick={onSaveClick} />
        <input type="submit" value="Zapisz i pobierz" onClick={onSaveAndDownload} />
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
        setMessage: (message, isError) => dispatch(setMessage(message, isError)),
        invoicePreview: (id, data) => dispatch(invoicePreview(id, data)),
        saveInvoiceAndDownload: (id, data) => dispatch(saveInvoiceAndDownload(id, data)),
        getLastInvoices: (id) => dispatch(getLastInvoices(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);