import React, { useReducer, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import useAxios from 'axios-hooks'

import PatientTable from './PatientTable'
import CreatePatient from './general_info/CreatePatient'
import patientReducer from './patientReducer'
import EditPatient from './general_info/EditPatient'
import CreateMedHistory from './medical_history/CreateMedHistory'
import PatientDetails from '../PatientDetails'

const Patients = () => {
  const [{ data, loading, error }] = useAxios({
    url: '/patients/'
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
        path='/admin/patients/:key/edit'
        render={props => <EditPatient {...props} updatePatient={(patient, index) => dispatch({ type: 'UPDATE', patient, index })} />}
      />
      <Route
        exact
        path='/admin/patients/med-history/create'
        render={props => <CreateMedHistory {...props} addMedHistory={patient => console.log(patient.key)} />}
      />
      <Route
        exact
        path='/admin/patients/:key/details'
        render={props => <PatientDetails {...props} removePatient={key => dispatch({ type: 'REMOVE', key })} /> }
      />
      <Route
        exact
        path='/admin/patients'
        render={props => <PatientTable {...props} patients={patients} dispatch={dispatch} removePatient={key => dispatch({ type: 'REMOVE', key })} />}
      />
      <Route render={() => <Redirect to='/404' />} />
    </Switch>
  )
}

export default Patients
