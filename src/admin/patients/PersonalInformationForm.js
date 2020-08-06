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
import i18n from '../../i18n'
import { useTranslation } from 'react-i18next'
import PatientPicture from './PatientPicture'

const inputLayout = {
  wrapperCol: { span: 24 }
}
const validateMessages = {
  // eslint-disable-next-line
  required: '${label} is required!'
}
const sexOptions = [
  { value: 'M', label: i18n.t('Male') },
  { value: 'F', label: i18n.t('Female') }
]
const maritalStatusOptions = [
  { value: 'SI', label: i18n.t('Single') },
  { value: 'MA', label: i18n.t('Married') },
  { value: 'DI', label: i18n.t('Divorced') },
  { value: 'WI', label: i18n.t('Widowed') },
  { value: 'DP', label: i18n.t('Domestic Partnership') },
  { value: 'NS', label: i18n.t('Not Specified') }
]
const referralSourceOptions = [
  { value: 'P', label: i18n.t('Personal Reference') },
  { value: 'S', label: i18n.t('Social Media') },
  { value: 'O', label: i18n.t('Other') }
]

const PersonalInformationForm = ({ next, patient, dispatchPatient, setShowRepresentative, image, setImage }) => {
  const { t } = useTranslation()
  const onFinish = values => {
    values.receivePromos = patient.receivePromos
    dispatchPatient({ type: 'UPDATE', updatedValues: values })
    next()
  }
  const datePickerOnChange = value => {
    const years = moment().diff(value, 'years')
    setShowRepresentative(years < 18)
  }
  const receivePromosOnChange = e => {
    dispatchPatient({ type: 'UPDATE', updatedValues: { receivePromos: e.target.checked } })
  }
  const disabledDate = (current) => {
    return current && current >= moment().startOf('day')
  }
  return (
    <>
      <Row justify='center'>
        <Col>
          <PatientPicture image={image} setImage={setImage} dispatchPatient={dispatchPatient} />
        </Col>
      </Row>
      <Form
        layout='vertical'
        name='personalInformation'
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={patient}
      >
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='firstName' label={t('First Name')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='middleName' label={t('Middle Name')}>
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
            <Form.Item {...inputLayout} name='secondLastName' label={t('Second Last Name')}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='idDocumentNumber' label={t('ID')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='sex' label={t('Sex')} rules={[{ required: true }]}>
              <Select options={sexOptions} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='jobTitle' label={t('Job Title')}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='maritalStatus' label={t('Marital Status')} rules={[{ required: true }]}>
              <Select options={maritalStatusOptions} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='birthdate' label={t('Birthdate')} rules={[{ required: true }]}>
              <DatePicker onChange={datePickerOnChange} disabledDate={disabledDate} showToday={false} />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='referralSource' label={t('Referral Source')} rules={[{ required: true }]}>
              <Select options={referralSourceOptions} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='receivePromos'>
              <Checkbox checked={patient.receivePromos} onChange={receivePromosOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Receive Promos')}</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={12} span={6}>
            <Row justify='end'>
              <Button type='primary' htmlType='submit'>{t('Next')}</Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

PersonalInformationForm.propTypes = {
  next: PropTypes.func,
  patient: PropTypes.object,
  dispatchPatient: PropTypes.func,
  setShowRepresentative: PropTypes.func,
  image: PropTypes.string,
  setImage: PropTypes.func
}

export default PersonalInformationForm
