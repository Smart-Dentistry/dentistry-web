import React, { useReducer, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import useAxios from 'axios-hooks'

import PatientTable from './PatientTable'
import CreatePatient from './CreatePatient'
import patientReducer from './patientReducer'

const Patients = () => {
  const [{ data, loading, error }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/patients/`
  })
  const [patients, dispatch] = useReducer(patientReducer, [])
  useEffect(() => { if (data) dispatch({ type: 'LOAD', patients: data }) }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <Switch>
      <Route
        exact
        path='/admin/patients/create'
        render={props => <CreatePatient {...props} addPatient={patient => dispatch({ type: 'ADD', patient })} />}
      />
      <Route
        exact
        path='/admin/patients'
        render={props => <PatientTable {...props} patients={patients} />}
      />
      <Route render={() => <Redirect to='/404' />} />
    </Switch>
  )
}

export default Patients
