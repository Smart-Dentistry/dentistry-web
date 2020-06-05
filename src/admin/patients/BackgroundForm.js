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

const BackgroundForm = ({ prev, background, setBackground }) => {
  const [diseases, setDiseases] = useState([])
  const [generalPractitioners, setGeneralPractitioners] = useState([])
  const [{ data: diseasesData }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/diseases/`
  })
  useEffect(() => {
    if (diseasesData) {
      setDiseases(diseasesData.sort((a, b) => a.label.localeCompare(b.label)))
    }
  }, [diseasesData])

  return (
    <>
      <FamilyHistory diseases={diseases} />
      <PersonalHistory diseases={diseases} />
      <GeneralPractioners generalPractitioners={generalPractitioners} setGeneralPractitioners={setGeneralPractitioners} />
      <Row>
        <Col offset={6} span={6}>
          <Button type='primary' onClick={prev}>Previous</Button>
        </Col>
        <Col span={6}>
          <Row justify='end'>
            <Button type='primary'>Create</Button>
          </Row>
        </Col>
      </Row>
    </>
  )
}

BackgroundForm.propTypes = {
  prev: PropTypes.func,
  background: PropTypes.object,
  setBackground: PropTypes.func
}

export default BackgroundForm
