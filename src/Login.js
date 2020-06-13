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
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {
  faTooth
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Title } = Typography

const Login = () => {
  const onFinish = values => { }
  return (
    <Row type='flex' justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col span={4} >
        <Space style={{ textAlign: 'center', width: '100%', marginBottom: '15px' }} direction='vertical'>
          <FontAwesomeIcon icon={faTooth} style={{ fontSize: '4rem', color: 'black' }}/>
          <Title level={3} >Login</Title>
        </Space>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login