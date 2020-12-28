import React from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { Typography, Space, Modal, message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import PropTypes from 'prop-types'

const { Title } = Typography
const { confirm } = Modal

const getFullName = patient => `${patient.firstName} ${patient.middleName} ${patient.lastName} ${patient.secondLastName}`

const PatientDetails = ({ removePatient }) => {
  const location = useLocation()
  const history = useHistory()
  const patient = location.state.patient

  const removePatientOnClick = patient => {
    confirm({
      title: 'Delete patient',
      icon: <FontAwesomeIcon icon={faTrash} style={{ verticalAlign: '0', marginRight: '0.5rem' }} />,
      content: 'Please confirm you want to delete all data for this patient.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk () {
        axios.delete(`/patients/${patient.key}/`)
        removePatient(patient.key)
        history.push('/admin/patients')
        message.success({ content: 'Patient was deleted sucessfully', duration: 3 })
      }
    })
  }

  return (
    <>
      <Title level={2}>
        <Space size='middle'>
          {getFullName(patient)}
          <Link to={{ pathname: `/admin/patients/${patient.key}/edit`, state: { patient, index: location.state.index, toDetails: true } }}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <button type='button' className='linkButton' onClick={() => removePatientOnClick(patient)}>
            <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#d11a2a' }} />
          </button>
        </Space>
      </Title>
    </>
  )
}

PatientDetails.propTypes = {
  removePatient: PropTypes.func
}

export default PatientDetails
