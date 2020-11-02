import * as actionTypes from '../actions';
import axios from 'axios'

import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';
import { getToken } from '../authorization/authAction';

export const getInvoices = (id, beginDate, endDate) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/invoice/" + id,
            {
                beginDate: beginDate,
                endDate: endDate
            },
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                response.data.sort((a, b) => b.id - a.id);
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

export const getImportedInvoices = (id, beginDate, endDate) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/invoice/imported/" + id,
            {
                beginDate: beginDate,
                endDate: endDate
            },
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                response.data.sort((a, b) => b.issueDate - a.issueDate);
                dispatch(setImportedInvoices(response.data));
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

const setImportedInvoices = (data) => {
    return {
        type: actionTypes.GET_IMPORTED_INVOICES,
        data: data
    }
}

export const getLastInvoices = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setLastInvoice(response.data));
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

const setLastInvoice = (data) => {
    return {
        type: actionTypes.GET_LAST_INVOICE,
        data: data
    }
}

export const getInvoiceTypes = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice/types/" + id,
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

export const saveInvoice = (id, data) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/invoice/save/" + id,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setMessage(messages.DATA_SAVED, false));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
                }
                else
                    dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
            })
    }
};

export const saveInvoiceAndDownload = (id, data) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/invoice/save/preview/" + id,
            data,
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

export const invoicePreview = (data) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/invoice/preview", data,
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

export const invoicePreviewFromDataBase = (dbId, id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/invoice/preview/" + dbId + "/" + id,
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

const generate = (data) => {
    const file = new Blob(
        [data],
        { type: 'application/pdf' }
    );
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
}