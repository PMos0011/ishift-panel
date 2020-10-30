import * as actionTypes from '../actions';

export const setMessage = (message, isError) => {
    const newId = Math.random().toString(20).substr(2, 6)
    return (dispatch) => {
        dispatch(setLoadingSpinner(false));
        if (isError) {
            dispatch(setErrorAlert(message, true, newId));
            setTimeout(() => dispatch(clearMessage(newId)), 5000);
        }
        else {
            dispatch(setSuccessAlert(message, true, newId));
            setTimeout(() => dispatch(clearMessage(newId)), 5000);
        }
    }
};

export const clearMessage = (alertId) => {
    return {
        type: actionTypes.CLEAR_ALERT,
        alertId:alertId
    }
}


export const deleteAlert = (access, id, message, action) => {
    return (dispatch) => {
        dispatch(setDeleteAlert(access, id, message, action));
    }
}

const setErrorAlert = (message, alert, alertId) => {
    return {
        type: actionTypes.SET_ERROR_ALERT,
        message: message,
        alert: alert,
        alertId:alertId
    }
}

const setSuccessAlert = (message, alert, alertId) => {
    return {
        type: actionTypes.SET_SUCCESS_ALERT,
        message: message,
        alert: alert,
        alertId:alertId
    }
}

const setDeleteAlert = (access, id, message, action) => {
    return {
        type: actionTypes.SET_DELETE_ALERT,
        access: access,
        id: id,
        message: message,
        action: action
    }
}

export const setLoadingSpinner = (isLoading) => {
    return {
        type: actionTypes.SET_LOADING_SPINNER,
        data: isLoading
    }
}