import * as actionTypes from '../actions';
import axios from 'axios'

import { getToken } from '../authorization/authAction';

export const getAllCustomers = () => {
    return (dispatch) => {
        axios.get("http://localhost:8080/customers",
            {
                headers: {
                'Authorization':getToken()
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

const setCompanyNames = (comapnyNames) =>{
    return{
        type: actionTypes.GET_ALL_CUSTOMERS,
        names:comapnyNames
    }
}