import * as actionTypes from '../actions';

const initialState = {
    contractors: [],
    contractorsSelectoptions: [
        { value: 0, label: "błąd ładowania" }
    ],
    contractorIdOptions: [
        { value: 0, label: "NIP" },
        { value: 1, label: "REGON" }
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CONTRACTORS:
            return {
                ...state,
                contractors: action.data,
                contractorsSelectoptions: action.options
            }
        default:
            return state
    }
}

export default reducer;