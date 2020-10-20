import * as actionTypes from '../actions';

const initialState = {
    invoices:[],
    invoiceSelectOptions:[
        {value:0,
        label:"błąd pobierania"}
    ],
    invoiceType:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_INVOICES:
            return {
                ...state,
                invoices:action.data
            };
            case actionTypes.GET_INVOICE_TYPES:
                let selectOptions = [];
                action.data.map(d=>{
                    selectOptions.push({value:d.id, label:d.name})
                })
            return {
                ...state,
                invoiceType:action.data,
                invoiceSelectOptions:selectOptions
            }
        default:
            return state
    }
}

export default reducer;