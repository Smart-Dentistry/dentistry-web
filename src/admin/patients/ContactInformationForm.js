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
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'

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

const ContactInformationForm = ({ prev, next, contactInformation, setContactInformation, showRepresentative, setShowRepresentative, whatsapp, setWhatsapp }) => {
  const [form] = Form.useForm()
  const [provinces, setProvinces] = useState([])
  const [cantons, setCantons] = useState([])
  const [{ data: provincesData }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/provinces-of-ecuador/`
  })
  const [{ data: cantonsData }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/provinces-of-ecuador/${contactInformation.province === 'Azuay' ? 1 : contactInformation.province}/cantons/`
  })
  useEffect(() => {
    if (provincesData) {
      setProvinces(provincesData)
      form.setFieldsValue({
        province: contactInformation.province === 'Azuay' ? 1 : contactInformation.province
      })
    }
  }, [provincesData])
  useEffect(() => {
    if (cantonsData) {
      setCantons(cantonsData)
      form.setFieldsValue({
        canton: contactInformation.canton === 'Cuenca' ? 3 : contactInformation.canton
      })
    }
  }, [cantonsData])
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const onFinish = values => {
    setContactInformation(values)
    next()
  }
  const onValuesChange = async changedValue => {
    let response
    const key = Object.keys(changedValue)[0]
    const value = changedValue[key]
    switch (key) {
      case 'province':
        try {
          response = await axios.get(`${process.env.REACT_APP_API_URL}/provinces-of-ecuador/${value}/cantons/`)
        } catch (error) {
          console.log(error)
          return
        }
        setCantons(response.data)
        form.setFieldsValue({
          canton: response.data[0].value
        })
        break
      case 'countryResidence':
        setContactInformation({ ...contactInformation, countryResidence: value })
        break
      case 'representative':
        setShowRepresentative(value)
        break
      default: break
    }
  }
  const whatsappOnChange = e => {
    setWhatsapp(e.target.checked)
  }

  return (
    <>
      <Form
        form={form}
        layout='vertical'
        name='contactInformation'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        scrollToFirstError
        initialValues={contactInformation}
        onValuesChange={onValuesChange}
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
        {contactInformation.countryResidence === 'E' ? (
          <>
            <Row>
              <Col offset={6} span={5}>
                <Form.Item {...inputLayout} name='province' label='Province' rules={[{ required: true }]}>
                  <Select options={provinces} />
                </Form.Item>
              </Col>
              <Col offset={2} span={5}>
                <Form.Item {...inputLayout} name='canton' label='Canton' rules={[{ required: true }]}>
                  <Select options={cantons} />
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
          </>
        ) : null}
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='phone' label='Phone' rules={[{ required: true }]}>
              <PhoneInput className='telephone-input' />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='whatsapp' label='Whatsapp'>
              <Checkbox checked={whatsapp} onChange={whatsappOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Whatsapp</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='email' label='Email' rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
          </Col>
          {contactInformation.countryResidence === 'E' ? (
            <Col offset={2} span={5}>
              <Form.Item {...inputLayout} name='healthInsuranceCompany' label='Health Insurance Company'>
                <Input />
              </Form.Item>
            </Col>
          ) : null}
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
              <PhoneInput className='telephone-input' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='representative' label='Representative'>
              <Switch checked={showRepresentative} />
            </Form.Item>
          </Col>
        </Row>
        {showRepresentative ? (
          <>
            <Row>
              <Col offset={6} span={5}>
                <Form.Item {...inputLayout} name='representativeName' label='Full Name'>
                  <Input />
                </Form.Item>
              </Col>
              <Col offset={2} span={5}>
                <Form.Item {...inputLayout} name='representativePhone' label='Phone'>
                  <PhoneInput className='telephone-input' />
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
          </>
        ) : null}
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
  next: PropTypes.func,
  contactInformation: PropTypes.object,
  setContactInformation: PropTypes.func,
  showRepresentative: PropTypes.bool,
  setShowRepresentative: PropTypes.func,
  whatsapp: PropTypes.bool,
  setWhatsapp: PropTypes.func
}

export default ContactInformationForm
