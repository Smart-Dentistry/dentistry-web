import React from 'react'
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
import PhoneInput from 'react-phone-number-input'

const { Title } = Typography
const inputLayout = {
  wrapperCol: { span: 24 }
}

const GeneralPractitioners = ({ generalPractitioners, setGeneralPractitioners }) => {
  const [form] = Form.useForm()
  const onFinish = values => {
    console.log(values)
    setGeneralPractitioners([...generalPractitioners, {
      name: values.practitionerName,
      phone: values.practitionerPhone,
      disease: values.practitionerDisease
    }])
    form.setFieldsValue({ practitionerName: null, practitionerPhone: null, practitionerDisease: null })
  }
  const removePractitioner = item => {
    console.log(item)
  }
  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Title level={4}>General practitioners</Title>
        </Col>
      </Row>
      <Form onFinish={onFinish} form={form} layout='vertical'>
        <Row gutter={16}>
          <Col offset={6} span={4}>
            <Form.Item {...inputLayout} name='practitionerName' label='Name'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item {...inputLayout} name='practitionerPhone' label='Phone'>
              <PhoneInput className='telephone-input' />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item {...inputLayout} name='practitionerDisease' label='Disease'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Tooltip title="Add name and disease">
              <Button htmlType="submit" type='primary' style={{ marginBottom: 25 }}><PlusOutlined />Add</Button>
            </Tooltip>
          </Col>
        </Row>
      </Form>
      <Row gutter={[16, 16]}>
        <Space direction='vertical' style={{ width: '100%' }}>
          {generalPractitioners.map((item) =>
            <Col span={12} offset={6} key={item}>
              <Card
                size='small'
                title={item.name}
                key={item}
                extra={
                  <Button type='button' className='linkButton' onClick={() => removePractitioner(item)}>
                    <DeleteFilled style={{ color: '#E53B32' }}/>
                  </Button>}>
                <p>Phone: {item.phone}</p>
                <p>Disease: {item.disease}</p>
              </Card>
            </Col>
          )}
        </Space>
      </Row>

    </>
  )
}

GeneralPractitioners.propTypes = {
  generalPractitioners: PropTypes.array,
  setGeneralPractitioners: PropTypes.func
}

export default GeneralPractitioners
