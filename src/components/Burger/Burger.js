import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(entry => {
        return [...Array(props.ingredients[entry])].map((_, i) => {
            return <BurgerIngredient key={entry + i} type={entry} />
        })
    }).reduce((acc, entry) => {
        return acc.concat(entry);
    }, [])

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>

    )
}
export default Burger