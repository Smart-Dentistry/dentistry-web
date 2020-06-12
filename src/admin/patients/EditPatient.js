import React from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
// import useAxios from 'axios-hooks'

import PatientStepForms from './PatientStepForms'

const EditPatient = () => {
  const location = useLocation()
  const patient = {
    ...location.state.patient,
    birthdate: moment(location.state.patient.birthdate, 'YYYY-MM-DD')
  }
  return (
    <PatientStepForms
      initialPatient={patient}
      // dispatchPatient={dispatchPatient}
    />
  )
}

export default EditPatient
