import React, { useState } from 'react'
import { Steps, Form, Input, InputNumber, Button, Upload, message, Row, Col } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const { Step } = Steps

const inputLayout = {
  wrapperCol: { span: 20 }
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
        <Form.Item name='profilePicture' label="Photo" rules={[{ required: true }]}>
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
        <Row>
          <Col offset={6} span={6}>
            <Form.Item {...inputLayout} name='firstName' label="First Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...inputLayout} name='middleName' label="Middle Name">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name='age' label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name='website' label="Website">
          <Input />
        </Form.Item>
        <Form.Item name='introduction' label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreatePatient
