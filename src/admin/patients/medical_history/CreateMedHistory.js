import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

const CreateMedHistory = () => {
  const history = useHistory()
  const location = useLocation()
  if (location.state === undefined) {
    history.push('/admin/patients')
    return <></>
  }
  const patient = location.state.patient
  return <h1>{patient.firstName}</h1>
}

export default CreateMedHistory
