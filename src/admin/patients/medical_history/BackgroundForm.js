import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Button
} from 'antd'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'

import FamilyHistory from './FamilyHistory'
import PersonalHistory from './PersonalHistory'
import GeneralPractioners from './GeneralPractioners'

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
      <FamilyHistory
        diseases={diseasesForFamily}
        setDiseases={setDiseasesForFamily}
        medHistory={medHistory}
        dispatchPatient={dispatchMedHistory}
      />
      <PersonalHistory diseases={diseases} medHistory={medHistory} dispatchPatient={dispatchMedHistory} />
      <GeneralPractioners medHistory={medHistory} dispatchMedHistory={dispatchMedHistory} />
      <Row>
        <Col offset={6} span={6} />
        <Col span={6}>
          <Row justify='end'>
            <Button type='primary' onClick={next}>Next</Button>
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