import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((entry,i) => {
        return <li key={entry+i}><span style={{textTransform: "capitalize"}}>{entry}</span>: {props.ingredients[entry]}</li>
    })
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
            {ingredientSummary}
            </ul>
            <p><strong>Total price :{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType="Success"  clicked={props.continuePurchase}>CONTINUE</Button>
        </React.Fragment>
    )
}
export default OrderSummary 