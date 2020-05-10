import React from 'react'
import classes from './Layout.module.css'
import ToolBar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {

    state = {
        sideBarOpen: false
    }

    closeSideBar = () => {
        this.setState({ sideBarOpen: false })
    }

    toggleSideBar = () => {
        this.setState((prevState) => {
           return { sideBarOpen: !prevState.sideBarOpen }
        })
    }

    render() {

        return (
            <React.Fragment>
                <ToolBar toggleSideBar={this.toggleSideBar} />
                <SideDrawer open={this.state.sideBarOpen} closeSideBar={this.closeSideBar} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;