import * as actionTypes from '../actions';
import axios from 'axios'

import { getToken } from '../authorization/authAction';

export const getBankAccountsData = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/bankAccounts/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setBankAccounts(response.data)
                )
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const setBankAccounts = (data) => {
    return {
        type: actionTypes.GET_BANK_ACCOUNTS,
        data: data
    }
}