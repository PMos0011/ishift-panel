import * as actionTypes from '../actions';
import axios from 'axios'

import { setMessage } from '../alerts/alertsActions';
import { getToken } from '../authorization/authAction';

export const getCommoditiesData = (id) => {
    return (dispatch) => {
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
            }).catch((err) => {
                //TODO
                console.log(err);
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
        axios.put(actionTypes.SERVER_ADDRESS + "/commodity/" + dataAccess,
            data,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setCommodities(response.data))
            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage("Coś poszło nie tak", true));
                }
                else
                    dispatch(setMessage("Błąd komuniacji z serwerem. Spróbuj ponownie później", true));
            })
    }
}

export const deleteCommodity = (dataAccess, id) => {
    return (dispatch) => {
        axios.delete(actionTypes.SERVER_ADDRESS + "/commodity/" + dataAccess + "/" + id,
            {
                headers: {
                    'Authorization': getToken()
                }
            })
            .then((response) => {
                dispatch(setCommodities(response.data))
            }).catch((err) => {
                if (err.response !== undefined) {
                    dispatch(setMessage("Coś poszło nie tak", true));
                }
                else
                    dispatch(setMessage("Błąd komuniacji z serwerem. Spróbuj ponownie później", true));
            })
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
                //TODO
                console.log(err);
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
