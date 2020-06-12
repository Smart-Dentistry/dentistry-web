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
  const address = patientFromTable.address
  const emergencyContact = patientFromTable.emergencyContact
  const representative = patientFromTable.representative
  const patient = {
    ...patientFromTable,
    birthdate: moment(patientFromTable.birthdate, 'YYYY-MM-DD'),
    province: address ? address.province : 1,
    canton: address ? address.canton : 3,
    addressLine: address ? address.addressLine : '',
    emergencyContactName: emergencyContact ? emergencyContact.fullName : '',
    emergencyContactPhone: emergencyContact ? emergencyContact.phone : '',
    representativeName: representative ? representative.fullName : '',
    representativePhone: representative ? representative.phone : '',
    representativeRelationship: representative ? representative.relationship : ''
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
