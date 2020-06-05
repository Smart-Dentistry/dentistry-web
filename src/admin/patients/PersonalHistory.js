import React from 'react'
import {
  Form,
  Row,
  Col,
  Select,
  Input,
  Typography
} from 'antd'
import PropTypes from 'prop-types'

const { Title } = Typography
const { TextArea } = Input
const inputLayout = {
  wrapperCol: { span: 24 }
}

const PersonalHistory = ({ diseases }) => {
  const [form] = Form.useForm()
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
    </>
  )
}

PersonalHistory.propTypes = {
  diseases: PropTypes.array
}

export default PersonalHistory
