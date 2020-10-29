import * as actionTypes from '../actions';

const initialState = {
    message: '',
    errorAlert: false,
    successAlert: false,
    spinner: false,
    access: "",
    id: "",
    action: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ERROR_ALERT:
            return {
                ...state,
                message: action.message,
                errorAlert: action.alert
            };
        case actionTypes.SET_SUCCESS_ALERT:
            return {
                ...state,
                message: action.message,
                successAlert: action.alert
            };
        case actionTypes.SET_LOADING_SPINNER:
            return {
                ...state,
                spinner: action.data
            };
        case actionTypes.SET_DELETE_ALERT:
            return {
                ...state,
                message: action.message,
                access: action.access,
                id: action.id,
                action: action.action
            };
        default:
            return state
    }
}

export default reducer;