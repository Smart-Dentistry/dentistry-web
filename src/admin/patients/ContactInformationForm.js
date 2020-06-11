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
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input'

import 'react-phone-number-input/style.css'

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
const countryOfResidenceOptions = [
  { value: 'E', label: 'Ecuador' },
  { value: 'A', label: 'Abroad' }
]

const ContactInformationForm = ({ prev, next, newPatient, dispatchNewPatient, showRepresentative, setShowRepresentative }) => {
  const [form] = Form.useForm()
  const [provinces, setProvinces] = useState([])
  const [cantons, setCantons] = useState([])
  const [{ data: provincesData }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/provinces-of-ecuador/`
  })
  const [{ data: cantonsData }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/provinces-of-ecuador/${newPatient.province === 'Azuay' ? 1 : newPatient.province}/cantons/`
  })
  useEffect(() => {
    if (provincesData) {
      setProvinces(provincesData)
      form.setFieldsValue({
        province: newPatient.province === 'Azuay' ? 1 : newPatient.province
      })
    }
  }, [provincesData])
  useEffect(() => {
    if (cantonsData) {
      setCantons(cantonsData)
      form.setFieldsValue({
        canton: newPatient.canton === 'Cuenca' ? 3 : newPatient.canton
      })
    }
  }, [cantonsData])
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const onFinish = values => {
    const emergencyContact = {
      fullName: values.emergencyContactName,
      phone: values.emergencyContactPhone
    }
    const representative = {
      fullName: values.representativeName,
      phone: values.representativePhone,
      relationship: values.representativeRelationship
    }
    dispatchNewPatient({ type: 'UPDATE', updatedValues: { ...values, emergencyContact, representative } })
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
        dispatchNewPatient({ type: 'UPDATE', updatedValues: { countryResidence: value } })
        break
      case 'representative':
        setShowRepresentative(value)
        break
      default: break
    }
  }
  const whatsappOnChange = e => {
    dispatchNewPatient({ type: 'UPDATE', updatedValues: { whatsapp: e.target.checked } })
  }
  const previous = () => {
    const values = form.getFieldsValue()
    const emergencyContact = {
      fullName: values.emergencyContactName,
      phone: values.emergencyContactPhone
    }
    const representative = {
      fullName: values.representativeName,
      phone: values.representativePhone,
      relationship: values.representativeRelationship
    }
    dispatchNewPatient({ type: 'UPDATE', updatedValues: { ...values, emergencyContact, representative } })
    dispatchNewPatient({ type: 'UPDATE', updatedValues: { whatsapp: newPatient.whatsapp } })
    prev()
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
        initialValues={newPatient}
        onValuesChange={onValuesChange}
      >
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='countryResidence' label='Country Of Residence' rules={[{ required: true }]}>
              <Select options={countryOfResidenceOptions} />
            </Form.Item>
          </Col>
        </Row>
        {newPatient.countryResidence === 'E' ? (
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
              <PhoneInput defaultCountry='EC' className='telephone-input' />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='whatsapp' label='Whatsapp'>
              <Checkbox checked={newPatient.whatsapp} onChange={whatsappOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Whatsapp</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='email' label='Email' rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
          </Col>
          {newPatient.countryResidence === 'E' ? (
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
              <PhoneInput placeholder={formatPhoneNumberIntl('+593987654321')} defaultCountry='EC' className='telephone-input' />
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
                  <PhoneInput defaultCountry='EC' className='telephone-input' />
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
            <Button type='primary' onClick={previous}>Previous</Button>
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
  newPatient: PropTypes.object,
  dispatchNewPatient: PropTypes.func,
  showRepresentative: PropTypes.bool,
  setShowRepresentative: PropTypes.func
}

export default ContactInformationForm
