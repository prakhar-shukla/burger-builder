import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    let inputElement = null;
    const inputClasses= [classes.InputElement];
    if(!props.valid && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changeHandler} />;
            break;
        case 'textarea':
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changeHandler} />
            break;
        case 'select':
            inputElement = (<select
                className={inputClasses.join(' ')}
                name={props.elementConfig.name}
                value={props.value}
                onChange={props.changeHandler}>
                {props.elementConfig.options.map((entry, i) => {
                    return <option key={entry.value} value={entry.value}>{entry.displayValue}</option>
                })}
            </select>)
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changeHandler} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default Input