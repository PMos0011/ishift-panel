import * as actionTypes from '../actions';

export const setErrorMessage = (message) => {
    console.log("Action: " + message);
    return {
        type: actionTypes.SET_ERROR_MESSAGE,
        error:message
    }
}