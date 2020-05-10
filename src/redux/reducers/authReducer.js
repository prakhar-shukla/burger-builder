import * as actions from '../actions/types'



const initialState = {
    authState: null,
    authenticated: false,
    loading: false,
    error: false,
    errorMsg: ''
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            {
                const newState = {
                    loading: true,
                    error: false,
                    authenticated: false
                }
                return newState
            }
        case actions.AUTH_SUCCESS:
            {
                const newState = {
                    authState: action.payload.authData,
                    loading: false,
                    error: false,
                    authenticated:true
                }
                return newState
            }
        case actions.AUTH_FAILED:
            {
                const newState = {
                    authState: null,
                    loading: false,
                    error: true,
                    authenticated: false,
                    errorMsg: action.payload.error
                }
                return newState
            }
        case actions.AUTH_LOGOUT:
            {
                const newState = {
                    authState: null,
                    loading: false,
                    error: false,
                    authenticated:false,
                    errorMsg: ''
                }
                return newState
            }
        default:
            return state;
    }
}

export default authReducer