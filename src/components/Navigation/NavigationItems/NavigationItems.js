import React from 'react'
import classes from './NavigationItems.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { authLogout } from '../../../redux/actions'

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <li className={classes.Item}><NavLink activeClassName={classes.active} exact to="/">Burger Builder</NavLink></li>

            {props.auth.authenticated ?
                <React.Fragment>
                    <li className={classes.Item}><NavLink activeClassName={classes.active} to="/orders">Orders</NavLink></li>
                    <li onClick={props.authLogout} className={classes.Item}><NavLink activeClassName={classes.active} to="/login">Logout</NavLink></li>
                </React.Fragment>
                :
                <li className={classes.Item}><NavLink activeClassName={classes.active} to="/login">Login</NavLink></li>
            }

        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, { authLogout })(NavigationItems)