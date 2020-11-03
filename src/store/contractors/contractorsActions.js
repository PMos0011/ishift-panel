import * as actionTypes from '../actions';
import axios from 'axios'

import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';
import { getToken } from '../authorization/authAction';

export const getContractors = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/contractors/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setContractors(response.data));
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

const setContractors = (data) => {
    data = data.sort((a, b) => a.name.localeCompare(b.name))
    let options = [];
    for (let i = 0; i < data.length; i++)
        options.push(
            {
                value: i,
                label: data[i].name
            }
        );

    return {
        type: actionTypes.GET_CONTRACTORS,
        data: data,
        options: options
    }
}

export const saveContractor = (data, dataAccess) => {
    return (dispatch) => {
        if (dataAccess !== "demo") {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/contractors/" + dataAccess,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setContractors(response.data));
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

export const deleteContractor = (dataAccess, id) => {
    return (dispatch) => {
        if (dataAccess !== "demo") {
        dispatch(setLoadingSpinner(true));
        axios.delete(actionTypes.SERVER_ADDRESS + "/contractors/" + dataAccess + "/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setContractors(response.data));
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