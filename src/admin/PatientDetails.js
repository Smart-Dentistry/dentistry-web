import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Typography, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

const { Title } = Typography

const getFullName = patient => `${patient.firstName} ${patient.middleName} ${patient.lastName} ${patient.secondLastName}`

const PatientDetails = () => {
  const location = useLocation()
  const patient = location.state.patient
  return (
    <>
      <Title level={2}>
        <Space size='middle'>
          { getFullName(patient) }
          <Link to={{ pathname: `/admin/patients/${patient.key}/edit`, state: { patient, index: location.state.index } }}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#d11a2a' }} />
        </Space>
      </Title>
    </>
  )
}

export default PatientDetails
