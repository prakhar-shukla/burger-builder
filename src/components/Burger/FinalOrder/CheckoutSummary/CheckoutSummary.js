import React from 'react';
import Burger from '../../Burger'
import Button from '../../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'
import {withRouter} from 'react-router-dom'

const CheckoutSummary=(props)=>{
    return (
            <div className={classes.CheckoutSummary}>
                <h1>We hope it satisfies your hunger!</h1>
                <div style={{width:'100%',margin:'auto'}}>
                    <Burger ingredients={props.ingredients} />
                </div>
                <Button btnType="Danger" clicked={props.cancelCheckout}>Cancel</Button>
                <Button btnType="Success" clicked={props.continueCheckout}>Continue</Button>
            </div>
            )
}
export default withRouter(CheckoutSummary)