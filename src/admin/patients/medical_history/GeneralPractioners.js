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
  Space
} from 'antd'
import { PlusOutlined, DeleteFilled } from '@ant-design/icons'
import PropTypes from 'prop-types'
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'

const { Title } = Typography
const { TextArea } = Input
const inputLayout = {
  wrapperCol: { span: 24 }
}

const GeneralPractitioners = ({ medHistory, dispatchMedHistory }) => {
  const [enableAddPractitioner, setEnableAddPractitioner] = useState(false)
  const [form] = Form.useForm()
  const onFinish = values => {
    dispatchMedHistory({
      type: 'UPDATE',
      updatedValues: {
        generalPractitioners: [...medHistory.generalPractitioners, {
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
    const newGeneralPractitioners = [...medHistory.generalPractitioners]
    newGeneralPractitioners.splice(index, 1)
    dispatchMedHistory({
      type: 'UPDATE',
      updatedValues: {
        generalPractitioners: newGeneralPractitioners
      }
    })
  }
  const onValuesChange = (changedValues, allValues) => {
    setEnableAddPractitioner(allValues.practitionerName && allValues.specialization)
  }
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
          {medHistory.generalPractitioners.map((item, index) =>
            <Col span={12} offset={6} key={item}>
              <Card
                size='small'
                title={item.name}
                key={item}
                extra={
                  <Button type='button' className='linkButton' onClick={() => removePractitioner(index)}>
                    <DeleteFilled style={{ color: '#E53B32' }} />
                  </Button>
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
  medHistory: PropTypes.object,
  dispatchMedHistory: PropTypes.func
}

export default GeneralPractitioners
