import React from 'react'
import {
  Form,
  Button,
  Input,
  Row,
  Col,
  Typography,
  Space
} from 'antd'
import {
  faTooth
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Title, Text } = Typography

const ResetPassword = () => {
  const onFinish = async values => {
  }
  return (
    <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col span={4}>
        <Space style={{ textAlign: 'center', width: '100%', marginBottom: '15px' }} direction='vertical'>
          <FontAwesomeIcon icon={faTooth} style={{ fontSize: '4rem', color: 'black' }} />
          <Title level={3}>Reset Password</Title>
        </Space>
        <Space direction='vertical'>
          <Text>Enter your email address and we will send you a link to reset your password.</Text>
          <Form
            name='reset-password'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Send
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Col>
    </Row>
  )
}

export default ResetPassword
