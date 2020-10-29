import * as actionTypes from '../actions';
import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';
import axios from 'axios'

import { getToken } from '../authorization/authAction';

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
                if (err.response !== undefined) {
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
                }
                else
                    dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
            })
    }
}

const setAccOfficeData = (accOfficeData) => {
    return {
        type: actionTypes.GET_ACCOUNTING_OFFICE_DATA,
        data: accOfficeData
    }
}