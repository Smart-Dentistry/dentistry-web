import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Patients from './patients/Patients'

const AdminContent = () => {
  return (
    <Switch>
      <Route path='/admin/patients' component={Patients} />
      <Route render={() => <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>Under construction...</div>} />
    </Switch>
  )
}

export default AdminContent
