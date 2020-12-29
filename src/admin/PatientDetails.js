import React from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { Typography, Space, Modal, message, Row, Col } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import PropTypes from 'prop-types'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import i18n from '../i18n'

const { Title } = Typography
const { confirm } = Modal

const maritalStatuses = {
  SI: i18n.t('Single'),
  MA: i18n.t('Married'),
  DI: i18n.t('Divorced'),
  WI: i18n.t('Widowed'),
  DP: i18n.t('Domestic Partnership'),
  NS: i18n.t('Not Specified')
}
const referralSources = {
  P: i18n.t('Personal Reference'),
  S: i18n.t('Social Media'),
  O: i18n.t('Other')
}
const span = 4
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
      <Title level={4}>General Details</Title>
      <div style={ { margin: '20px 0' } }>
        <Row>
          <Col span={span}>
            <h4>ID:</h4>
          </Col>
          <Col span={span}>
            { patient.idDocumentNumber }
          </Col>
          <Col span={span}>
            <h4>Marital Status:</h4>
          </Col>
          <Col span={span}>
            { maritalStatuses[patient.maritalStatus] }
          </Col>
        </Row>
        <Row>
          <Col span={span}>
            <h4>Sex:</h4>
          </Col>
          <Col span={span}>
            { patient.sex === 'M' ? 'Male' : 'Female' }
          </Col>
          <Col span={span}>
            <h4>Country:</h4>
          </Col>
          <Col span={span}>
            { patient.countryOfResidence === 'E' ? 'Ecuador' : 'Abroad' }
          </Col>
        </Row>
        <Row>
          <Col span={span}>
            <h4>Job Title:</h4>
          </Col>
          <Col span={span}>
            { patient.jobTitle }
          </Col>
          <Col span={span}>
            <h4>Birthdate:</h4>
          </Col>
          <Col span={span}>
            { patient.birthdate }
          </Col>
        </Row>
        <Row>
          <Col span={span}>
            <h4>Address:</h4>
          </Col>
          <Col span={span}>
            { patient.address === null ? '-' : `${patient.address.addressLine}` }
          </Col>
          <Col span={span}>
            <h4>Email:</h4>
          </Col>
          <Col span={span}>
            { patient.email ? patient.email : '-' }
          </Col>
        </Row>
        <Row>
          <Col span={span}>
            <h4>Health Insurance:</h4>
          </Col>
          <Col span={span}>
            { patient.healthInsuranceCompany ? patient.healthInsuranceCompany : '-' }
          </Col>
          <Col span={span}>
            <h4>Receive Promos:</h4>
          </Col>
          <Col span={span}>
            { patient.receivePromos ? 'Yes' : 'No' }
          </Col>
        </Row>
        <Row>
          <Col span={span}>
            <h4>Phone:</h4>
          </Col>
          <Col span={span}>
            { formatPhoneNumberIntl(patient.phone) }
          </Col>
          <Col span={span}>
            <h4>Referral Source:</h4>
          </Col>
          <Col span={span}>
            { referralSources[patient.referralSource] }
          </Col>
        </Row>
      </div>
      <Title level={4}>Emergency Contact</Title>
      <div style= { { margin: '24px 0' } }>
        { patient.emergencyContact !== null && patient.emergencyContact.fullName && patient.emergencyContact.phone ? (
          <Row>
            <Col span={span}>
              <h4>Name:</h4>
            </Col>
            <Col span={span}>
              { patient.emergencyContact.fullName }
            </Col>
            <Col span={span}>
              <h4>Phone:</h4>
            </Col>
            <Col span={span}>
              { formatPhoneNumberIntl(patient.emergencyContact.phone) }
            </Col>
          </Row>
        ) : <em>No emergency contact</em>}
      </div>
      <Title level={4}>Representative</Title>
      <div style= { { margin: '24px 0' } }>
        { patient.representative !== null && patient.representative.fullName && patient.representative.phone ? (
          <Row>
            <Col span={span}>
              <h4>Name:</h4>
            </Col>
            <Col span={span}>
              { patient.representative.fullName }
            </Col>
            <Col span={span}>
              <h4>Phone:</h4>
            </Col>
            <Col span={span}>
              { formatPhoneNumberIntl(patient.representative.phone) }
            </Col>
          </Row>
        ) : <em>No representative</em>}
      </div>
      { patient.hasMedicalHistory ? (
        <Link to={{ pathname: `/admin/patients/${patient.key}/med-history/view` }}>
          Medical History
        </Link>
      ) : (
        <Link to={{ pathname: '/admin/patients/med-history/create', state: { patient } }}>
            Create Medical History
        </Link>
      ) }
    </>
  )
}

PatientDetails.propTypes = {
  removePatient: PropTypes.func
}

export default PatientDetails
