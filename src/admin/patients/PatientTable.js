import React from 'react'
import { Table, Button, Space, Modal, Input, Row, Col, message } from 'antd'
import { useHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import { formatPhoneNumberIntl } from 'react-phone-number-input'

import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const { confirm } = Modal
const { Search } = Input

const PatientTable = ({ patients, dispatch, removePatient }) => {
  const { t } = useTranslation()
  const history = useHistory()

  const removePatientOnClick = (record, index) => {
    confirm({
      title: 'Delete patient',
      icon: <FontAwesomeIcon icon={faTrash} style={{ verticalAlign: '0', marginRight: '0.5rem' }} />,
      content: 'Please confirm you want to delete all data for this patient.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk () {
        axios.delete(`/patients/${record.key}/`)
        removePatient(record.key)
      }
    })
  }

  const columns = [
    {
      title: t('Name'),
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: t('Last Name'),
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: t('ID'),
      dataIndex: 'idDocumentNumber',
      key: 'idDocumentNumber'
    },
    {
      title: t('Phone'),
      dataIndex: 'phone',
      key: 'phone',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => formatPhoneNumberIntl(text)
    },
    {
      title: t('Age'),
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: t('Actions'),
      key: 'actions',
      // eslint-disable-next-line react/display-name
      render: (text, record, index) => (
        <Space size='middle'>
          <FontAwesomeIcon icon={faClipboard} />
          <Link to={{ pathname: `/admin/patients/${record.key}/edit`, state: { patient: record, index } }}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <button type='button' className='linkButton' onClick={() => removePatientOnClick(record, index)}>
            <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#d11a2a' }} />
          </button>
          {record.whatsapp ? <a href={record.whatsappLink} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faWhatsapp} style={{ color: '#25d366' }} /></a> : null}
        </Space>
      )
    }
  ]

  const filterPatients = async (value) => {
    let response
    try {
      response = await axios.get(`/patients?search=${value}`)
    } catch (error) {
      message.error('There was an error, please try again.')
      return
    }
    dispatch({ type: 'LOAD', patients: response.data })
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Row>
        <Col span={8}>
          <Search
            placeholder='search first name, last name, or id'
            onSearch={filterPatients}
            enterButton
          />
        </Col>
        <Col span={16}>
          <Row justify='end'>
            <Button type='primary' onClick={() => history.push('/admin/patients/create')}>
              <FontAwesomeIcon icon={faPlus} style={{ color: 'white', marginRight: '0.75rem' }} />
              {t('New Patient')}
            </Button>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={patients}
        pagination={{ defaultCurrent: 1, defaultPageSize: 10, hideOnSinglePage: true }}
      />
    </Space>
  )
}

PatientTable.propTypes = {
  patients: PropTypes.array,
  dispatch: PropTypes.func,
  removePatient: PropTypes.func
}

export default PatientTable
