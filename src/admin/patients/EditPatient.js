import React from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
// import useAxios from 'axios-hooks'

import PatientStepForms from './PatientStepForms'

const EditPatient = () => {
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
  return (
    <PatientStepForms
      initialPatient={patient}
      // dispatchPatient={dispatchPatient}
    />
  )
}

export default EditPatient
