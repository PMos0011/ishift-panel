import * as actionTypes from '../actions';
import axios from 'axios'

import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';
import { getToken } from '../authorization/authAction';

export const getAllCustomers = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/customers/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setCompanyNames(response.data));
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


export const getCustomerData = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/customer/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setCustomerData(response.data));
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

const setCompanyNames = (comapnyNames) => {
    return {
        type: actionTypes.GET_ALL_CUSTOMERS,
        names: comapnyNames
    }
}

const setCustomerData = (data) => {
    return {
        type: actionTypes.GET_CUSTOMER_DATA,
        data: data
    }
}

export const clearCustomerData = () => {
    return (dispatch) =>
        dispatch(
            setCustomerData(
                {
                    companyData: [],
                    companyName: "",
                    companyId: ""
                }
            ))
}