import React, { useState } from 'react'
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
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import i18n from './i18n'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const { Title, Text } = Typography

const validateMessages = {
  // eslint-disable-next-line
  required: i18n.t('This field is required!'),
  types: {
    // eslint-disable-next-line
    email: i18n.t('It is not a valid email!'),
  }
}

const ResetPassword = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const [disableSend, setDisableSend] = useState(false)
  const onFinish = async values => {
    setDisableSend(true)
    const instance = axios.create()
    instance.interceptors.request.use(config => config)

    try {
      await axios.post('/password_reset/', values)
    } catch (error) {
      const data = error.response.data
      if (data.email) {
        message.error(data.email[0])
      } else {
        message.error(t('There was an error, please try again.'), 5)
      }
      setDisableSend(false)
      return
    }
    message.success(t('A message has been sent to your email to reset your password!'), 5)
    history.push('/login')
  }
  return (
    <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col span={4}>
        <Space style={{ textAlign: 'center', width: '100%', marginBottom: '15px' }} direction='vertical'>
          <FontAwesomeIcon icon={faTooth} style={{ fontSize: '4rem', color: 'black' }} />
          <Title level={3}>{t('Reset Password')}</Title>
        </Space>
        <Space direction='vertical'>
          <Text>{t('Enter your email address and we will send you a link to reset your password.')}</Text>
          <Form
            name='reset-password'
            className='login-form'
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Form.Item
              name='email'
              rules={[{ required: true }, { type: 'email' }]}
            >
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Button type='primary' htmlType='submit' className='login-form-button' disabled={disableSend}>
                <Space>
                  {disableSend ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
                  <span>{t('Send')}</span>
                </Space>
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Col>
    </Row>
  )
}

export default ResetPassword
