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

const BackgroundForm = ({ prev, familyHistory, setFamilyHistory, personalHistory, setPersonalHistory, familyHistoryObservations, setFamilyHistoryObservations, generalPractitioners, setGeneralPractitioners, createPatient }) => {
  const [diseasesForFamily, setDiseasesForFamily] = useState([])
  const [diseases, setDiseases] = useState([])
  const [{ data: diseasesData }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/diseases/`
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
        familyHistory={familyHistory}
        setFamilyHistory={setFamilyHistory}
        familyHistoryObservations={familyHistoryObservations}
        setFamilyHistoryObservations={setFamilyHistoryObservations}
      />
      <PersonalHistory diseases={diseases} personalHistory={personalHistory} setPersonalHistory={setPersonalHistory}/>
      <GeneralPractioners generalPractitioners={generalPractitioners} setGeneralPractitioners={setGeneralPractitioners} />
      <Row>
        <Col offset={6} span={6}>
          <Button type='primary' onClick={prev}>Previous</Button>
        </Col>
        <Col span={6}>
          <Row justify='end'>
            <Button type='primary' onClick={createPatient}>Create</Button>
          </Row>
        </Col>
      </Row>
    </>
  )
}

BackgroundForm.propTypes = {
  prev: PropTypes.func,
  familyHistory: PropTypes.array,
  setFamilyHistory: PropTypes.func,
  personalHistory: PropTypes.object,
  setPersonalHistory: PropTypes.func,
  familyHistoryObservations: PropTypes.string,
  setFamilyHistoryObservations: PropTypes.func,
  generalPractitioners: PropTypes.array,
  setGeneralPractitioners: PropTypes.func,
  createPatient: PropTypes.func
}

export default BackgroundForm
