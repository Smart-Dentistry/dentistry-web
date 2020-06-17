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

const ContactInformationForm = ({ prev, next, patient, dispatchPatient, showRepresentative, setShowRepresentative }) => {
  const [form] = Form.useForm()
  const [provinces, setProvinces] = useState([])
  const [cantons, setCantons] = useState([])
  const [{ data: provincesData }] = useAxios({
    url: '/provinces-of-ecuador/'
  })
  const [{ data: cantonsData }] = useAxios({
    url: `/provinces-of-ecuador/${patient.province === 'Azuay' ? 1 : patient.province}/cantons/`
  })
  useEffect(() => {
    if (provincesData) {
      setProvinces(provincesData)
      const province = provincesData.find(province => province.value === patient.province)
      form.setFieldsValue({
        province: province ? province.label : 1
      })
    }
  }, [provincesData])
  useEffect(() => {
    if (cantonsData) {
      setCantons(cantonsData)
      const canton = cantonsData.find(canton => canton.value === patient.canton)
      form.setFieldsValue({
        canton: canton ? canton.label : 3
      })
    }
  }, [cantonsData])
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const onFinish = values => {
    values.whatsapp = patient.whatsapp
    const emergencyContact = {
      fullName: values.emergencyContactName,
      phone: values.emergencyContactPhone
    }
    const representative = {
      fullName: values.representativeName,
      phone: values.representativePhone,
      relationship: values.representativeRelationship
    }
    dispatchPatient({ type: 'UPDATE', updatedValues: { ...values, emergencyContact, representative } })
    next()
  }
  const onValuesChange = async changedValue => {
    let response
    const key = Object.keys(changedValue)[0]
    const value = changedValue[key]
    switch (key) {
      case 'province':
        try {
          response = await axios.get(`/provinces-of-ecuador/${value}/cantons/`)
        } catch (error) {
          console.log(error)
          return
        }
        setCantons(response.data)
        form.setFieldsValue({
          canton: response.data[0].value
        })
        break
      case 'countryOfResidence':
        dispatchPatient({ type: 'UPDATE', updatedValues: { countryOfResidence: value } })
        break
      case 'representative':
        setShowRepresentative(value)
        break
      default: break
    }
  }
  const whatsappOnChange = e => {
    dispatchPatient({ type: 'UPDATE', updatedValues: { whatsapp: e.target.checked } })
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
    dispatchPatient({ type: 'UPDATE', updatedValues: { ...values, emergencyContact, representative } })
    dispatchPatient({ type: 'UPDATE', updatedValues: { whatsapp: patient.whatsapp } })
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
        initialValues={patient}
        onValuesChange={onValuesChange}
      >
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='countryOfResidence' label='Country Of Residence' rules={[{ required: true }]}>
              <Select options={countryOfResidenceOptions} />
            </Form.Item>
          </Col>
        </Row>
        {patient.countryOfResidence === 'E' ? (
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
              <PhoneInput defaultCountry='EC' className='telephone-input' placeholder={formatPhoneNumberIntl('+593987654321')}/>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='whatsapp' label='Whatsapp'>
              <Checkbox checked={patient.whatsapp} onChange={whatsappOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Whatsapp</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='email' label='Email' rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
          </Col>
          {patient.countryOfResidence === 'E' ? (
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
                  <PhoneInput defaultCountry='EC' className='telephone-input' placeholder={formatPhoneNumberIntl('+593987654321')}/>
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
  patient: PropTypes.object,
  dispatchPatient: PropTypes.func,
  showRepresentative: PropTypes.bool,
  setShowRepresentative: PropTypes.func
}

export default ContactInformationForm
