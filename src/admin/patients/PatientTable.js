import React from 'react'
import { Table, Button, Space, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const { confirm } = Modal

const PatientTable = ({ patients, removePatient }) => {
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
        axios.delete(`${process.env.REACT_APP_API_URL}/patients/${record.key}/`)
        removePatient(record.key)
      }
    })
    console.log(record)
    console.log(index)
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
      key: 'phone'
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
          <FontAwesomeIcon icon={faPen} />
          <button type='button' className='linkButton' onClick={() => removePatientOnClick(record, index)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          {record.whatsapp ? <a href={record.whatsappLink} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faWhatsapp} /></a> : null}
        </Space>
      )
    }
  ]

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Button type='primary' onClick={() => history.push('/admin/patients/create')}>
        <FontAwesomeIcon icon={faPlus} style={{ color: 'white', marginRight: '0.75rem' }} />
        {t('New Patient')}
      </Button>
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
  removePatient: PropTypes.func
}

export default PatientTable
