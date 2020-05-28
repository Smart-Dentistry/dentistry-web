import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Upload,
  Row,
  Col,
  Select,
  DatePicker,
  Checkbox,
  message
} from 'antd'
import axios from 'axios'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

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

const PersonalInformationForm = () => {
  const [loadingImage, setLoadingImage] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const uploadImage = async options => {
    const { onSuccess, onError, file } = options
    const contentType = file.type
    const config = {
      params: {
        Key: file.name,
        ContentType: contentType
      },
      headers: {
        'Content-Type': contentType
      }
    }
    let response
    try {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/get-presigned-url/`,
        config
      )
      onSuccess('Ok')
    } catch (err) {
      onError({ err })
      return
    }
    const { data } = response
    const form = new FormData()
    for (const [key, value] of Object.entries(data.fields)) {
      form.append(key, value)
    }
    form.append('file', file)
    try {
      await axios.post(data.url, form)
    } catch (err) {
      console.log(err.response)
    }
    message.success('Profile image was uploaded successfully!')
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl)
        setLoadingImage(false)
      })
    }
  }

  const uploadButton = (
    <div>
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='ant-upload-text'>Upload Photo</div>
    </div>
  )

  const onFinish = values => {
    const birthdate = values.birthdate.format('YYYY-MM-DD')
    const patient = {
      firstName: values.firstName,
      lastName: values.lastName,
      idDocumentNumber: values.idDocumentNumber,
      sex: values.sex,
      jobTitle: values.jobTitle,
      maritalStatus: values.maritalStatus,
      birthdate,
      phone: values.phone,
      whatsapp: values.whatsapp,
      healthInsuranceCompany: values.healthInsuranceCompany,
      email: values.email,
      receivePromos: values.receivePromos,
      referralSource: values.referralSource
    }
    console.log(patient)
  }
  return (
    <>
      <Row justify='center'>
        <Col>
          <Upload
            name='profilePicture'
            listType='picture-card'
            showUploadList={false}
            customRequest={uploadImage}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Col>
      </Row>
      <Form
        layout='vertical'
        name='nest-messages'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='firstName' label='First Name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='middleName' label='Middle Name'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='lastName' label='Last Name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='secondLastName' label='Second Last Name'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='idDocumentNumber' label='ID' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='sex' label='Sex' rules={[{ required: true }]}>
              <Select>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='jobTitle' label='Job Title'>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='maritalStatus' label='Marital Status' rules={[{ required: true }]}>
              <Select>
                <Option value='SI'>Single</Option>
                <Option value='MA'>Married</Option>
                <Option value='DI'>Divorced</Option>
                <Option value='WI'>Widowed</Option>
                <Option value='DP'>Domestic Partnership</Option>
                <Option value='NS'>Not Specified</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='birthdate' label='Birthdate' rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='referralSource' label='Referral Source' rules={[{ required: true }]}>
              <Select>
                <Option value='P'>Personal Reference</Option>
                <Option value='S'>Social Media</Option>
                <Option value='O'>Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='whatsapp' label='Receive Promos'>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Receive Promos</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} />
          <Col span={6}>
            <Row justify='end'>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
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

export default PersonalInformationForm
