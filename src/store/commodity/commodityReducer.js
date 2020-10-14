import * as actionTypes from '../actions';

const initialState = {
    commodities:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_COMMODITY:
            return {
                ...state,
                commodities:action.data
            }
        default:
            return state
    }
}

export default reducer;