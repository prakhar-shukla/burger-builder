import React from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildConrols'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import { onIngredientAdded, onIngredientRemoved, fetchIngredients } from '../../redux/actions'


class BurgerBuilder extends React.PureComponent {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        if (!this.props.burger.purchasable) {
            this.props.fetchIngredients();
        }
    }

    render() {
        console.log('MAIN PROPS ', this.props)

        const disabledInfo = { ...this.props.burger.ingredients };
        for (let key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] <= 0
            }
        }

        return (
            this.props.burger.ingredients ? <React.Fragment><Modal
                show={this.state.purchasing}
                cancelModal={this.cancelPurchase}>
                <OrderSummary
                    ingredients={this.props.burger.ingredients}
                    cancelPurchase={this.cancelPurchase}
                    continuePurchase={this.continuePurchase}
                    price={this.props.burger.totalPrice} />
            </Modal>
                <Burger ingredients={this.props.burger.ingredients} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={this.props.burger.totalPrice}
                    purchasable={this.props.burger.purchasable}
                    authenticated={this.props.auth.authenticated}
                    purchaseHandler={this.purchaseHandler} /> </React.Fragment> :
                this.props.burger.fetchError ? <p>Can not fetch data</p> : <Spinner />
        )
    }

    purchaseHandler = () => {
        if (this.props.auth.authenticated) {
            this.setState({ purchasing: true })
        }
        else {
            this.props.history.push('/login')
        }
    }
    cancelPurchase = () => {
        this.setState({ purchasing: false })
    }
    continuePurchase = () => {
        this.props.history.push('/checkout')
    }

}

const mapStateToProps = (state) => {
    return {
        burger: state.burger,
        auth: state.auth
    }
}


export default connect(mapStateToProps, {
    onIngredientAdded: onIngredientAdded,
    onIngredientRemoved: onIngredientRemoved,
    fetchIngredients: fetchIngredients
})(BurgerBuilder)