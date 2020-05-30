import React, { useState } from 'react'
import {
  Form,
  Button,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Checkbox
} from 'antd'
import PropTypes from 'prop-types'
import PatientPicture from './PatientPicture'

const { Option } = Select
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

const PersonalInformationForm = ({ next }) => {
  const [imageUrl, setImageUrl] = useState()

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = values => {
    const birthdate = values.birthdate.format('YYYY-MM-DD')
    const patient = {
      firstName: values.firstName,
      lastName: values.lastName,
      idDocumentNumber: values.idDocumentNumber,
      sex: values.sex,
      jobTitle: values.jobTitle,
      maritalStatus: values.maritalStatus,
      birthdate,
      phone: values.phone,
      whatsapp: values.whatsapp,
      healthInsuranceCompany: values.healthInsuranceCompany,
      email: values.email,
      receivePromos: values.receivePromos,
      referralSource: values.referralSource
    }
    console.log(patient)
    next()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      <Row justify='center'>
        <Col>
          <PatientPicture imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </Col>
      </Row>
      <Form
        layout='vertical'
        name='nest-messages'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='firstName' label='First Name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='middleName' label='Middle Name'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='lastName' label='Last Name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='secondLastName' label='Second Last Name'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='idDocumentNumber' label='ID' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='sex' label='Sex' rules={[{ required: true }]}>
              <Select>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='jobTitle' label='Job Title'>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='maritalStatus' label='Marital Status' rules={[{ required: true }]}>
              <Select>
                <Option value='SI'>Single</Option>
                <Option value='MA'>Married</Option>
                <Option value='DI'>Divorced</Option>
                <Option value='WI'>Widowed</Option>
                <Option value='DP'>Domestic Partnership</Option>
                <Option value='NS'>Not Specified</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='birthdate' label='Birthdate' rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='referralSource' label='Referral Source' rules={[{ required: true }]}>
              <Select>
                <Option value='P'>Personal Reference</Option>
                <Option value='S'>Social Media</Option>
                <Option value='O'>Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='whatsapp' label='Receive Promos'>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Receive Promos</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} />
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

PersonalInformationForm.propTypes = {
  next: PropTypes.func
}

export default PersonalInformationForm
