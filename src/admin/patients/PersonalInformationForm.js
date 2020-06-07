import React from 'react'
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
import moment from 'moment'
import PropTypes from 'prop-types'
import PatientPicture from './PatientPicture'

const inputLayout = {
  wrapperCol: { span: 24 }
}
const validateMessages = {
  // eslint-disable-next-line
  required: '${label} is required!'
}
const sexOptions = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' }
]
const maritalStatusOptions = [
  { value: 'SI', label: 'Single' },
  { value: 'MA', label: 'Married' },
  { value: 'DI', label: 'Divorced' },
  { value: 'WI', label: 'Widowed' },
  { value: 'DP', label: 'Domestic Partnership' },
  { value: 'NS', label: 'Not Specified' }
]
const referralSourceOptions = [
  { value: 'P', label: 'Personal Reference' },
  { value: 'S', label: 'Social Media' },
  { value: 'O', label: 'Other' }
]

const PersonalInformationForm = ({ next, personalInformation, setPersonalInformation, showRepresentative, setShowRepresentative, imageUrl, setImageUrl, receivePromos, setReceivePromos, setS3ImageUrl }) => {
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const onFinish = values => {
    setPersonalInformation(values)
    next()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const datePickerOnChange = value => {
    const years = moment().diff(value, 'years')
    setShowRepresentative(years < 18)
  }
  const receivePromosOnChange = e => {
    setReceivePromos(e.target.checked)
  }
  return (
    <>
      <Row justify='center'>
        <Col>
          <PatientPicture imageUrl={imageUrl} setImageUrl={setImageUrl} setS3ImageUrl={setS3ImageUrl} />
        </Col>
      </Row>
      <Form
        layout='vertical'
        name='personalInformation'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        initialValues={personalInformation}
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
              <Select options={sexOptions} />
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
              <Select options={maritalStatusOptions} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='birthdate' label='Birthdate' rules={[{ required: true }]}>
              <DatePicker onChange={datePickerOnChange} />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='referralSource' label='Referral Source' rules={[{ required: true }]}>
              <Select options={referralSourceOptions} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='receivePromos'>
              <Checkbox checked={receivePromos} onChange={receivePromosOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Receive Promos</span></Checkbox>
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
  next: PropTypes.func,
  personalInformation: PropTypes.object,
  setPersonalInformation: PropTypes.func,
  showRepresentative: PropTypes.bool,
  setShowRepresentative: PropTypes.func,
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  receivePromos: PropTypes.bool,
  setReceivePromos: PropTypes.func,
  setS3ImageUrl: PropTypes.func
}

export default PersonalInformationForm
