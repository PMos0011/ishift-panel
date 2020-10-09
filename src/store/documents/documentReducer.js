import * as actionTypes from '../actions';

const initialState = {
    documents: [],
    documentDetails: {
        typDeklaracji: "",
        rokMiesiac: "",
        declarationDetails: []
    },
    options: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_DOCUMENTS:
            return {
                ...state,
                documents: action.documents,
                options: action.options
            }
        case actionTypes.GET_DOCUMENT_FULL_DETAILS:
            return {
                ...state,
                documentDetails: action.data
            }
        default:
            return state
    }
}

export default reducer;

