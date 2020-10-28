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

export const setLoadingSpinner = (isLoading) => {
    return {
        type: actionTypes.SET_LOADING_SPINNER,
        data: isLoading
    }
}