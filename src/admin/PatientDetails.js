import React from 'react'
import { useLocation } from 'react-router-dom'
import { Typography } from 'antd'

const { Title } = Typography

const getFullName = patient => `${patient.firstName} ${patient.middleName} ${patient.lastName} ${patient.secondLastName}`

const PatientDetails = () => {
  const location = useLocation()
  const patient = location.state.patient
  return (
    <>
      <Title level={2}>
        { getFullName(patient) }
      </Title>
    </>
  )
}

export default PatientDetails
