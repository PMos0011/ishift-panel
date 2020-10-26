import * as actionTypes from '../actions';
import axios from 'axios'

import { setErrorMessage } from '../errosHandling/errorActions';
import { getToken } from '../authorization/authAction';

export const getInvoices = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setInvoices(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const setInvoices = (data) => {
    return {
        type: actionTypes.GET_INVOICES,
        data: data
    }
}

export const getInvoiceTypes = () => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice",
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setInvoiceTypes(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const setInvoiceTypes = (data) => {
    return {
        type: actionTypes.GET_INVOICE_TYPES,
        data: data
    }
}

export const putInvoice = (id, data) => {
    return (dispatch) => {
        axios.put(actionTypes.SERVER_ADDRESS + "/invoice/"+id,
        data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setInvoices(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}