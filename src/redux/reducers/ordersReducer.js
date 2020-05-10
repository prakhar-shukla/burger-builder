import * as actions from '../actions/types'



const initialState = {
    data: [],
    error: false,
}


const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_ORDERS:
            {
                const newState = {
                    data: action.payload.orders,
                    error: false
                }
                return newState
            }
        case actions.ERROR_FETCHING_ORDERS:
            {
                const newState = {
                    data: [...state.data],
                    error: true
                }
                return newState
            }
        default:
            return state;
    }
}

export default ordersReducer