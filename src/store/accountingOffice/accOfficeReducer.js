import * as actionTypes from '../actions';

const initialState = {
    officeData: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ACCOUNTING_OFFICE_DATA:
            return {
                ...state,
                officeData: action.data
            }
        default:
            return state
    }
}

export default reducer;