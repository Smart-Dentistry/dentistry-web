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
import { LockOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const ResetPasswordConfirm = () => {
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
          <Text>Please enter your new password.</Text>
          <Form
            name='reset-password'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name='password'
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item
              name='confirmPassword'
              rules={[{ required: true, message: 'Plase confirm your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Confirm password'
              />
            </Form.Item>
            <Space direction='vertical'>
              <Text>Password should be at least 8 characters long.</Text>
              <Form.Item style={{ float: 'right' }}>
                <Button type='primary' htmlType='submit' className='login-form-button'>
                  Send
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Space>
      </Col>
    </Row>
  )
}

export default ResetPasswordConfirm
