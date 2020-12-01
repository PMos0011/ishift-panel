let emptyData = {
    name: "",
    idType: 0,
    idName: "NIP",
    idValue: ["", ""],
    street: "",
    city: ""
}

export const setHeaderBeginState = (selectOption, customer, invoiceType, lastInvoice, invoiceSellDate, id) => {

    let newSellDate = new Date();
    if (invoiceSellDate !== undefined)
        newSellDate = new Date(invoiceSellDate);

     
    let newId = null;
    if (id !== undefined)
        newId = id

    let newHeaderData = {
        invoiceTypeId: selectOption.value,
        invoiceTypeName: selectOption.label,
        invoiceNumber: invoiceNumberBuilder(invoiceType, selectOption.value, lastInvoice),
        placeOfIssue: invoicePlaceOfIssueBuilder(customer),
        issueDate: new Date(),
        sellDate: newSellDate,
        id: newId,
        correctionReason: null,
        billingInvoice:null
    }

    return newHeaderData;
}


export const invoiceNumberBuilder = (invoiceType, selectedTypeId, lastInvoice) => {

    let object = invoiceType.find(type => type.id === selectedTypeId);
    let number = 1

    try {
        lastInvoice = lastInvoice.find(invoice=>object.id===invoice.id);
        const invoiceNumberArray = lastInvoice.number.split("/");
        const month = Number(invoiceNumberArray[invoiceNumberArray.length - 2]);
        if (month == new Date().getMonth() + 1) {
            number = Number(invoiceNumberArray[invoiceNumberArray.length - 3]);
            number++;
        }

    } catch (error) { }

    let prefix = ""
    if (object !== undefined)
        prefix = object.prefix;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return prefix + "/" + number + "/" + month + "/" + year;

}

const invoicePlaceOfIssueBuilder = (customer) => {

    let data = ""
    if (customer.companyData.length > 0)
        data = customer.companyData.find(data => data.companyNumber === 1112)
    return data.companyData;
}


const sellerDataBuilder = (sellerData, id) => {
    let data = { ...emptyData };
    data.idType = 0;
    data.idName = "NIP"

    if (sellerData.companyData.length > 0) {
        let street = "";
        let streetNum = "";
        let localNum = "";
        let city = "";
        let zipCode = "";
        let nip = "";
        let regon = "";

        sellerData.companyData.map(company => {

            switch (company.companyNumber) {
                case 1119:
                    data.name = company.companyData;
                    break;
                case 1101:
                    nip = company.companyData;
                    break;
                case 1118:
                    regon = company.companyData;
                    break;
                case 1109:
                    street = company.companyData;
                    break;
                case 1110:
                    streetNum = company.companyData;
                    break;
                case 1111:
                    if (company.companyData !== "")
                        localNum = "/" + company.companyData;
                    break;
                case 1114:
                    city = company.companyData;
                    break;
                case 1113:
                    zipCode = company.companyData;
                    break;
            }
        })

        data.street = street + " " + streetNum + localNum;
        data.city = zipCode + " " + city;

        data.idType = id.value;
        data.idName = id.label;
        data.idValue = [nip, regon];
    }

    return data;
}

export const buyerDataBuilder = (contractor, newData) => {

    newData.idValue = [contractor.nip, contractor.regon]

    newData.name = contractor.name;
    newData.street = contractor.street + " " + contractor.streetNumber;
    if (contractor.localNumber !== "")
        newData.street = newData.street + "/" + contractor.localNumber;

    newData.city = contractor.zipCode + " " + contractor.city

    return newData;

}

export const setPartiesDatatBeginState = (sellerData, id) => {

    let newSellerData = sellerDataBuilder(sellerData, id);

    let buyerData = { ...emptyData }

    return {
        seller: newSellerData,
        buyer: buyerData
    }
}

export const setSummaryBeginState = (invoicePaymnetStatusOption) => {

    return {
        statusId: invoicePaymnetStatusOption.value,
        statusIdValue: invoicePaymnetStatusOption.label,
        paidWay: null,
        paymentOptionIdValue: null,
        paid: null,
        paymentDay: null,
        paidDay: null,
        bankAcc: null,
        comments: null,
        vatExemptionLabelNp: null,
        vatExemptionValueNp: null,
        vatExemptionLabelZw: null,
        vatExemptionValueZw: null
    }

}

export const setAdvancedPayment = () =>{
    return  {
        advPaym: {
            name: "Zaliczka",
            measure: "szt.",
            amount: 1,
            price: 0,
            discount: 0,
            nettoAmount: "",
            vat: 0,
            vatAmount: "",
            brutto: "",
            id: null
        }
    }
}

export const timeZoneCorrection = (time) => {

    const UTCOffset = time.getTimezoneOffset() * 60 * 1000;
    return time.getTime() - UTCOffset;

}