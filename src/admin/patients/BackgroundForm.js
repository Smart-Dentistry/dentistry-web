import React, { useState, useEffect } from 'react'
import {
  Form,
  Row,
  Col,
  Select,
  Input,
  Checkbox,
  Typography,
  Button,
  Tag
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import useAxios from 'axios-hooks'

const { Option } = Select
const { Title } = Typography
const { TextArea } = Input
const inputLayout = {
  wrapperCol: { span: 24 }
}

const validateMessages = {
  // eslint-disable-next-line
  required: '${label} is required!',
  types: {
    // eslint-disable-next-line
    email: '${label} is not validate email!',
    // eslint-disable-next-line
    number: '${label} is not a validate number!'
  },
  number: {
    // eslint-disable-next-line
    range: '${label} must be between ${min} and ${max}'
  }
}

const BackgroundForm = ({ prev }) => {
  const [diseases, setDiseases] = useState([])
  const [{ data: diseasesData }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/diseases/`
  })
  useEffect(() => {
    if (diseasesData) {
      setDiseases(diseasesData.sort((a, b) => a.name.localeCompare(b.name)))
    }
  }, [diseasesData])

  const [familyBackground] = useState(['Diabetes (M-MGM-MGF)', 'Others (S)'])

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = values => {
    console.log('Finished')
  }

  function handleChange (value) {
    console.log(`selected ${value}`)
  }

  function log (e) {
    console.log(e)
  }

  return (
    <>
      <Form
        layout='vertical'
        name='backgroundInformation'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>Family history</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='familyHistoryDisease' label=''>
              <Select>
                {diseases.map(disease => <Option key={disease.key} value={disease.key}>{disease.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Form.Item {...inputLayout} name='mother' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Mother (M)</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={0} span={4}>
            <Form.Item {...inputLayout} name='motherGrandma' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Grandma (MGM)</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={0} span={4}>
            <Form.Item {...inputLayout} name='motherGrandpa' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Grandpa (MGP)</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Form.Item {...inputLayout} name='father' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Father (F)</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={0} span={4}>
            <Form.Item {...inputLayout} name='fatherGrandma' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Grandma (FGM)</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={0} span={4}>
            <Form.Item {...inputLayout} name='fatherGrandpa' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Grandpa (FGP)</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Form.Item {...inputLayout} name='siblings' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Siblings (S)</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Button type='primary' style={{ marginBottom: 15 }}><PlusOutlined />Add</Button>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='familyHistoryObservations' label='Observations'>
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>Personal history</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='personalHistory' label=''>
              <Select
                mode='multiple'
                style={{ width: '100%' }}
                placeholder='Please select'
                onChange={handleChange}
                filterOption={(inputValue, option) => option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
              >
                {diseases.map(disease => <Option key={disease.key} value={disease.key}>{disease.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='personalHistoryObservations' label='Observations'>
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>General practitioners</Title>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col offset={6} span={4}>
            <Form.Item {...inputLayout} name='practitionerName' label='Name'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item {...inputLayout} name='practitionerPhone' label='Phone'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item {...inputLayout} name='practitionerDisease' label='Disease'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Button type='primary' style={{ marginBottom: 25 }}><PlusOutlined />Add</Button>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={6}>
            <Button type='primary' onClick={prev}>Previous</Button>
          </Col>
          <Col span={6}>
            <Row justify='end'>
              <Button type='primary' htmlType='submit'>Create</Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

BackgroundForm.propTypes = {
  prev: PropTypes.func
}

export default BackgroundForm
