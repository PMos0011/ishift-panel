import * as actionTypes from '../actions';

const initialState = {
    invoices: [],
    invoiceSelectOptions: [{ value: 0, label: "" }],
    invoiceType: [{ value: 0, label: "" }],
    invoicePaymentOptions: [
        { value: 0, label: "przelew" },
        { value: 1, label: "za pobraniem" },
        { value: 2, label: "gotówka" },
        { value: 3, label: "karta płatnicza" },
        { value: 4, label: "zgodnie z umową" },
        { value: 5, label: "zapłacono przelewem" },
        { value: 6, label: "zapłacono za pobraniem" },
        { value: 7, label: "zapłacono gotówką" },
        { value: 8, label: "zapłacono kartą płatniczą" }
    ],
    invoicePaymnetStatusOptions: [
        { value: 0, label: "niezapłacona" },
        { value: 1, label: "zapłacona" },
        { value: 2, label: "częściowo zapłacona" },
    ],
    vatTypes:[ { value: 0, label: "" }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_INVOICES:
            return {
                ...state,
                invoices: action.data
            };
        case actionTypes.GET_INVOICE_TYPES:
            let selectOptions = [];
            action.data.map(d => {
                selectOptions.push({ value: d.id, label: d.name })
            })
            return {
                ...state,
                invoiceType: action.data,
                invoiceSelectOptions: selectOptions
            };
            case actionTypes.GET_VAT_TYPES:
                return {
                    ...state,
                    vatTypes: action.data
                };
        default:
            return state
    }
}

export default reducer;