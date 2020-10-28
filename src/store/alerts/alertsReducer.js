import * as actionTypes from '../actions';

const initialState = {
    message: '',
    errorAlert: false,
    successAlert:false,
    spinner: false
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
            }
        default:
            return state
    }
}

export default reducer;