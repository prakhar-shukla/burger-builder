import burgerReducer from './burgerReducer'
import purchaseReducer from './purchaseReducer'
import ordersReducer from './ordersReducer'
import authReducer from './authReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    burger: burgerReducer,
    purchase: purchaseReducer,
    orders:ordersReducer,
    auth: authReducer
})