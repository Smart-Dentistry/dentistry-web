import React from 'react'
import {
  Form,
  Row,
  Col,
  Select,
  Input,
  Checkbox,
  Typography,
  Switch
} from 'antd'

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
  },
  number: {
    // eslint-disable-next-line
    range: '${label} must be between ${min} and ${max}'
  }
}

const ContactInformationForm = () => {
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = values => {
    console.log('Finished')
  }

  return (
    <>
      <Form
        layout='vertical'
        name='nest-messages'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
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
              <Select>
                <Option value='A'>Azuay</Option>
                <Option value='C'>Cañar</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='canton' label='Canton' rules={[{ required: true }]}>
              <Select>
                <Option value='A'>Cuenca</Option>
                <Option value='C'>Canton 2</Option>
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
            <Form.Item {...inputLayout} name='email' label='Email'>
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
      </Form>
    </>
  )
}

export default ContactInformationForm
