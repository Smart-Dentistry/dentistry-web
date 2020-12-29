import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Space, Tag } from 'antd'
import { useParams, useHistory, useLocation, Link } from 'react-router-dom'
import useAxios from 'axios-hooks'

const { Title } = Typography

const getFullName = patient => `${patient.firstName} ${patient.middleName} ${patient.lastName} ${patient.secondLastName}`
const RELATIVES = {
  M: '👩🏼',
  MGM: '👵🏻',
  MGF: '👴🏻',
  F: '👨🏿',
  FGM: '👵🏿',
  FGF: '👴🏿',
  S: '🧒🏽'
}

const MedicalHistoryDetails = () => {
  const history = useHistory()
  const location = useLocation()
  if (location.state === undefined) {
    history.push('/admin/patients')
    return <></>
  }
  const patient = location.state.patient
  const { key } = useParams()
  const [{ data, loading, error }] = useAxios({
    url: `/patients/${key}/get_med_history/`
  })
  const [medHistory, setMedHistory] = useState(null)
  useEffect(() => { if (data) setMedHistory(data) }, [data])

  if (loading) return <p>Loading...</p>
  if (error) {
    history.push({
      pathname: `/admin/patients/${patient.key}/details`,
      state: { patient }
    })
    return <></>
  }
  console.log(medHistory)
  return (
    <>
      <Title level={2}>
        <Link to={{ pathname: `/admin/patients/${patient.key}/details`, state: { patient } }}>
          {getFullName(patient)}
        </Link>
      </Title>
      <Title level={4}>First Appointment Reason</Title>
      <Row>
        <Col span={6}>
          <p>{data.appointmentReason ? data.appointmentReason : 'Not specified'}</p>
        </Col>
      </Row>
      <Title level={4}>Family History</Title>
      { data.familyHistory.diseases.length > 0 ? (
        <>
          <Row style={{ marginBottom: '12px' }}>
            <Col span={20}>
              <Space size="middle">
                <span>Mother 👩🏼</span>
                <span>Grandma 👵🏻</span>
                <span>Grandpa 👴🏻</span>
                <span>Father 👨🏿</span>
                <span>Grandma 👵🏿</span>
                <span>Grandpa 👴🏿</span>
                <span>Siblings 🧒🏽</span>
              </Space>
            </Col>
          </Row>
          <Row style={{ marginBottom: '24px' }}>
            <Col span={20}>
              {data.familyHistory.diseases.map(item => <Tag key={item}>{item.label} {item.relatives.map(relative => RELATIVES[relative])}</Tag>)}
            </Col>
          </Row>
        </>
      ) : 'No diseases'}
      <Title level={4}>Personal History</Title>
      <Title level={4}>General Practitioners</Title>
      <Title level={4}>Clinical Exam</Title>
      <Title level={4}>Periodontal Exam</Title>
      <Title level={4}>Non-pathological Background</Title>
    </>
  )
}

export default MedicalHistoryDetails
