import React from 'react'
import { message } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
import moment from 'moment'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'

import PatientStepForms from './PatientStepForms'

const EditPatient = ({ updatePatient }) => {
  const history = useHistory()
  const location = useLocation()
  const patientFromTable = location.state.patient
  const patient = {
    ...patientFromTable,
    birthdate: moment(patientFromTable.birthdate, 'YYYY-MM-DD'),
    province: patientFromTable.address.province,
    canton: patientFromTable.address.canton,
    addressLine: patientFromTable.address.addressLine,
    emergencyContactName: patientFromTable.emergencyContact.fullName,
    emergencyContactPhone: patientFromTable.emergencyContact.phone,
    representativeName: patientFromTable.representative.fullName,
    representativePhone: patientFromTable.representative.phone,
    representativeRelationship: patientFromTable.representative.relationship
  }
  const [, update] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/patients/${patientFromTable.key}/`,
      method: 'put'
    },
    { manual: true }
  )

  const updateExistingPatient = async (patient) => {
    const data = {
      ...patient,
      birthdate: patient.birthdate.format('YYYY-MM-DD'),
      address: {
        province: patient.province,
        canton: patient.canton,
        addressLine: patient.addressLine
      }
    }
    let editedPatient
    try {
      const response = await update({ data })
      editedPatient = response.data
    } catch (error) {
      message.error('There was an error, please try again.')
      return
    }
    updatePatient(editedPatient, location.state.index)
    message.success({ content: 'Patient was updated sucessfully', duration: 3 })
    history.push('/admin/patients')
  }

  return (
    <PatientStepForms
      initialPatient={patient}
      processPatient={updateExistingPatient}
    />
  )
}

EditPatient.propTypes = {
  updatePatient: PropTypes.func
}

export default EditPatient
