import * as actionTypes from '../actions';
import axios from 'axios'
import { convertToDate } from '../../component/documents/documentConverters';
import map from "../../component/documents/supportedDocuments";

import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';
import { getToken } from '../authorization/authAction';

export const getAllDocuments = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/documents/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                convertResponseToDate(response);
                let options = createOptions(response);
                dispatch(setDocuments(response.data, options));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
                }
                else
                    dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
            })
    }
}

const convertResponseToDate = (response) => {
    response.data.map(doc => {
        doc.rokMiesiac = convertToDate(doc.rokMiesiac)
    })
    response.data.sort((a, b) => b.rokMiesiac - a.rokMiesiac);
}

const createOptions = (response) => {
    let newMap = new Map(map);
    let newObject = [];

    response.data.map(doc => {
        if (newMap.get(doc.typDeklaracji) !== undefined) {
            newMap.delete(doc.typDeklaracji);
            newObject.push({
                value: doc.typDeklaracji,
                label: map.get(doc.typDeklaracji)
            })
        }
    })

    return newObject;
}


const setDocuments = (documents, options) => {
    return {
        type: actionTypes.GET_ALL_DOCUMENTS,
        documents: documents,
        options: options,
    }
}

export const getDocumentDetails = (dbId, id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/documents/" + dbId + "/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                response.data.rokMiesiac = convertToDate(response.data.rokMiesiac);
                dispatch(setDocumentdetails(response.data));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage(messages.GENERAL_ERROR, true));
                }
                else
                    dispatch(setMessage(messages.COMMUNICATION_ERROR, true));
            })
    }
}

const setDocumentdetails = (document) => {
    return {
        type: actionTypes.GET_DOCUMENT_FULL_DETAILS,
        data: document
    }
}