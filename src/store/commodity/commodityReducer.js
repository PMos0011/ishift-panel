import * as actionTypes from '../actions';

const initialState = {
    commodities: [],
    measures: [
        {
            value: 0,
            label: "błąd pobierania"
        }
    ],
    commoditySelectOpotions: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_COMMODITY:
            return {
                ...state,
                commodities: action.data,
                comoditySelectOpotions: action.select
            };
        case actionTypes.GET_MEASURES:
            return {
                ...state,
                measures: action.data
            };
        case actionTypes.SET_COMMODITY_SELECT_OPTIONS:
            return {
                ...state,
                commoditySelectOpotions: action.data
            }
        default:
            return state
    }
}

export default reducer;