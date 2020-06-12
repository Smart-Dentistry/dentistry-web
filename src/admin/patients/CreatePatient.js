import React, { useReducer } from 'react'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'

import PatientStepForms from './PatientStepForms'
import newPatientReducer from './newPatientReducer'

import './CreatePatient.sass'

const CreatePatient = ({ addPatient }) => {
  const history = useHistory()
  const [newPatient, dispatchNewPatient] = useReducer(
    newPatientReducer,
    {
      receivePromos: true,
      whatsapp: false,
      countryResidence: 'E',
      province: 'Azuay',
      canton: 'Cuenca',
      phone: '+593',
      familyHistory: {
        diseases: [],
        observations: ''
      },
      personalHistory: {
        diseases: [],
        observations: ''
      },
      generalPractitioners: []
    })
  const [, createNewPatient] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/patients/`,
      method: 'post'
    },
    { manual: true }
  )

  const createPatient = async () => {
    const data = {
      ...newPatient,
      birthdate: newPatient.birthdate.format('YYYY-MM-DD')
    }
    let patient
    try {
      const response = await createNewPatient({ data })
      patient = response.data
    } catch (error) {
      message.error('There was an error, please try again.')
      return
    }
    addPatient(patient)
    message.success({ content: 'Patient was created sucessfully', duration: 3 })
    history.push('/admin/patients')
  }

  return (
    <PatientStepForms
      patient={newPatient}
      dispatchNewPatient={dispatchNewPatient}
      createPatient={createPatient}
    />
  )
}

CreatePatient.propTypes = {
  addPatient: PropTypes.func
}

export default CreatePatient
