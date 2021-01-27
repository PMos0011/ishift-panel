import * as actionTypes from '../actions';
import { setLoadingSpinner } from '../alerts/alertsActions';
import jwt_decode from "jwt-decode";

import httpErrorHandling from "../errorHandling";

import axios from 'axios';

export const authorizeUser = (userName, password) => {

    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.post(actionTypes.SERVER_ADDRESS + "/login", {
            userName: userName,
            password: password
        })
            .then((response) => {
                dispatch(setToken(response.headers.authorization, response.headers.expires));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                httpErrorHandling(err, dispatch);

            })
    }
}

export const newAuthData = (token, expireDate) => {
    let decodedToken = jwt_decode(token);
    let isAdmin = false;
    let access = "";

    decodedToken.authority.map((auth) => {
        if (auth.authority === "ROLE_ADMIN")
            isAdmin = true;
        else
            access = auth.authority;
    })

    const newAuthData =
    {
        token: token,
        expireDate: expireDate,
        isAuthenticated: true,
        dataAccess: access,
        isAdmin: isAdmin
    }
    return newAuthData
}

export const setToken = (token, expireDate) => {

    localStorage.setItem("token", token);
    localStorage.setItem("expireDate", expireDate);
    localStorage.setItem("isAuthenticated", true);

    return {
        type: actionTypes.AUTHORIZE_USER,
        data: newAuthData(token, expireDate),
    }
}

export const checkUserAuthentication = () => {
    return (dispatch) => {

        if (localStorage.getItem("isAuthenticated")) {
            const expireDate = Date.parse(localStorage.getItem("expireDate"));
            const currentDate = new Date();

            if (isNaN(expireDate))
                dispatch(logoutUser())
            else if (expireDate < currentDate)
                dispatch(logoutUser())
        }
    }
}

export const logoutUser = () => {
    return {
        type: actionTypes.LOGOUT_USER,
    }
}

export const getToken = () => {
    return localStorage.getItem("token")
}