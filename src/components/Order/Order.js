import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {
    
    const ingredientsArray= Object.keys(props.orderData.ingredients).map((entry,i)=>{
        if( props.orderData.ingredients[entry] ){
            return <p key={entry+i}>{entry} ({props.orderData.ingredients[entry]})</p>
        }
        return null;
    })
    console.log("ingredientsArray",ingredientsArray)
    return (
        <div className={classes.Order}>
            <h3>Order Id: {props.orderData.orderId}</h3>
            <p>Ingredients:</p>
            {ingredientsArray}
            <p>Price: <strong>{props.orderData.price}</strong></p>
        </div>
    )
}
export default Order