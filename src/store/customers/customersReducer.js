import * as actionTypes from '../actions';

const initialState = {
    customersList: [],
    customer: {
        companyData: [],
        companyName: "",
        companyId:""
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CUSTOMERS:
            return {
                ...state,
                customersList: action.names
            }
        case actionTypes.GET_CUSTOMER_DATA:
            return {
                ...state,
                customer: action.data
            }
        default:
            return state
    }
}

export default reducer;