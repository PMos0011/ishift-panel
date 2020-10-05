import * as actionTypes from '../actions';
import * as errorHandling from '../errosHandling/errorActions';
import jwt_decode from "jwt-decode";


import axios from 'axios';

export const authorizeUser = (userName, password) => {
    return (dispatch) => {
        axios.post(actionTypes.SERVER_ADDRESS + "/login", {
            userName: userName,
            password: password
        })
            .then((response) => {
                dispatch(
                    setToken(response.headers.authorization, response.headers.expires)
                );
            }).catch((err) => {
                if (err.response !== undefined) {
                    if (err.response.status === 403)
                        dispatch(errorHandling.setErrorMessage("Nieprawidłowa nazwa użytkownika bądź hasło."));
                }
                else {
                    dispatch(errorHandling.setErrorMessage("Błąd komuniacji z serwerem. Spróbuj ponownie później."));
                }
            })
    }
}

const setToken = (token, expireDate) => {

    localStorage.setItem("token", token);
    localStorage.setItem("expireDate", expireDate);
    localStorage.setItem("isAuthenticated", true);


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

    return {
        type: actionTypes.AUTHORIZE_USER,
        data: newAuthData,
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

export const firstLoad = () => {

    const token = localStorage.getItem("token");
    const expiratinDate = localStorage.getItem("expireDate");

    if (token !== null
        && expiratinDate !== null)
        return (dispatch) => {
            dispatch(setToken(token, expiratinDate),
            );
        }

    return { type: null }
}

export const getToken = () => {
    return localStorage.getItem("token")
}