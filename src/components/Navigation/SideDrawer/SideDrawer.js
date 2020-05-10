import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Sidedrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {

    let sideBarClass = [classes.SideDrawer, classes.Open]
    if (!props.open) {
        sideBarClass = [classes.SideDrawer, classes.Close]
    }

    return (
        <React.Fragment>
            <Backdrop show={props.open} click={props.closeSideBar} />
            <div className={sideBarClass.join(' ')}>
                <div style={{ height: '11%' }}>
                    <Logo />
                </div>            <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>

    )
}
export default SideDrawer