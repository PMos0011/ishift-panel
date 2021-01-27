import * as actionTypes from '../actions';
import axios from 'axios'

import * as messages from "../alertsMessages";
import { setMessage, setLoadingSpinner } from '../alerts/alertsActions';
import { getToken } from '../authorization/authAction';
import httpErrorHandling from "../errorHandling";

export const getCommoditiesData = (id) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(true));
        axios.get(actionTypes.SERVER_ADDRESS + "/commodity/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {

                let selectOptions = [];
                response.data.map(obj => {
                    selectOptions.push(
                        {
                            value: obj.id,
                            label: obj.name
                        }
                    )
                })
                dispatch(setCommodityOptions(selectOptions));
                dispatch(setCommodities(response.data));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                httpErrorHandling(err, dispatch);
            })
    }
}

const setCommodities = (data) => {
    data = data.sort((a, b) => a.name.localeCompare(b.name))
    return {
        type: actionTypes.GET_COMMODITY,
        data: data
    }
}

export const saveCommodity = (data, dataAccess) => {
    return (dispatch) => {
        if (dataAccess !== "demo") {
        dispatch(setLoadingSpinner(true));
        axios.put(actionTypes.SERVER_ADDRESS + "/commodity/" + dataAccess,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setCommodities(response.data));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                httpErrorHandling(err, dispatch);
            })} else
            dispatch(setMessage(messages.DEMO_ALERT, true));
    }
}

export const deleteCommodity = (dataAccess, id) => {
    return (dispatch) => {
        if (dataAccess !== "demo") {
        dispatch(setLoadingSpinner(true));
        axios.delete(actionTypes.SERVER_ADDRESS + "/commodity/" + dataAccess + "/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setCommodities(response.data));
                dispatch(setLoadingSpinner(false));
            }).catch((err) => {
                httpErrorHandling(err, dispatch);
            })} else
            dispatch(setMessage(messages.DEMO_ALERT, true));
    }
}

export const getMeasures = (id) => {
    return (dispatch) => {
        axios.get(actionTypes.SERVER_ADDRESS + "/commodity/measures/"+id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setMeasure(response.data)
                )
            }).catch((err) => {
                httpErrorHandling(err, dispatch);
            })
    }
}

const setMeasure = (data) => {
    return {
        type: actionTypes.GET_MEASURES,
        data: data
    }
}


const setCommodityOptions = (data) => {
    return {
        type: actionTypes.SET_COMMODITY_SELECT_OPTIONS,
        data: data
    }
}
