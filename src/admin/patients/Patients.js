import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PatientTable from './PatientTable'
import CreatePatient from './CreatePatient'

const Patients = () => {
  return (
    <Switch>
      <Route path='/admin/patients/create' component={CreatePatient} />
      <Route path='/admin/patients' component={PatientTable} />
    </Switch>
  )
}

export default Patients
