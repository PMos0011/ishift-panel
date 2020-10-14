import * as actionTypes from '../actions';

const initialState = {
    contractors:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CONTRACTORS:
            return {
                ...state,
                contractors:action.data
            }
        default:
            return state
    }
}

export default reducer;