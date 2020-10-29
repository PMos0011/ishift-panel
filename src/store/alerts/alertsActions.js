import * as actionTypes from '../actions';

export const setMessage = (message, isError) => {
    return (dispatch) => {
        dispatch(setLoadingSpinner(false));
        if (isError) {
            dispatch(setErrorAlert(message, true));
            setTimeout(() => dispatch(setErrorAlert("", false)), 5000);
        }
        else {
            dispatch(setSuccessAlert(message, true));
            setTimeout(() => dispatch(setSuccessAlert("", false)), 5000);
        }
    }
};

export const clearMessage = ()=>{
    return (dispatch) =>{
        dispatch(setErrorAlert("", false));
        dispatch(setSuccessAlert("", false));
    }
}

export const deleteAlert = (access, id, message, action) =>{
    return (dispatch) =>{
        dispatch(setDeleteAlert(access, id, message, action));
    }
}

const setErrorAlert = (message, alert) => {
    return {
        type: actionTypes.SET_ERROR_ALERT,
        message: message,
        alert: alert
    }
}

const setSuccessAlert = (message, alert) => {
    return {
        type: actionTypes.SET_SUCCESS_ALERT,
        message: message,
        alert: alert
    }
}

const setDeleteAlert = (access, id, message, action) => {
    return {
        type: actionTypes.SET_DELETE_ALERT,
        access:access,
        id:id,
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