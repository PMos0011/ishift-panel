import * as actionTypes from '../actions';
import axios from 'axios'
import jwt_decode from "jwt-decode";

import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';
import { getToken, logoutUser } from '../authorization/authAction';
import { getCustomerData } from "../customers/customersActions";
import httpErrorHandling from "../errorHandling";


export const getUsersList = () => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/accessData",
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setLoginList(response.data));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                httpErrorHandling(err, dispatch);
            })
    }
}

const setLoginList = (list) => {
    return {
        type: actionTypes.GET_LOGIN_LIST,
        list: list
    }
}

export const changeAccessData = (newlogin, newPassword, oldPassword) => {

    return (dispatch) => {
        if (jwt_decode(localStorage.getItem("token")).sub !== "demo") {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/settings/accessData",
            {
                newLogin: newlogin,
                newPassword: newPassword,
                oldLogin: jwt_decode(localStorage.getItem("token")).sub,
                oldPassword: oldPassword
            },
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then(() => {
                dispatch(setMessage(messages.SUCCESS_LOGIN_CHANGE, false));
                setTimeout(() => dispatch(logoutUser()), 5000);
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                httpErrorHandling(err, dispatch);
            })
        } else
        dispatch(setMessage(messages.DEMO_ALERT, true));
    }
}

export const changeMyData = (data, dataAccess) => {
    return (dispatch) => {
        if (dataAccess !== "demo") {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/settings/myData/" + dataAccess,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then(() => {
                dispatch(setMessage(messages.DATA_CHANGED, false));
                dispatch(getCustomerData(dataAccess));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                httpErrorHandling(err, dispatch);
            })
        } else
        dispatch(setMessage(messages.DEMO_ALERT, true));
    }
}