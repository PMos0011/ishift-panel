export const invoiceNumberBuilder = (invoiceType) => {

    let prefix = ""
    if (invoiceType !== undefined)
        prefix = invoiceType.prefix;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let number = prefix + "/1/" + month + "/" + year;

    return number;

}

export const invoicePlaceOfIssueBuilder = (customer) => {

    let data = ""
    if (customer.companyData.length > 0)
        data = customer.companyData.find(data => data.companyNumber === 1112)
    return data.companyData;
}

export const partyOption = () => {

    let partyOption = [];
    const partySelectOptions = ["NIP", "REGON"];

    for (let i = 0; i < partySelectOptions.length; i++)
        partyOption.push({ value: i, label: partySelectOptions[i] })

    return partyOption;
}

export let emptyData = {
    name: "",
    idType: "",
    street: "",
    city: ""
}

export const myCompanyDataBuilder = (customerData, id) => {
    let data = { ...emptyData };

    if (customerData.companyData.length > 0) {
        let street = "";
        let streetNum = "";
        let localNum = "";
        let city = "";
        let zipCode = "";
        let nip = "";
        let regon = "";

        customerData.companyData.map(company => {

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

        if (id === 0)
            data.idType = nip;
        else
            data.idType = regon;
    }

    return data;
}

export const contractorDataBuilder = (contractor, id) => {
    let data = { ...emptyData }

    if (id === 0)
        data.idType = contractor.nip;
    else
        data.idType = contractor.regon;

    data.name = contractor.name;
    data.street = contractor.street + " " + contractor.streetNumber;
    if (contractor.localNumber !== "")
        data.street = data.street + "/" + contractor.localNumber;

    data.city = contractor.zipCode + " " + contractor.city

    return data;

}




