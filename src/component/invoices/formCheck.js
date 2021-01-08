import {store} from "../../index";

import { setMessage } from '../../store/alerts/alertsActions';

import { isBankAccountNumberIncorrect } from "../bankAccounts/converters";
import { timeZoneCorrection } from "./invoiceDataBuilder";

const dispatchMessage = (message, isAlert) =>{
    store.dispatch(setMessage(message, isAlert));
}

const basicsFormCheck = (partiesData, invoiceCommodities, headerData, summaryData, correctionData, newInvoice) => {
    if (partiesData.buyer.name === "")
        dispatchMessage("Brak nabywcy!", true);
    else if (Object.keys(invoiceCommodities) < 1)
        dispatchMessage("Brak towarów!", true);
    else if (headerData.placeOfIssue === "")
        dispatchMessage("Brak miejsca sprzedaży!", true);
    else if (headerData.invoiceNumber === "")
        dispatchMessage("Brak numeru faktury!", true);
    else if (summaryData.bankAcc !== null && summaryData.bankAcc === "")
        dispatchMessage("Numer konta jest nieuzupełniony!", true);
    else if (summaryData.bankAcc !== null && isBankAccountNumberIncorrect(summaryData.bankAcc))
        dispatchMessage("Niepoprawny numer konta!", true);
    else if (summaryData.paid !== null && summaryData.paid == "")
        dispatchMessage("Nie ma wpisanej kwoty w \"Zapłacono\"!", true);
    else if (summaryData.paidDay !== null && summaryData.paidDay == "")
        dispatchMessage("Nie wybrano daty płatności!", true);
    else if (summaryData.paidWay !== null && summaryData.paidWay == "")
        dispatchMessage("Nie wybrano sposobu płatności!", true);
    else if (summaryData.paymentDay !== null && summaryData.paymentDay == "")
        dispatchMessage("Nie wybrano terminu płatności!", true);
    else if (summaryData.comments !== null && summaryData.comments == "")
        dispatchMessage("Uwagi są niewpisane!", true);
    else if (summaryData.vatExemptionValueNp !== null && summaryData.vatExemptionLabelNp !== "" && summaryData.vatExemptionValueNp == "")
        dispatchMessage("Podstawa podatku VAT np jest niewpisana!", true);
    else if (summaryData.vatExemptionValueZw !== null && summaryData.vatExemptionLabelZw !== "" && summaryData.vatExemptionValueZw == "")
        dispatchMessage("Podstawa zwlnienia podatku VAT zw jest niewpisana!", true);
    else if (correctionData.correctionReason === "" && !newInvoice)
        dispatchMessage("Brak powodu korekty", true);
    else
        return true;

    return false;
}

const commoditiesCheck = (invoiceCommodities, newInvoice) => {

    const commodities = []
    for (let key in invoiceCommodities) {
        if (invoiceCommodities[key].name === "") {
            dispatchMessage("Brak nawzy towaru bądź usługi!", true);
            return null;
        }
        if (invoiceCommodities[key].measure === "") {
            dispatchMessage("Gdzieś nie jest wybrana jednostka miary!", true);
            return null;
        }
        if (invoiceCommodities[key].amount <= 0 && newInvoice) {
            dispatchMessage("Chcesz sprzedać 0 towaru!", true);
            return null;
        }
        commodities.push(invoiceCommodities[key]);
    }

    return commodities;
}

const createDataToSend = (commodities, partiesData, headerData, summaryData, correctionData, currencyData, usedAdvancedInvoices, newInvoice) => {
    let seller = { ...partiesData.seller };
    let buyer = { ...partiesData.buyer };
    let header = { ...headerData };
    let summary = { ...summaryData };
    let usedAdvInvoices = [...usedAdvancedInvoices];
    let invoiceExchangeRate = null;

    seller.idValue = partiesData.seller.idValue[partiesData.seller.idType];
    buyer.idValue = partiesData.buyer.idValue[partiesData.buyer.idType];
    if (buyer.idValue === undefined || buyer.idValue === null || buyer.idValue === "") {
        buyer.idValue = ""
        buyer.idName = ""
    }

    if (!newInvoice)
        header.correctionReason = correctionData.correctionReason;
    header.issueDate = timeZoneCorrection(headerData.issueDate);
    header.sellDate = timeZoneCorrection(headerData.sellDate);
    header.currency = currencyData.currentCurrency;

    if (summary.paidDay !== null)
        summary.paidDay = timeZoneCorrection(summaryData.paidDay);
    if (summary.paymentDay !== null)
        summary.paymentDay = timeZoneCorrection(summaryData.paymentDay);

    if (currencyData.exchangeRate) {
        invoiceExchangeRate = { ...currencyData }
        invoiceExchangeRate.exchangeDate = timeZoneCorrection(invoiceExchangeRate.exchangeDate);
    }

    const data = {
        header,
        seller,
        buyer,
        commodities,
        summary,
        usedAdvInvoices,
        invoiceExchangeRate
    }


    return data;
}

const createData = (partiesData, invoiceCommodities, headerData, summaryData, correctionData, currencyData, usedAdvancedInvoices, newInvoice) => {

    if (basicsFormCheck(partiesData, invoiceCommodities, headerData, summaryData, correctionData, newInvoice)) {
        const commodities = commoditiesCheck(invoiceCommodities, newInvoice)
        if (commodities)
            return createDataToSend(commodities, partiesData, headerData, summaryData, correctionData, currencyData, usedAdvancedInvoices, newInvoice);
    }
    return null
}


export default createData;