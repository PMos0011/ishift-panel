import * as actionTypes from '../actions';

const initialState = {
    errorMessage: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ERROR_MESSAGE:
            console.log("reducer: " + action.error);
            return {
                ...state,
                errorMessage: action.error
            }
        default:
            return state
    }
}

export default reducer;