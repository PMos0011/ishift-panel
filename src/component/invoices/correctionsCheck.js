import { setPartiesDatatBeginState, setSummaryBeginState } from "./invoiceDataBuilder";

const createinvoiceToCorrection = (invoices, id, seller, contractorIdOption, invoicePaymnetStatusOption) => {

    let newInvoice = true;
    if (id != 0)
        newInvoice = false;

    let invoice = {
        headerData: {
            invoiceNumber: ""
        },
        correctionData: {},
        partiesData: setPartiesDatatBeginState(seller, contractorIdOption),
        invoiceCommodities: {},
        summaryData: setSummaryBeginState(invoicePaymnetStatusOption)
    }

    let newCurrencyData = {
        currentCurrency: "PLN",
        exchangeDate: null,
        exchangeRate: null,
        exchangeBasis: null
    }

    if (!newInvoice) {

        try {
            let invoiceToCorrection = invoices.find(inv => inv.id == id);

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
            newCurrencyData.currentCurrency = invoiceToCorrection.currency;

            if (invoiceToCorrection.invoiceExchangeRate) {
                newCurrencyData.exchangeDate = new Date(invoiceToCorrection.invoiceExchangeRate.exchangeDate);
                newCurrencyData.exchangeRate = invoiceToCorrection.invoiceExchangeRate.exchangeRate;
                newCurrencyData.exchangeBasis = invoiceToCorrection.invoiceExchangeRate.exchangeBasis;
            }

        }
        catch (error) { }
    }

    return {
        invoice,
        newCurrencyData,
        newInvoice
    }
}

export default createinvoiceToCorrection;