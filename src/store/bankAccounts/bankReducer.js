import * as actionTypes from '../actions';

const initialState = {
    bankAccounts:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes. GET_BANK_ACCOUNTS:
            return {
                ...state,
                bankAccounts:action.data
            }
        default:
            return state
    }
}

export default reducer;