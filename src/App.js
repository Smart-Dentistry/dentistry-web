import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Admin from './admin/Admin'

import './App.css'

function App () {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/admin' component={Admin} />
      <Route path='/login' component={Login} />
      <Route render={() => <h2>404 Page Not Found</h2>} />
    </Switch>
  )
}

export default App
