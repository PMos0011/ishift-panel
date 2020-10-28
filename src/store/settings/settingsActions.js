import * as actionTypes from '../actions';
import axios from 'axios'
import jwt_decode from "jwt-decode";

import { setMessage } from '../alerts/alertsActions';
import { getToken, logoutUser } from '../authorization/authAction';


export const getUsersList = () => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/accessData",
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setLoginList(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
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
                dispatch(setMessage("Udało się! Za chwilę zostaniesz wylogowany", false));
                setTimeout(() => dispatch(logoutUser()), 5000)

            }).catch((err) => {
                if (err.response !== undefined) {
                    if (err.response.status === 400)
                        dispatch(setMessage("Nieprawidłowe hasło", true));

                    else if (err.response.status === 404)
                        dispatch(setMessage("Użytkownik nieznaleziony", true));

                    else if (err.response.status === 409)
                        dispatch(setMessage("Nazwa użytkownika jest już zajęta", true));
                }
                else
                    dispatch(setMessage("Błąd komuniacji z serwerem. Spróbuj ponownie później", true));


            })
    }
}

export const changeMyData = (data, dataAccess) => {
    return (dispatch) => {
        axios.put(actionTypes.SERVER_ADDRESS + "/settings/myData/" + dataAccess,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then(() => {
                dispatch(setMessage("dane zostały zmienione", false));
            }).catch((err) => {
                if (err.response !== undefined) {
                        dispatch(setMessage("Coś poszło nie tak", true));
                }
                else
                    dispatch(setMessage("Błąd komuniacji z serwerem. Spróbuj ponownie później", true));
            })
    }
}