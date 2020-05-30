import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Row,
  Col,
  Select,
  Input,
  Checkbox,
  Typography,
  Switch
} from 'antd'
import PropTypes from 'prop-types'
import useAxios from 'axios-hooks'
import axios from 'axios'

const { Option } = Select
const { Title } = Typography
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
  }
}

const ContactInformationForm = ({ prev, next }) => {
  const [provinces, setProvinces] = useState([])
  const [cantons, setCantons] = useState([])
  const [{ data }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/provinces-of-ecuador/`
  })
  useEffect(() => { if (data) setProvinces(data) }, [data])
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = values => {
    console.log('Finished')
    next()
  }

  const provinceOnChange = async value => {
    let response
    try {
      response = await axios.get(`${process.env.REACT_APP_API_URL}/provinces-of-ecuador/${value}/cantons/`)
    } catch (error) {
      console.log(error)
      return
    }
    setCantons(response.data)
  }

  return (
    <>
      <Form
        layout='vertical'
        name='nest-messages'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        scrollToFirstError
      >
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='countryResidence' label='Country Of Residence' rules={[{ required: true }]}>
              <Select>
                <Option value='E'>Ecuador</Option>
                <Option value='A'>Abroad</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='province' label='Province' rules={[{ required: true }]}>
              <Select onChange={provinceOnChange}>
                {provinces.map(disease => <Option key={disease.key} value={disease.key}>{disease.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='canton' label='Canton' rules={[{ required: true }]}>
              <Select>
                {cantons.map(canton => <Option key={canton.key} value={canton.key}>{canton.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='addressLine' label='Address'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='phone' label='Phone' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='whatsapp' label='Whatsapp'>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Whatsapp</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='email' label='Email' rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='healthInsuranceCompany' label='Health Insurance Company'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>Emergency Contact and Representative</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='emergencyContactName' label='Full Name'>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='emergencyContactPhone' label='Phone'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='representative' label='Representative'>
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='emergencyContactName' label='Full Name'>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='emergencyContactPhone' label='Phone'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='representativeRelationship' label='Relationship'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={6}>
            <Button type='primary' onClick={prev}>Previous</Button>
          </Col>
          <Col span={6}>
            <Row justify='end'>
              <Button type='primary' htmlType='submit'>Next</Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

ContactInformationForm.propTypes = {
  prev: PropTypes.func,
  next: PropTypes.func
}

export default ContactInformationForm
