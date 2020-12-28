import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Button,
  Typography,
  Input
} from 'antd'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import FamilyHistory from './FamilyHistory'
import PersonalHistory from './PersonalHistory'
import GeneralPractioners from './GeneralPractioners'

const { Title } = Typography
const { TextArea } = Input

const BackgroundForm = ({ next, medHistory, dispatchMedHistory }) => {
  const [diseasesForFamily, setDiseasesForFamily] = useState([])
  const [diseases, setDiseases] = useState([])
  const [{ data: diseasesData }] = useAxios({
    url: '/diseases/'
  })
  useEffect(() => {
    if (diseasesData) {
      const sortedDiseases = diseasesData.sort((a, b) => a.label.localeCompare(b.label))
      setDiseases(sortedDiseases)
      setDiseasesForFamily(sortedDiseases.map(d => { return { ...d, disabled: false } }))
    }
  }, [diseasesData])

  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Title level={4}>Appointment reason</Title>
        </Col>
      </Row>
      <Row>
        <Col offset={6} span={12}>
          <TextArea rows={3} style={ { marginBottom: '24px' } } />
        </Col>
      </Row>
      <FamilyHistory
        diseases={diseasesForFamily}
        setDiseases={setDiseasesForFamily}
        medHistory={medHistory}
        dispatchMedHistory={dispatchMedHistory}
      />
      <PersonalHistory diseases={diseases} medHistory={medHistory} dispatchMedHistory={dispatchMedHistory} />
      <GeneralPractioners medHistory={medHistory} dispatchMedHistory={dispatchMedHistory} />
      <Row>
        <Col offset={6} span={6} />
        <Col span={6}>
          <Row justify='end'>
            <Button type='primary' onClick={next}><FontAwesomeIcon icon={faChevronRight} /></Button>
          </Row>
        </Col>
      </Row>
    </>
  )
}

BackgroundForm.propTypes = {
  next: PropTypes.func,
  medHistory: PropTypes.object,
  dispatchMedHistory: PropTypes.func
}

export default BackgroundForm
