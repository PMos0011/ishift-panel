import * as actionTypes from '../actions';

export const setErrorMessage = (message) => {
    return {
        type: actionTypes.SET_ERROR_MESSAGE,
        error:message
    }
}