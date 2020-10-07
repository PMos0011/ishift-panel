import * as actionTypes from '../actions';

const initialState = {
    errorMessage: '',
    errorAlert:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.error,
                errorAlert: action.alert
            }
        default:
            return state
    }
}

export default reducer;