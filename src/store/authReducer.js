import * as actionTypes from './actions';

const initialState = {
    token: '',
    expireDate: '',
    isAuthenticated: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.AUTHORIZE_USER:
            localStorage.setItem("token", action.token);
            localStorage.setItem("expireDate", action.expireDate);
            localStorage.setItem("isAuthenticated", true);
            return {
                ...state,
                token: action.token.authorization,
                expireDate: action.token.expires,
                isAuthenticated: true
            }
        case actionTypes.LOGOUT_USER:
            localStorage.removeItem("token");
            localStorage.removeItem("expireDate");
            localStorage.removeItem("isAuthenticated");
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