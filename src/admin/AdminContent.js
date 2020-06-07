import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Patients from './patients/Patients'

const AdminContent = () => {
  return (
    <Switch>
      <Route path='/admin/patients' component={Patients} />
      <Route render={() => <div>Under construction...</div>} />
    </Switch>
  )
}

export default AdminContent
