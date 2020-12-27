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
  Switch,
  Modal
} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import useAxios from 'axios-hooks'
import axios from 'axios'
import i18n from '../../../i18n'
import { useTranslation } from 'react-i18next'
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'

import 'react-phone-number-input/style.css'

const { Title } = Typography
const { confirm } = Modal
const inputLayout = {
  wrapperCol: { span: 24 }
}

const validateMessages = {
  // eslint-disable-next-line
  required: '${label} is required!',
  types: {
    // eslint-disable-next-line
    email: '${label} is not a valid email!',
    // eslint-disable-next-line
    number: '${label} is not a valid number!'
  }
}
const countryOfResidenceOptions = [
  { value: 'E', label: 'Ecuador' },
  { value: 'A', label: i18n.t('Abroad') }
]

const ContactInformationForm = ({ prev, patient, dispatchPatient, showRepresentative, setShowRepresentative, processPatient }) => {
  const { t } = useTranslation()
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

  const savePatient = (values, continueToMedHistory = true) => {
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
    processPatient(patient, continueToMedHistory)
  }

  const onFinish = values => {
    if (patient.key) {
      savePatient(values)
    } else {
      confirm({
        title: 'Medical History',
        icon: <QuestionCircleOutlined />,
        content: 'Would you like to continue to the medical history?',
        okText: 'Yes',
        cancelText: 'No',
        onOk () {
          savePatient(values)
        },
        onCancel () {
          savePatient(values, false)
        }
      })
    }
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
      case 'phone':
        dispatchPatient({ type: 'UPDATE', updatedValues: { phone: value } })
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
        validateMessages={validateMessages}
        scrollToFirstError
        initialValues={patient}
        onValuesChange={onValuesChange}
      >
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='countryOfResidence' label={t('Country Of Residence')} rules={[{ required: true }]}>
              <Select options={countryOfResidenceOptions} />
            </Form.Item>
          </Col>
        </Row>
        {patient.countryOfResidence === 'E' ? (
          <>
            <Row>
              <Col offset={6} span={5}>
                <Form.Item {...inputLayout} name='province' label={t('Province')} rules={[{ required: true }]}>
                  <Select options={provinces} />
                </Form.Item>
              </Col>
              <Col offset={2} span={5}>
                <Form.Item {...inputLayout} name='canton' label={t('Canton')} rules={[{ required: true }]}>
                  <Select options={cantons} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col offset={6} span={12}>
                <Form.Item {...inputLayout} name='addressLine' label={t('Address')}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : null}
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='phone' label={t('Phone')} rules={[{ required: true },
              ({ getFieldValue }) => ({
                validator (rule, value) {
                  if (isValidPhoneNumber(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t('Invalid phone number')))
                }
              })]}>
              <PhoneInput defaultCountry='EC' className='telephone-input' placeholder={formatPhoneNumberIntl('+593987654321')} />
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
              <Form.Item {...inputLayout} name='healthInsuranceCompany' label={t('Health Insurance Company')}>
                <Input />
              </Form.Item>
            </Col>
          ) : null}
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>{t('Emergency Contact and Representative')}</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='emergencyContactName' label={t('Full Name')}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='emergencyContactPhone' label={t('Phone')} rules={[
              ({ getFieldValue }) => ({
                validator (rule, value) {
                  if (!value || isValidPhoneNumber(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t('Invalid phone number')))
                }
              })]}>
              <PhoneInput placeholder={formatPhoneNumberIntl('+593987654321')} defaultCountry='EC' className='telephone-input' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='representative' label={t('Representative')}>
              <Switch checked={showRepresentative} />
            </Form.Item>
          </Col>
        </Row>
        {showRepresentative ? (
          <>
            <Row>
              <Col offset={6} span={5}>
                <Form.Item {...inputLayout} name='representativeName' label={t('Full Name')}>
                  <Input />
                </Form.Item>
              </Col>
              <Col offset={2} span={5}>
                <Form.Item {...inputLayout} name='representativePhone' label={t('Phone')} rules={[
                  ({ getFieldValue }) => ({
                    validator (rule, value) {
                      if (!value || isValidPhoneNumber(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error(t('Invalid phone number')))
                    }
                  })]}>
                  <PhoneInput defaultCountry='EC' className='telephone-input' placeholder={formatPhoneNumberIntl('+593987654321')} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col offset={6} span={5}>
                <Form.Item {...inputLayout} name='representativeRelationship' label={t('Relationship')}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : null}
        <Row>
          <Col offset={6} span={6}>
            <Button type='primary' onClick={previous}><FontAwesomeIcon icon={faChevronLeft} /></Button>
          </Col>
          <Col span={6}>
            <Row justify='end'>
              <Button type='primary' htmlType='submit'>
                <FontAwesomeIcon icon={faSave} />
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

ContactInformationForm.propTypes = {
  prev: PropTypes.func,
  patient: PropTypes.object,
  dispatchPatient: PropTypes.func,
  showRepresentative: PropTypes.bool,
  setShowRepresentative: PropTypes.func,
  processPatient: PropTypes.func
}

export default ContactInformationForm
