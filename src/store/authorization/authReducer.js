import * as actionTypes from '../actions';

const initialState = {
    token: '',
    expireDate: '',
    isAuthenticated: false,
    dataAccess: 'none',
    isAdmin: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHORIZE_USER:
            return {
                ...action.data
            }
        case actionTypes.LOGOUT_USER:
            localStorage.removeItem("token");
            localStorage.removeItem("expireDate");
            return {
                ...state,
                token: "",
                expireDate: "",
                isAuthenticated: false
            }
        default:
            return state;
    }
}

export default reducer;