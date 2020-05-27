import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PatientTable from './PatientTable'
import CreatePatient from './CreatePatient'

const Patients = () => {
  return (
    <Switch>
      <Route exact path='/admin/patients/create' component={CreatePatient} />
      <Route exact path='/admin/patients' component={PatientTable} />
      <Route render={() => <Redirect to='/404' />} />
    </Switch>
  )
}

export default Patients
