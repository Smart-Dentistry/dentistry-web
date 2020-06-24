import React, { useState } from 'react'
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Card,
  Typography,
  Tooltip,
  Space,
  Modal
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import PropTypes from 'prop-types'
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { confirm } = Modal
const { Title } = Typography
const { TextArea } = Input
const inputLayout = {
  wrapperCol: { span: 24 }
}

const GeneralPractitioners = ({ patient, dispatchPatient }) => {
  const [enableAddPractitioner, setEnableAddPractitioner] = useState(false)
  const [form] = Form.useForm()
  const onFinish = values => {
    dispatchPatient({
      type: 'UPDATE',
      updatedValues: {
        generalPractitioners: [...patient.generalPractitioners, {
          name: values.practitionerName,
          phone: values.practitionerPhone,
          specialization: values.specialization,
          observations: values.observations
        }]
      }
    })
    form.setFieldsValue({
      practitionerName: null,
      practitionerPhone: null,
      specialization: null,
      observations: null
    })
    setEnableAddPractitioner(false)
  }
  const removePractitioner = index => {
    const newGeneralPractitioners = [...patient.generalPractitioners]
    newGeneralPractitioners.splice(index, 1)
    dispatchPatient({
      type: 'UPDATE',
      updatedValues: {
        generalPractitioners: newGeneralPractitioners
      }
    })
  }
  const editPractitioner = (index) => {
    confirm({
      title: 'Edit patient',
      icon: <FontAwesomeIcon icon={faEdit} style={{ verticalAlign: '0', marginRight: '0.5rem', color: '#4190f7' }} />,
      content:
      <Form onFinish={onFinish} form={form} layout='vertical' onValuesChange={onValuesChange}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item {...inputLayout} name='practitionerName' label='Name'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...inputLayout} name='practitionerPhone' label='Phone' rules={[
              ({ getFieldValue }) => ({
                validator (rule, value) {
                  if (!value || isValidPhoneNumber(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Invalid phone number'))
                }
              })]}>
              <PhoneInput placeholder={formatPhoneNumberIntl('+593987654321')} defaultCountry='EC' className='telephone-input' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...inputLayout} name='specialization' label='Specialization'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item {...inputLayout} name='observations' label='Observations'>
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>,
      okText: 'Save',
      cancelText: 'Cancel',
      width: 800
    })
  }
  const onValuesChange = (changedValues, allValues) => {
    setEnableAddPractitioner(allValues.practitionerName && allValues.specialization)
  }
  patient.generalPractitioners = [{ name: 'Greg House', phone: '+593987654321', specialization: 'Neurologist', observations: 'Hey House' }]
  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Title level={4}>General practitioners</Title>
        </Col>
      </Row>
      <Form onFinish={onFinish} form={form} layout='vertical' onValuesChange={onValuesChange}>
        <Row gutter={16}>
          <Col offset={6} span={4}>
            <Form.Item {...inputLayout} name='practitionerName' label='Name'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item {...inputLayout} name='practitionerPhone' label='Phone' rules={[
              ({ getFieldValue }) => ({
                validator (rule, value) {
                  if (!value || isValidPhoneNumber(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Invalid phone number'))
                }
              })]}>
              <PhoneInput placeholder={formatPhoneNumberIntl('+593987654321')} defaultCountry='EC' className='telephone-input' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item {...inputLayout} name='specialization' label='Specialization'>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='observations' label='Observations'>
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Tooltip title='Add name and disease'>
              <Button disabled={!enableAddPractitioner} htmlType='submit' type='primary' style={{ marginBottom: 25 }}><PlusOutlined />Add</Button>
            </Tooltip>
          </Col>
        </Row>
      </Form>
      <Row gutter={[16, 16]}>
        <Space direction='vertical' style={{ width: '100%' }}>
          {patient.generalPractitioners.map((item, index) =>
            <Col span={12} offset={6} key={item}>
              <Card
                size='small'
                title={item.name}
                key={item}
                extra={
                  <Space>
                    <Button type='button' className='linkButton' onClick={() => editPractitioner(index)}>
                      <FontAwesomeIcon icon={faEdit} style={{ color: '#4190f7' }} />
                    </Button>
                    <Button type='button' className='linkButton' onClick={() => removePractitioner(index)}>
                      <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#d11a2a' }} />
                    </Button>
                  </Space>
                }
              >
                <p>Phone: {item.phone}</p>
                <p>Specialization: {item.specialization}</p>
                <p>Observations: {item.observations}</p>
              </Card>
            </Col>
          )}
        </Space>
      </Row>

    </>
  )
}

GeneralPractitioners.propTypes = {
  patient: PropTypes.object,
  dispatchPatient: PropTypes.func
}

export default GeneralPractitioners
