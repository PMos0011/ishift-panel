import * as actionTypes from '../actions';
import axios from 'axios'

import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';
import { getToken } from '../authorization/authAction';

export const getInvoices = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setInvoices(response.data));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
                }
                else
                    dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
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
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setInvoiceTypes(response.data))
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
                }
                else
                    dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
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
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/invoice/" + id,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setInvoices(response.data))
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
                }
                else
                    dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
            })
    }
}

export const getVatTypes = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice/vat/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setVatTypes(response.data));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
                }
                else
                    dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
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
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/test/",data,
            {
                responseType: 'blob',
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                generate(response.data);
                dispatch(setLoadingSpinner(false));

            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
                }
                else
                    dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
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