import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Admin from './admin/Admin'

import './App.css'

function App () {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/admin' component={Admin} />
      <Route render={() => <h2>404 Page Not Found</h2>}/>
    </Switch>
  )
}

export default App
