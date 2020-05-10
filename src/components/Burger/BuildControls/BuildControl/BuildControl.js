import React from 'react'
import classes from './BuildControl.module.css'

const BuildControl = (props) => {

    return (
        <div className={classes.BuildControl}>
            <div>{props.label}</div>
            <button onClick={props.removed} disabled={props.disabledInfo}>Less</button>
            <button onClick={props.added}>More</button>
        </div>
    )
}
export default BuildControl