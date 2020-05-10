import * as actions from './types'
import { axiosOrders } from '../../services/axios-instances'
import axios from 'axios'
import {GOOGLE_AUTH_KEY} from '../../keys/keys'

export const onIngredientAdded = (ingredientName) => {
    return {
        type: actions.ADD_INGREDIENTS,
        payload: {
            ingredientName: ingredientName
        }
    }
}

export const onIngredientRemoved = (ingredientName) => {
    return {
        type: actions.REMOVE_INGREDIENTS,
        payload: {
            ingredientName: ingredientName
        }
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actions.SET_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
}

export const errorFetchingIngredients = () => {
    return {
        type: actions.ERROR_FETCHING_INGREDIENTS,
    }
}

export const fetchIngredients = () => {
    return (dispatch) => {
        axiosOrders.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        }).catch(err => {
            dispatch(errorFetchingIngredients())
        })
    }
}

//////////// PURCHASE ACTIONS //////////////

export const purchaseStart = () => {
    return {
        type: actions.PURCHASE_START
    }
}

export const purchaseSuccess = (orderData) => {
    return {
        type: actions.PURCHASE_SUCCESS,
        payload: {
            orderData: orderData
        }
    }
}


export const purchaseFailed = (message) => {
    return {
        type: actions.PURCHASE_FAILED,
        payload: {
            errrorMessage: message
        }
    }
}

export const tryPurchase = (order) => {
    return (dispatch,getState) => {
        dispatch(purchaseStart())
        axiosOrders.post(`/orders.json?auth=${getState().auth.authState ? getState().auth.authState.idToken : ""}`, order).then((response) => {
            dispatch(purchaseSuccess(response.data))
        }).catch((error) => {
            dispatch(purchaseFailed(error));
        })
    }
}


/////////////// MY ORDERS ACTIONS //////////////

export const setOrders = (orders) => {
    return {
        type: actions.SET_ORDERS,
        payload: {
            orders: orders
        }
    }
}

export const errorFetchingOrders = () => {
    return {
        type: actions.ERROR_FETCHING_ORDERS
    }
}

export const fetchOrders = () => {
    return (dispatch, getState) => {
        let authData= getState().auth.authState;
        let queryParams= `?auth=${authData ? authData.idToken : ""}
        &orderBy="userId"&equalTo="${authData ? authData.localId : ""}"`

        axiosOrders.get(`/orders.json${queryParams}`).then(res => {
            const orders = Object.keys(res.data).map(entry => {
                return { ...res.data[entry], orderId: entry };
            })
            dispatch(setOrders(orders))
        }).catch(err => {
            dispatch(errorFetchingOrders())
        })
    }
}


///////////////////////////// AUTH ACTIONS ////////////////////////

export const authrizationStart = () => {
    return {
        type: actions.AUTH_START
    }
}

export const authrizationSuccess = (authData) => {
    return {
        type: actions.AUTH_SUCCESS,
        payload: {
            authData
        }
    }
}

export const authLogout = () => {
    return {
        type: actions.AUTH_LOGOUT
    }
}

export const authrizationFailed = (error) => {
    return {
        type: actions.AUTH_FAILED,
        payload: {
            error
        }
    }
}

const checkSessionTimeOut = (sessionLimit) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout())
        }, sessionLimit * 1000)
    }
}

const storeDataInLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
}

export const authorize = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authrizationStart());
        const objData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let reqUrl;
        const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+GOOGLE_AUTH_KEY;
        const signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+GOOGLE_AUTH_KEY;
        isSignUp ? reqUrl = signUpUrl : reqUrl = signInUrl;

        axios.post(reqUrl, objData).then(res => {
            dispatch(authrizationSuccess(res.data));
            checkSessionTimeOut(res.data.expiresIn)
            storeDataInLocalStorage('identity', JSON.stringify({ ...res.data, expirationTime: new Date(new Date().getTime() + (res.data.expiresIn * 1000)) }))
        }).catch(err => {
            dispatch(authrizationFailed(err.response.data.error.message))
        })
    }
}

export const authCheckSession = () => {
    return (dispatch) => {
        let authData = localStorage.getItem('identity');
        if (authData) {
            authData = JSON.parse(authData);
            if (new Date() > new Date(authData.expirationTime)) {
                localStorage.removeItem('identity');
                dispatch(authLogout())
            }
            else {
                dispatch(authrizationSuccess(authData))
                checkSessionTimeOut(new Date(authData.expirationTime) - new Date())
            }
        }
        else {
            dispatch(authLogout())
        }
    }
}
