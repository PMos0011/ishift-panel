import * as actionTypes from '../actions';
import axios from 'axios'

import { setMessage } from '../alerts/alertsActions';
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

export const getInvoiceTypes = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice/" + id,
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
        axios.put(actionTypes.SERVER_ADDRESS + "/invoice/" + id,
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

export const getVatTypes = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice/vat/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setVatTypes(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const setVatTypes = (data) => {
    return {
        type: actionTypes.GET_VAT_TYPES,
        data: data
    }
}

export const test = (data) => {
    return (dispatch) => {
        axios.put(actionTypes.SERVER_ADDRESS + "/test/",data,
            {
                responseType: 'blob',
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                generate(response.data)

            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const generate = (data) =>{
    const file = new Blob(
        [data],
        { type: 'application/pdf' }
    );
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
}