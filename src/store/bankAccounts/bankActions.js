import * as actionTypes from '../actions';
import axios from 'axios'

import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';
import { getToken } from '../authorization/authAction';

export const getBankAccountsData = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/bankAccounts/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                let options = [];
                response.data.map(acc => {
                    options.push({ value: acc.id, label: acc.accountNumber })
                });
                dispatch(setBankAccounts(response.data));
                dispatch(setBankAccountsSelectOptions(options));
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

const setBankAccounts = (data) => {
    return {
        type: actionTypes.GET_BANK_ACCOUNTS,
        data: data
    }
}

const setBankAccountsSelectOptions = (data) => {
    return {
        type: actionTypes.SET_BANK_ACCOUNTS_SELECT_OPTIONS,
        data: data
    }
}

export const saveBankAccount = (data, dataAccess) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/bankAccounts/" + dataAccess,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setBankAccounts(response.data));
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

export const deleteBankAccount = (dataAccess, id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.delete(actionTypes.SERVER_ADDRESS + "/bankAccounts/" + dataAccess + "/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setBankAccounts(response.data));
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