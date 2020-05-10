import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <p>Total Price: {props.price.toFixed(2)}</p>
            {controls.map(entry => {
                return (<BuildControl
                    key={entry.label}
                    label={entry.label}
                    added={() => props.ingredientAdded(entry.type)}
                    removed={() => props.ingredientRemoved(entry.type)}
                    disabledInfo={props.disabledInfo[entry.type]} />)
            })}
            <button disabled={!props.purchasable} onClick={props.purchaseHandler}>{props.authenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}</button>
        </div>
    )
}
export default BuildControls    