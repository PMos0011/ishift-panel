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
import { putInvoice, invoicePreview } from "../../store/invoice/invoiceAction";
import { setMessage } from '../../store/alerts/alertsActions';


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
    let [invoicePaymentAmount, setInvoicePaymentAmount] = useState(0);

    const onPreviewClick = () => {
        let isFormCorrect = true;

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
        else if (summaryData.bankAcc !== null && summaryData.bankAcc.length != 26)
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
        else if (summaryData.vatExemptionValueNp !== null && summaryData.vatExemptionValueNp == "")
            props.setMessage("Podstawa podatku VAT np jest niewpisana!", true);
        else if (summaryData.vatExemptionValueZw !== null && summaryData.vatExemptionValueZw == "")
            props.setMessage("Podstawa zwlnienia podatku VAT zw jest niewpisana!", true);
        else if (summaryData.paid > invoicePaymentAmount)
            props.setMessage("Nadpłaty obecnie nie są obsługiwane. Kwota \"Zapłacono\" musi być mniejsza bądź równa kwocie \"Do zapłaty\"", true);

        else {
            const commodities = []
            for (let key in invoiceCommodities) {
                if (invoiceCommodities[key].name === "") {
                    props.setMessage("Brak nawzy towaru bądź usługi!", true);
                    isFormCorrect = false
                    break;
                }
                if (invoiceCommodities[key].measure === "") {
                    props.setMessage("Gdzieś nie jest wybrana jednostka miary!", true);
                    isFormCorrect = false
                    break;
                }
                if (invoiceCommodities[key].amount <= 0) {
                    props.setMessage("Chcesz sprzedać 0 towaru!", true);
                    isFormCorrect = false
                    break;
                }
                commodities.push(invoiceCommodities[key]);
            }

            if (isFormCorrect) {

                let seller = { ...partiesData.seller };
                let buyer = { ...partiesData.buyer };
                let header = { ...headerData };
                let summary = { ...summaryData }

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

                //props.putInvoice(props.match.params.dbId, data);
                props.invoicePreview(data)
            }
        }
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
                setInvoicePaymentAmount={setInvoicePaymentAmount}
            />
            <hr className="hr-margin" />
            <InvoiceSummary
                summaryData={summaryData}
                setSummaryData={setSummaryData}
                invoicePaymentAmount={invoicePaymentAmount} />

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
        setMessage: (message, isError) => dispatch(setMessage(message, isError)),
        invoicePreview: (data) => dispatch(invoicePreview(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);