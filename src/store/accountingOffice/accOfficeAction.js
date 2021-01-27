import * as actionTypes from '../actions';
import { setLoadingSpinner } from '../alerts/alertsActions';
import axios from 'axios'

import { getToken } from '../authorization/authAction';
import httpErrorHandling from "../errorHandling";

export const getAccOfficeData = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/accOffice/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setAccOfficeData(response.data));
                dispatch(setLoadingSpinner(false))
            }).catch((err) => {
                httpErrorHandling(err, dispatch);
            })
    }
}

const setAccOfficeData = (accOfficeData) => {
    return {
        type: actionTypes.GET_ACCOUNTING_OFFICE_DATA,
        data: accOfficeData
    }
}