import React, { useState, useEffect } from 'react'
import {
  Form,
  Row,
  Col,
  Select,
  Input,
  Checkbox,
  Typography,
  Button,
  Tag,
  Card
} from 'antd'
import { PlusOutlined, DeleteFilled } from '@ant-design/icons'
import PropTypes from 'prop-types'
import useAxios from 'axios-hooks'

const { Title } = Typography
const { TextArea } = Input
const inputLayout = {
  wrapperCol: { span: 24 }
}

const BackgroundForm = ({ prev }) => {
  const [form] = Form.useForm()
  const [diseases, setDiseases] = useState([])
  const [disableFamilyHistory] = useState(true)
  const [familyBackground] = useState(['Diabetes 👩🏼🧒🏽', 'Others 🧒🏽'])
  const [generalPractitioners, setGeneralPractitioners] = useState([])
  const [{ data: diseasesData }] = useAxios({
    url: `${process.env.REACT_APP_API_URL}/diseases/`
  })
  useEffect(() => {
    if (diseasesData) {
      setDiseases(diseasesData.sort((a, b) => a.label.localeCompare(b.label)))
    }
  }, [diseasesData])

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const onFinish = values => {
    console.log('Finished')
  }

  function handleChange (value) {
    console.log(`selected ${value}`)
  }

  function log (e) {
    console.log(e)
  }

  const onValuesChange = changedValues => {
    console.log(changedValues)
  }

  const addGeneralPractitioner = () => {
    console.log(form.getFieldsValue())
    setGeneralPractitioners(generalPractitioners.concat([{
      name: form.getFieldsValue().practitionerName,
      phone: form.getFieldsValue().practitionerPhone,
      disease: form.getFieldsValue().practitionerDisease
    }]))
    form.setFieldsValue({ practitionerName: null, practitionerPhone: null, practitionerDisease: null })
  }

  return (
    <>
      <Form
        form={form}
        layout='vertical'
        name='backgroundInformation'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>Family history</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='familyHistoryDisease' label=''>
              <Select options={diseases} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Form.Item {...inputLayout} name='mother' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Mother 👩🏼</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={0} span={4}>
            <Form.Item {...inputLayout} name='motherGrandma' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Grandma 👵🏻</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={0} span={4}>
            <Form.Item {...inputLayout} name='motherGrandpa' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Grandpa 👴🏻</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Form.Item {...inputLayout} name='father' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Father 👨🏿</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={0} span={4}>
            <Form.Item {...inputLayout} name='fatherGrandma' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Grandma 👵🏿</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={0} span={4}>
            <Form.Item {...inputLayout} name='fatherGrandpa' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Grandpa 👴🏿</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Form.Item {...inputLayout} name='siblings' label=''>
              <Checkbox><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Siblings 🧒🏽</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={3}>
            <Button disabled={disableFamilyHistory} type='primary' style={{ marginBottom: 15 }}><PlusOutlined />Add</Button>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            {familyBackground.map((item, key) => <Tag closable onClose={log} key={item}>{item}</Tag>)}
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='familyHistoryObservations' label='Observations'>
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>Personal history</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='personalHistory' label=''>
              <Select
                mode='multiple'
                style={{ width: '100%' }}
                placeholder='Please select'
                onChange={handleChange}
                options={diseases}
                filterOption={(inputValue, option) => option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='personalHistoryObservations' label='Observations'>
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
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
                <Card size="small" title={item.name} key={item} extra={<a href="#"><DeleteFilled style={{ color: 'rgba(229, 59, 50, 1)' }}/></a>}>
                  <p>Phone: {item.phone}</p>
                  <p>Disease: {item.disease}</p>
                </Card>
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={6}>
            <Button type='primary' onClick={prev}>Previous</Button>
          </Col>
          <Col span={6}>
            <Row justify='end'>
              <Button type='primary' htmlType='submit'>Create</Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

BackgroundForm.propTypes = {
  prev: PropTypes.func
}

export default BackgroundForm
