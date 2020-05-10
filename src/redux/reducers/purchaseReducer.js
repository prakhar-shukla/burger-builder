import * as actions from '../actions/types'


const initialState = {
    orders:[],
    loading: false,
    success: false,
    error: false,
    errorMessage: null
}


const purchaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PURCHASE_START: {
            const newState = {
                ...state,
                orders: [...state.orders],
                loading: true,
                success: false
            }
            return newState
        }

        case actions.PURCHASE_SUCCESS:
            {
                const newState = {
                    ...state,
                    orders: [...state.orders].concat(action.payload.orderData),
                    loading: false,
                    success: true,
                    error: false
                }
                return newState
            }

        case actions.PURCHASE_FAILED:
            {
                const newState = {
                    ...state,
                    orders: [...state.orders],
                    loading: false,
                    success: false,
                    error: true,
                    errorMessage: action.payload.errorMessage
                }
                return newState
            }

        default:
            return state;
    }
}

export default purchaseReducer