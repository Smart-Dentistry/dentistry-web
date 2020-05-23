import React, { useState } from 'react'
import {
  Steps,
  Form,
  Input,
  Button,
  Upload,
  message,
  Row,
  Col,
  Select,
  DatePicker,
  Checkbox
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import './CreatePatient.sass'

const { Step } = Steps
const { Option } = Select

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

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const CreatePatient = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const onFinish = values => {
    console.log(values)
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    <>
      <Steps current={0}>
        <Step title="Title to decide" description="This is a description." />
        <Step title="Another title to decide" description="This is a description." />
      </Steps>
      <Form layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Row justify="center">
          <Col>
            <Form.Item name='profilePicture' label="Photo">
              <Upload
                name="profilePicture"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='firstName' label="First Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='middleName' label="Middle Name">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='lastName' label="Last Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='secondLastName' label="Second Last Name">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='idDocumentNumber' label="ID" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='sex' label="Sex" rules={[{ required: true }]}>
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='jobTitle' label="Job Title">
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='maritalStatus' label="Marital Status" rules={[{ required: true }]}>
              <Select>
                <Option value="SI">Single</Option>
                <Option value="MA">Married</Option>
                <Option value="DI">Divorced</Option>
                <Option value="WI">Widowed</Option>
                <Option value="DP">Domestic Partnership</Option>
                <Option value="NS">Not Specified</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='birthdate' label="Birthdate" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='countryOfResidence' label="Country of Residence" rules={[{ required: true }]}>
              <Select defaultValue="E">
                <Option value="E">Ecuador</Option>
                <Option value="A">Abroad</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='address' label="Address">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='province' label="Province" rules={[{ required: true }]}>
              <Select defaultValue="0">
                <Option value="0">Azuay</Option>
                <Option value="1">Cañar</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='city' label="City" rules={[{ required: true }]}>
              <Select defaultValue="0">
                <Option value="0">Cuenca</Option>
                <Option value="1">Sigsig</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='phone' label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='whatsapp' label='WhatsApp'>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>WhatsApp</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='healthInsuranceCompany' label="Health Insurance Company">
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='email' label="Email" rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='receivePromos' label="Receive Promos" rules={[{ required: true }]}>
              <Select defaultValue="0">
                <Option value="0">Yes</Option>
                <Option value="1">No</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='referralSource' label="Referral Source" rules={[{ required: true }]}>
              <Select>
                <Option value="P">Personal Reference</Option>
                <Option value="S">Social Media</Option>
                <Option value="O">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} />
          <Col span={6}>
            <Row justify="end">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default CreatePatient
