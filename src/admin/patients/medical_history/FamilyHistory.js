import React, { useState } from 'react'
import {
  Row,
  Col,
  Select,
  Checkbox,
  Button,
  Tag,
  Typography,
  Input,
  Tooltip
} from 'antd'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography
const { TextArea } = Input
const RELATIVES = {
  M: '👩🏼',
  MGM: '👵🏻',
  MGF: '👴🏻',
  F: '👨🏿',
  FGM: '👵🏿',
  FGF: '👴🏿',
  S: '🧒🏽'
}

const FamilyHistory = ({ diseases, setDiseases, medHistory, dispatchMedHistory }) => {
  const [disease, setDisease] = useState(null)
  const [enableAddFamilyDisease, setEnableAddFamilyDisease] = useState(false)
  const [familyBackground, setFamilyBackground] = useState(medHistory.familyHistory.diseases.map(item => `${item.label} ${item.relatives.map(e => RELATIVES[e]).join('')}`))
  const [selectedRelatives, setSelectedRelatives] = useState([])

  const relativesOnChange = checkedValues => {
    setEnableAddFamilyDisease(disease && checkedValues.length > 0)
    setSelectedRelatives(checkedValues)
  }
  const diseaseOnChange = value => {
    setDisease(value)
    setEnableAddFamilyDisease(selectedRelatives.length > 0)
  }
  const observationsOnchange = e => {
    dispatchMedHistory({ type: 'UPDATE', updatedValues: { familyHistory: { ...medHistory.familyHistory, observations: e.target.value } } })
  }
  const addFamilyDisease = () => {
    const tempDiseases = [...diseases]
    const tempDisease = tempDiseases.find(e => e.value === disease)
    tempDisease.disabled = true
    setDiseases(tempDiseases)
    const newDisease = `${tempDisease.label} ${selectedRelatives.map(e => RELATIVES[e]).join('')}`
    setFamilyBackground([...familyBackground, newDisease])
    dispatchMedHistory({
      type: 'UPDATE',
      updatedValues: {
        familyHistory: {
          ...medHistory.familyHistory,
          diseases: [
            ...medHistory.familyHistory.diseases,
            {
              id: disease,
              label: tempDisease.label,
              relatives: selectedRelatives
            }
          ]
        }
      }
    })
    setDisease(null)
    setSelectedRelatives([])
    setEnableAddFamilyDisease(false)
  }
  const removeFamilyDisease = (diseaseToRemove, key) => {
    const newDiseases = familyBackground.filter(e => e !== diseaseToRemove)
    const newFamilyHistory = [...medHistory.familyHistory.diseases]
    const diseaseToRemoveValue = newFamilyHistory[key].id
    const tempDiseases = [...diseases]
    const tempDisease = tempDiseases.find(e => e.value === diseaseToRemoveValue)
    tempDisease.disabled = false
    setDiseases(tempDiseases)
    newFamilyHistory.splice(key, 1)
    setFamilyBackground(newDiseases)
    dispatchMedHistory({
      type: 'UPDATE',
      updatedValues: {
        familyHistory: {
          ...medHistory.familyHistory,
          diseases: newFamilyHistory
        }
      }
    })
  }

  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Title level={4}>Family history</Title>
        </Col>
      </Row>
      <Row style={{ marginBottom: '16px' }}>
        <Col offset={6} span={12}>
          <div className='ant-form-item-label'>
            <label>Disease</label>
          </div>
        </Col>
        <Col offset={6} span={5}>
          <Select value={disease} options={diseases} style={{ width: '100%' }} onChange={diseaseOnChange} />
        </Col>
      </Row>
      <Checkbox.Group value={selectedRelatives} style={{ width: '100%' }} onChange={relativesOnChange}>
        <Row gutter={[0, 16]}>
          <Col offset={6} span={4}>
            <Checkbox value='M'><span className='checkbox-text'>Mother 👩🏼</span></Checkbox>
          </Col>
          <Col offset={0} span={4}>
            <Checkbox value='MGM'><span className='checkbox-text'>Grandma 👵🏻</span></Checkbox>
          </Col>
          <Col offset={0} span={4}>
            <Checkbox value='MGF'><span className='checkbox-text'>Grandpa 👴🏻</span></Checkbox>
          </Col>
          <Col offset={6} span={4}>
            <Checkbox value='F'><span className='checkbox-text'>Father 👨🏿</span></Checkbox>
          </Col>
          <Col offset={0} span={4}>
            <Checkbox value='FGM'><span className='checkbox-text'>Grandma 👵🏿</span></Checkbox>
          </Col>
          <Col offset={0} span={4}>
            <Checkbox value='FGF'><span className='checkbox-text'>Grandpa 👴🏿</span></Checkbox>
          </Col>
          <Col offset={6} span={4}>
            <Checkbox value='S'><span className='checkbox-text'>Siblings 🧒🏽</span></Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
      <Row gutter={[0, 16]}>
        <Col offset={6} span={3}>
          <Tooltip title='Select disease and relative(s)'>
            <Button disabled={!enableAddFamilyDisease} type='primary' onClick={addFamilyDisease}><PlusOutlined />Add</Button>
          </Tooltip>
        </Col>
        {familyBackground.length > 0 ? (
          <Col offset={6} span={12}>
            {familyBackground.map((item, key) => <Tag closable onClose={() => removeFamilyDisease(item, key)} key={item}>{item}</Tag>)}
          </Col>
        ) : (
          <Col offset={6} span={12}>
            <em>No diseases</em>
          </Col>
        ) }
      </Row>
      <Row>
        <Col offset={6} span={12}>
          <div className='ant-form-item-label'>
            <label>Observations</label>
          </div>
        </Col>
        <Col offset={6} span={12}>
          <TextArea value={medHistory.familyHistory.observations} onChange={observationsOnchange} rows={2} style={{ marginBottom: '24px' }} />
        </Col>
      </Row>
    </>
  )
}

FamilyHistory.propTypes = {
  diseases: PropTypes.array,
  setDiseases: PropTypes.func,
  medHistory: PropTypes.object,
  dispatchMedHistory: PropTypes.func
}

export default FamilyHistory
