import React from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Login from './containers/Login/Login'
import Spinner from './components/UI/Spinner/Spinner'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { authCheckSession } from './redux/actions'
import { connect } from 'react-redux'

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));

class App extends React.Component {

  componentWillMount() {
    this.props.authCheckSession();
  }

  render() {
    let routes;
    if (this.props.auth.authenticated) {
      routes = <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/login' component={Login} />
        <Redirect to="/" />
      </Switch>
    }
    else {
      routes = <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/login' component={Login} />
        <Redirect to="/" />
      </Switch>
    }

    return (
      <div>
        <BrowserRouter>
          <React.Suspense fallback={<Spinner/>}>
            <Layout>
              {routes}
            </Layout>
          </React.Suspense>
        </BrowserRouter>
      </div>
    )
  }
}

const mapSatetToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapSatetToProps, { authCheckSession })(App);
