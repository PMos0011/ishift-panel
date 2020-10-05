import * as actionTypes from '../actions';
import axios from 'axios'

import { getToken } from '../authorization/authAction';

export const getAccOfficeData = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/accOffice/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setAccOfficeData(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const setAccOfficeData = (accOfficeData) => {
    return {
        type: actionTypes.GET_ACCOUNTING_OFFICE_DATA,
        data: accOfficeData
    }
}