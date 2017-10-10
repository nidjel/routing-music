import React, { Component } from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import client from '../client.js'

import TopBar from './TopBar.jsx'
import Login from './Login.jsx'
import AlbumsContainer from './AlbumsContainer.jsx'

import '../App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <Switch>
          <Route path = '/' exact render={() => <Redirect to='/albums' />} />
          <PrivateRoute path='/albums' component={AlbumsContainer} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const NoMatch = ({location}) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

const Logout = () => {
  client.logout()
  return <Redirect to='/login' />
}

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
      client.isLoggedIn() ? (<Component {...props} />)
      : (<Redirect to={{
            pathname: '/login',
            state: {from: props.location}
          }} />)
    )} />
)

export default App
