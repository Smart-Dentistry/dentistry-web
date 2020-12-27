import React from 'react'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'

import PatientStepForms from './PatientStepForms'

import './CreatePatient.sass'

const CreatePatient = ({ addPatient }) => {
  const history = useHistory()
  const patient = {
    receivePromos: true,
    countryOfResidence: 'E',
    province: 1,
    canton: 3
  }
  const [, createNewPatient] = useAxios({ url: '/patients/', method: 'post' }, { manual: true })

  const createPatient = async (newPatient, continueToMedHistory = true) => {
    const data = {
      ...newPatient,
      birthdate: newPatient.birthdate.format('YYYY-MM-DD'),
      address: {
        province: newPatient.province,
        canton: newPatient.canton,
        addressLine: newPatient.addressLine
      }
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
    if (continueToMedHistory) {
      history.push(`/admin/patients/${patient.key}/med-history`)
    } else {
      history.push('/admin/patients')
    }
  }

  return <PatientStepForms initialPatient={patient} processPatient={createPatient} />
}

CreatePatient.propTypes = {
  addPatient: PropTypes.func
}

export default CreatePatient
