import * as actionTypes from '../actions';

const initialState = {
    customersList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CUSTOMERS:
            return {
                ...state,
                customersList: action.names
            }
        default:
            return state
    }
}

export default reducer;