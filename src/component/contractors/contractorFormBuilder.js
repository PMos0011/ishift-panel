let form = (contractor) => {

    return [
        {
            id: "name",
            label: "Kontrahent:",
            value: contractor.name,
            elemConf: {
                type: "text",
                name: "name"
            }
        },
        {
            id: "nip",
            label: "NIP:",
            value: contractor.nip,
            elemConf: {
                type: "number",
                name: "nip",
                className: "input-number-no-arrow"
            }
        },
        {
            id: "regon",
            label: "REGON: ",
            value: contractor.regon,
            elemConf: {
                type: "number",
                name: "regon",
                className: "input-number-no-arrow"
            }
        },
        {
            id: "zipCode",
            label: "Kod pocztowy: ",
            value: contractor.zipCode,
            elemConf: {
                type: "text",
                name: "zipCode"
            }
        },
        {
            id: "city",
            label: "Miasto:",
            value: contractor.city,
            elemConf: {
                type: "text",
                name: "city"
            }
        },
        {
            id: "street",
            label: "Ulica: ",
            value: contractor.street,
            elemConf: {
                type: "text",
                name: "street"
            }
        },
        {
            id: "streetNumber",
            label: "Numer domu:",
            value: contractor.streetNumber,
            elemConf: {
                type: "text",
                name: "streetNumber"
            }
        },
        {
            id: "localNumber",
            label: "Numer lokalu:",
            value: contractor.localNumber,
            elemConf: {
                type: "text",
                name: "localNumber"
            }
        },
        {
            id: "phoneNumber",
            label: "Numer telefonu:",
            value: contractor.phoneNumber,
            elemConf: {
                type: "tel",
                name: "phoneNumber"
            }
        },
        {
            id: "email",
            label: "Adres e-mail:",
            value: contractor.email,
            elemConf: {
                type: "email",
                name: "email"
            }
        }
    ]
}

export let newObject = {
    city: "",
    email: "",
    id: "",
    localNumber: "",
    name: "",
    nip: "",
    phoneNumber: "",
    regon: "",
    street: "",
    streetNumber: "",
    zipCode: ""
}

export default form;