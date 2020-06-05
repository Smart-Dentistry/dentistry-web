import React, { useState } from 'react'
import {
  Form,
  Row,
  Col,
  Select,
  Checkbox,
  Button,
  Tag,
  Typography,
  Input
} from 'antd'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography
const { TextArea } = Input
const inputLayout = {
  wrapperCol: { span: 24 }
}
const RELATIVES = {
  M: '👩🏼',
  MGM: '👵🏻',
  MGF: '👴🏻',
  F: '👨🏿',
  FGM: '👵🏿',
  FGF: '👴🏿',
  S: '🧒🏽'
}

const FamilyHistory = ({ diseases }) => {
  const [disease, setDisease] = useState(null)
  const [disableFamilyHistory, setDisableFamilyHistory] = useState(true)
  const [familyBackground, setFamilyBackground] = useState([])
  const [selectedRelatives, setSelectedRelatives] = useState([])

  const relativesOnChange = checkedValues => {
    setDisableFamilyHistory(!disease || checkedValues.length === 0)
    setSelectedRelatives(checkedValues)
  }
  const diseaseOnChange = value => {
    setDisease(value)
    setDisableFamilyHistory(selectedRelatives.length === 0)
  }
  const addFamilyDisease = () => {
    const newDisease = `${diseases.find(e => e.value === disease).label} ${selectedRelatives.map(e => RELATIVES[e]).join('')}`
    setFamilyBackground([...familyBackground, newDisease])
    setDisease(null)
    setSelectedRelatives([])
    setDisableFamilyHistory(true)
    console.log(familyBackground)
  }
  const removeFamilyDisease = diseaseToRemove => {
    const newDiseases = familyBackground.filter(e => e !== diseaseToRemove)
    setFamilyBackground(newDiseases)
  }

  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Title level={4}>Family history</Title>
        </Col>
      </Row>
      <Row>
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
          <Button disabled={disableFamilyHistory} type='primary' onClick={addFamilyDisease}><PlusOutlined />Add</Button>
        </Col>
        <Col offset={6} span={12}>
          {familyBackground.map((item, key) => <Tag closable onClose={() => removeFamilyDisease(item)} key={item}>{item}</Tag>)}
        </Col>
      </Row>
      <Row>
        <Col offset={6} span={12}>
          <Form.Item {...inputLayout} name='familyHistoryObservations' label='Observations'>
            <TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

FamilyHistory.propTypes = {
  diseases: PropTypes.array
}

export default FamilyHistory
