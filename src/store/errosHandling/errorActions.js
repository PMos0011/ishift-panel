import * as actionTypes from '../actions';

export const setErrorMessage = (message, alert) => {
    return (dispatch) => {
        dispatch(setMessage(message, alert));
        dispatch(setMessage("", false));
    }
};

const setMessage = (message, alert) => {
    return {
        type: actionTypes.SET_ERROR_MESSAGE,
        error: message,
        alert: alert
    }
}