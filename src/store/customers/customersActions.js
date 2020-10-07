import * as actionTypes from '../actions';
import axios from 'axios'

import { getToken } from '../authorization/authAction';

export const getAllCustomers = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/customers/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setCompanyNames(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}


export const getCustomerData = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/customer/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setCustomerData(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
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