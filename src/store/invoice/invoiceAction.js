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

                let newData = [];
                response.data.map(invoice => {
                    if (invoice.id !== undefined) {
                        let tmpInvoice = { ...invoice }
                        tmpInvoice.correctionInvoice = null
                        newData.push(tmpInvoice);
                        let subinvoice = invoice.correctionInvoice;
                        while (subinvoice !== null) {
                            tmpInvoice = { ...subinvoice }
                            tmpInvoice.correctionInvoice = null;
                            newData.push(tmpInvoice);
                            subinvoice = subinvoice.correctionInvoice;
                        }
                    }
                })
                newData.sort((a, b) => b.issueDate - a.issueDate);
                dispatch(setInvoices(newData));
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
                let lastInvoices = [];
                for (let key in response.data) {
                    if (response.data[key] !== null)
                        if (!isNaN(response.data[key])) {
                            for (let keyB in response.data) {
                                if (response.data[keyB] !== null)
                                    if (response.data[keyB].correctionId === response.data[key]) {
                                        const lastInvoice = {
                                            id: response.data[keyB].correctionInvoice.invoiceTypeId,
                                            number: response.data[keyB].correctionInvoice.invoiceNumber
                                        }
                                        lastInvoices.push(lastInvoice);
                                    } else if (response.data[keyB].invoiceToCorrect)
                                        if (response.data[keyB].invoiceToCorrect.id === response.data[key]) {
                                            const lastInvoice = {
                                                id: response.data[keyB].invoiceToCorrect.invoiceTypeId,
                                                number: response.data[keyB].invoiceToCorrect.invoiceNumber
                                            }
                                            lastInvoices.push(lastInvoice);
                                        }
                            }
                        } else {
                            const lastInvoice = {
                                id: response.data[key].invoiceTypeId,
                                number: response.data[key].invoiceNumber
                            }
                            lastInvoices.push(lastInvoice);
                        }
                }
                dispatch(setLastInvoice(lastInvoices));
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
        if (id !== "demo") {
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
        } else
            dispatch(setMessage(messages.DEMO_ALERT, true));
    }
};

export const saveInvoiceAndDownload = (id, data) => {
    return (dispatch) => {
        if (id !== "demo") {
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
        } else
            dispatch(setMessage(messages.DEMO_ALERT, true));
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

export const invoicePreview = (id, data) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.post(actionTypes.SERVER_ADDRESS + "/invoice/preview/" + id, data,
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

export const getAdvancedInvoices = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/advancedInvoice/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                let advancedInvoicesData = [];
                let number;
                let buyer;
                let commodity;
                let issueDate;
                response.data.map(invoice => {
                    let subinvoice = invoice;
                    const invoiceId = subinvoice.id;
                    do {
                        number = subinvoice.invoiceNumber;
                        buyer = subinvoice.partiesData.find(data => data.partyId === 1)
                        commodity = subinvoice.invoiceCommodities;
                        issueDate = subinvoice.issueDate;
                        subinvoice = subinvoice.correctionInvoice;
                    }
                    while (subinvoice !== null)
                    const newAdvamcedInvoice = {
                        value: invoiceId,
                        label: number + " " + buyer.name + " " + commodity[0].bruttoAmount,
                        number: number,
                        issueDate: new Date(issueDate),
                        commodity: commodity
                    }
                    advancedInvoicesData.push(newAdvamcedInvoice);
                })

                dispatch(setAdvancedInvoices(advancedInvoicesData));
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

const setAdvancedInvoices = (data) => {
    return {
        type: actionTypes.GET_ADVANCED_INVOICES,
        data: data
    }
}