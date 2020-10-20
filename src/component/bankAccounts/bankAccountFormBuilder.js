let form = (acc) => {

    return [
        {
            id: "accountNumber",
            label: "Numer konta:",
            value: acc.accountNumber,
            elemConf: {
                type: "number",
                name: "accountNumber",
                className: "input-number-no-arrow"
            }
        },
        {
            id: "bankName",
            label: "Nazwa banku:",
            value: acc.bankName,
            elemConf: {
                type: "text",
                name: "bankName"
            }
        },
        {
            id: "zipCode",
            label: "Kod pocztowy: ",
            value: acc.zipCode,
            elemConf: {
                type: "text",
                name: "zipCode"
            }
        },
        {
            id: "city",
            label: "Miasto:",
            value: acc.city,
            elemConf: {
                type: "text",
                name: "city"
            }
        },
        {
            id: "street",
            label: "Ulica: ",
            value: acc.street,
            elemConf: {
                type: "text",
                name: "street"
            }
        },
        {
            id: "streetNumber",
            label: "Numer domu:",
            value: acc.streetNumber,
            elemConf: {
                type: "text",
                name: "streetNumber"
            }
        },
        {
            id: "localNumber",
            label: "Numer lokalu:",
            value: acc.localNumber,
            elemConf: {
                type: "text",
                name: "localNumber"
            }
        }
    ]
}

export let newObject = {
    accountNumber: "",
    bankName: "",
    city: "",
    id: "",
    localNumber: "",
    street: "",
    streetNumber: "",
    zipCode: ""
}

export default form;