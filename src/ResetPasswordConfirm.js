import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {
  Form,
  Button,
  Input,
  Row,
  Col,
  Typography,
  Space,
  message
} from 'antd'
import { faTooth, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LockOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Text } = Typography

const ResetPasswordConfirm = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const { token } = useParams()
  const [disableAccept, setDisableAccept] = useState(false)
  const onFinish = async values => {
    setDisableAccept(true)
    const instance = axios.create()
    instance.interceptors.request.use(config => config)

    try {
      await axios.post('/password_reset/confirm/', { password: values.password, token })
    } catch (error) {
      const data = error.response.data
      if (data.password) {
        message.error(data.password[0])
      } else {
        message.error('There was an error, please try again.', 5)
      }
      setDisableAccept(false)
      return
    }
    message.success('Your password has been reset successfully!')
    history.push('/login')
  }
  const validatePassword = (rule, value, callback) => {
    const password = form.getFieldsValue().password
    if (value && value !== password) {
      // eslint-disable-next-line
      callback('passwords should match')
    } else {
      callback()
    }
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
            form={form}
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
              rules={[{ required: true, message: 'Plase confirm your Password!' }, { validator: validatePassword }]}
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
                <Button type='primary' htmlType='submit' className='login-form-button' disabled={disableAccept}>
                  <Space>
                    {disableAccept ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
                    <span>Accept</span>
                  </Space>
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
