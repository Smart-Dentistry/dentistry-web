import React from 'react'
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Card,
  Typography
} from 'antd'
import { PlusOutlined, DeleteFilled } from '@ant-design/icons'
import PropTypes from 'prop-types'

const { Title } = Typography
const inputLayout = {
  wrapperCol: { span: 24 }
}

const GeneralPractitioners = ({ generalPractitioners, setGeneralPractitioners }) => {
  const addGeneralPractitioner = () => {
    // console.log(form.getFieldsValue())
    // setGeneralPractitioners(generalPractitioners.concat([{
    //   name: form.getFieldsValue().practitionerName,
    //   phone: form.getFieldsValue().practitionerPhone,
    //   disease: form.getFieldsValue().practitionerDisease
    // }]))
    // form.setFieldsValue({ practitionerName: null, practitionerPhone: null, practitionerDisease: null })
  }
  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Title level={4}>General practitioners</Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col offset={6} span={4}>
          <Form.Item {...inputLayout} name='practitionerName' label='Name'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item {...inputLayout} name='practitionerPhone' label='Phone'>
            <Input />
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
          <Button type='primary' style={{ marginBottom: 25 }} onClick={() => addGeneralPractitioner()}><PlusOutlined />Add</Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12} offset={6}>
          {generalPractitioners.map((item) =>
            <>
              <Card size='small' title={item.name} key={item} extra={<a href='#'><DeleteFilled style={{ color: 'rgba(229, 59, 50, 1)' }} /></a>}>
                <p>Phone: {item.phone}</p>
                <p>Disease: {item.disease}</p>
              </Card>
            </>
          )}
        </Col>
      </Row>

    </>
  )
}

GeneralPractitioners.propTypes = {
  generalPractitioners: PropTypes.array,
  setGeneralPractitioners: PropTypes.func
}

export default GeneralPractitioners
