import * as actionTypes from '../actions';
import axios from 'axios'

import { getToken } from '../authorization/authAction';

export const getAllDocuments = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/documents/" + id,
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

export const getDocumentDetails = (dbId, id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/documents/" + dbId + "/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setDocumentdetails(response.data))
            }).catch((err) => {
                //TODO
                console.log(err);
            })
    }
}

const setDocumentdetails = (document) => {
    return {
        type: actionTypes.GET_DOCUMENT_FULL_DETAILS,
        data: document
    }
}