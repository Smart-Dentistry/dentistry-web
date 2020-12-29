import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useParams, useHistory, useLocation, Link } from 'react-router-dom'
import useAxios from 'axios-hooks'

const { Title } = Typography

const getFullName = patient => `${patient.firstName} ${patient.middleName} ${patient.lastName} ${patient.secondLastName}`

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
    </>
  )
}

export default MedicalHistoryDetails
