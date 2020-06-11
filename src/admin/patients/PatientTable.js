import React from 'react'
import { Table, Button, Space } from 'antd'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const PatientTable = ({ patients }) => {
  const { t } = useTranslation()
  const history = useHistory()

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
  patients: PropTypes.array
}

export default PatientTable
