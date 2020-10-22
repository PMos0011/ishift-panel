let emptyData = {
    name: "",
    idType: 0,
    idName: "NIP",
    idValue: ["",""],
    street: "",
    city: ""
}

export const setHeaderBeginState = (selectOptions, customer, invoiceType) => {

    let newHeaderData = {
        invoiceTypeId: selectOptions[0].value,
        invoiceTypeName: selectOptions[0].label,
        invoiceNumber: invoiceNumberBuilder(invoiceType, selectOptions[0].value),
        placeOfIssue: invoicePlaceOfIssueBuilder(customer),
        issueDate: new Date(),
        sellDate: new Date()
    }

    return newHeaderData;
}


export const invoiceNumberBuilder = (invoiceType, selectedTypeId) => {

    let object = invoiceType.find(type => type.id === selectedTypeId);

    let prefix = ""
    if (object !== undefined)
        prefix = object.prefix;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let number = prefix + "/1/" + month + "/" + year;

    return number;

}

const invoicePlaceOfIssueBuilder = (customer) => {

    let data = ""
    if (customer.companyData.length > 0)
        data = customer.companyData.find(data => data.companyNumber === 1112)
    return data.companyData;
}


export const sellerDataBuilder = (sellerData, id) => {
    let data = { ...emptyData };

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




