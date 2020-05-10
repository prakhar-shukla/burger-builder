import React from 'react'
import CheckoutSummary from '../../components/Burger/FinalOrder/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Checkout extends React.Component {

    cancelCheckout = () => {
        this.props.history.push('/');
    }
    continueCheckout = () => {
        this.props.history.push('/checkout/contact-data')
    }

    render() {
        if (!this.props.burger.ingredients) {
            return <Redirect to="/" />
        }
        if (this.props.purchase.success) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.burger.ingredients}
                    cancelCheckout={this.cancelCheckout}
                    continueCheckout={this.continueCheckout}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        burger: state.burger,
        purchase: state.purchase
    }
}

export default connect(mapStateToProps)(Checkout)