import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div onClick={props.toggleSideBar}>MENU</div>
            <div style={{ height: '80%'}}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
}
export default Toolbar