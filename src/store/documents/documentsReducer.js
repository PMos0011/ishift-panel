import * as actionTypes from '../actions';

const initialState = {
    documents: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_DOCUMENTS:
            return {
                ...state,
                documents: action.documents
            }
        default:
            return state
    }
}

export default reducer;