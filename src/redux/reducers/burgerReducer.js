import * as actions from '../actions/types'


const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    fetchError: false
}


const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENTS: {
            const newState = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload.ingredientName],
            }
            newState.purchasable = Object.keys(newState.ingredients).some(entry => newState.ingredients[entry])
            return newState
        }

        case actions.REMOVE_INGREDIENTS:
            {
                const newState = {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] > 0 && state.ingredients[action.payload.ingredientName] - 1
                    },
                    totalPrice: state.ingredients[action.payload.ingredientName] && state.totalPrice - INGREDIENT_PRICE[action.payload.ingredientName],
                }
                newState.purchasable = Object.keys(newState.ingredients).some(entry => newState.ingredients[entry])
                return newState
            }

        case actions.SET_INGREDIENTS:
            {
                const newState = {
                    ...state,
                    ingredients: action.payload.ingredients,
                    fetchError: false,
                    totalPrice:4
                }
                return newState
            }
        case actions.ERROR_FETCHING_INGREDIENTS:
            {
                const newState = {
                    ...state,
                    ingredients: null,
                    fetchError: true
                }
                return newState
            }
        default:
            return state;
    }
}

export default burgerReducer