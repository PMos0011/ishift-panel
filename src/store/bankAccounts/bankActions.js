import * as actionTypes from '../actions';
import axios from 'axios'

import { setErrorMessage } from '../errosHandling/errorActions';
import { getToken } from '../authorization/authAction';

export const getBankAccountsData = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/bankAccounts/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setBankAccounts(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const setBankAccounts = (data) => {
    return {
        type: actionTypes.GET_BANK_ACCOUNTS,
        data: data
    }
}

export const saveBankAccount = (data, dataAccess) => {
    return (dispatch) => {
        axios.put(actionTypes.SERVER_ADDRESS + "/bankAccounts/" + dataAccess,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setBankAccounts(response.data))
            }).catch((err) => {
                if (err.response !== undefined) {
                        dispatch(setErrorMessage("Coś poszło nie tak", true));
                }
                else
                    dispatch(setErrorMessage("Błąd komuniacji z serwerem. Spróbuj ponownie później", true));
            })
    }
}

export const deleteBankAccount = (dataAccess, id) => {
    return (dispatch) => {
        axios.delete(actionTypes.SERVER_ADDRESS + "/bankAccounts/" + dataAccess + "/"+ id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setBankAccounts(response.data))
            }).catch((err) => {
                if (err.response !== undefined) {
                        dispatch(setErrorMessage("Coś poszło nie tak", true));
                }
                else
                    dispatch(setErrorMessage("Błąd komuniacji z serwerem. Spróbuj ponownie później", true));
            })
    }
}