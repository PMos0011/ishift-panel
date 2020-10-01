import * as actionTypes from '../actions';
import axios from 'axios'

import { getToken } from '../authorization/authAction';

export const getAllDocuments = (id) => {
    return (dispatch) => {
        axios.get("http://localhost:8080/documents/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setDocuments(response.data))
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const setDocuments = (documents) => {
    return {
        type: actionTypes.GET_ALL_DOCUMENTS,
        documents: documents
    }
}