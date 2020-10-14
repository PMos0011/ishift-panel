import * as actionTypes from '../actions';
import axios from 'axios'

import { setErrorMessage } from '../errosHandling/errorActions';
import { getToken } from '../authorization/authAction';

export const getContractors = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/contractors/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setContractors(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const setContractors = (data) => {
    data =  data.sort((a,b)=>a.name.localeCompare(b.name))
    return {
        type: actionTypes.GET_CONTRACTORS,
        data: data
    }
}

export const saveContractor = (data, dataAccess) => {
    return (dispatch) => {
        axios.put(actionTypes.SERVER_ADDRESS + "/contractors/" + dataAccess,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setContractors(response.data))
            }).catch((err) => {
                if (err.response !== undefined) {
                        dispatch(setErrorMessage("Coś poszło nie tak", true));
                }
                else
                    dispatch(setErrorMessage("Błąd komuniacji z serwerem. Spróbuj ponownie później", true));
            })
    }
}

export const deleteContractor = (dataAccess, id) => {
    return (dispatch) => {
        axios.delete(actionTypes.SERVER_ADDRESS + "/contractors/" + dataAccess + "/"+ id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setContractors(response.data))
            }).catch((err) => {
                if (err.response !== undefined) {
                        dispatch(setErrorMessage("Coś poszło nie tak", true));
                }
                else
                    dispatch(setErrorMessage("Błąd komuniacji z serwerem. Spróbuj ponownie później", true));
            })
    }
}