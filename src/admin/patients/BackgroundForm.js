import React, { useState, useEffect } from 'react'
import {
  Form,
  Row,
  Col,
  Select,
  Input,
  Typography,
  Button
} from 'antd'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'

import FamilyHistory from './FamilyHistory'
import GeneralPractioners from './GeneralPractioners'

const { Title } = Typography
const { TextArea } = Input
const inputLayout = {
  wrapperCol: { span: 24 }
}

const BackgroundForm = ({ prev, background, setBackground }) => {
  const [diseases, setDiseases] = useState([])
  const [form] = Form.useForm()
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

  const onValuesChange = changedValues => {
    console.log(changedValues)
  }

  return (
    <>
      <FamilyHistory diseases={diseases} />
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
            <Title level={4}>Personal history</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='personalHistory' label='Diseases'>
              <Select
                mode='multiple'
                style={{ width: '100%' }}
                placeholder='Please select'
                onChange={handleChange}
                options={diseases}
                optionFilterProp='label'
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
      </Form>
      <GeneralPractioners generalPractitioners={generalPractitioners} setGeneralPractitioners={setGeneralPractitioners} />
      <Row>
        <Col offset={6} span={6}>
          <Button type='primary' onClick={prev}>Previous</Button>
        </Col>
        <Col span={6}>
          <Row justify='end'>
            <Button type='primary'>Create</Button>
          </Row>
        </Col>
      </Row>
    </>
  )
}

BackgroundForm.propTypes = {
  prev: PropTypes.func,
  background: PropTypes.object,
  setBackground: PropTypes.func
}

export default BackgroundForm
