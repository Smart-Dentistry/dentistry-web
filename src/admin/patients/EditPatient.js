import React, { useReducer, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from 'axios-hooks'

import PatientStepForms from './PatientStepForms'

import newPatientReducer from './newPatientReducer'

const EditPatient = () => {
  const { key } = useParams()
  const [patient, dispatchPatient] = useReducer(newPatientReducer, {})
  const [{ data, loading, error }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/patients/${key}/`
  })
  useEffect(() => { if (data) dispatchPatient({ type: 'UPDATE', updatedValues: data }) }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <PatientStepForms
      patient={patient}
      dispatchPatient={dispatchPatient}
    />
  )
}

export default EditPatient
