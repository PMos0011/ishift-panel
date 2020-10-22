import * as actionTypes from '../actions';

const initialState = {
    bankAccounts: [],
    bankAccountsSelectOptions: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BANK_ACCOUNTS:
            return {
                ...state,
                bankAccounts: action.data,
                bankAccountsSelectOptions: action.data
            };
        case actionTypes.SET_BANK_ACCOUNTS_SELECT_OPTIONS:
            return {
                ...state,
                bankAccountsSelectOptions: action.data
            }
        default:
            return state
    }
}

export default reducer;