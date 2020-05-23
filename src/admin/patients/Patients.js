import React, { useState, useEffect } from 'react'
import { Table, Button, Space } from 'antd'
import useAxios from 'axios-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Patients = () => {
  const [{ data, loading, error }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/patients/`
  })
  const [patients, setPatients] = useState([])
  useEffect(() => { if (data) setPatients(data) }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'ID',
      dataIndex: 'idDocumentNumber',
      key: 'idDocumentNumber'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    }
  ]

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Button type="primary">
        <FontAwesomeIcon icon={faPlus} style={{ color: 'white', marginRight: '0.75rem' }} />
        New Patient
      </Button>
      <Table
        columns={columns}
        dataSource={patients}
        pagination={{ defaultCurrent: 1, defaultPageSize: 10, hideOnSinglePage: true }}
      />
    </Space>
  )
}

export default Patients
