import * as actionTypes from '../actions';

const initialState = {
    usersList:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LOGIN_LIST:
            return {
                ...state,
                usersList: action.list
            }
        default:
            return state
    }
}

export default reducer;