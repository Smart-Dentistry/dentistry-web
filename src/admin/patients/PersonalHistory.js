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

const PersonalHistory = ({ diseases, personalHistory, setPersonalHistory }) => {
  const [form] = Form.useForm()
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const onValuesChange = changedValues => {
    setPersonalHistory({ ...personalHistory, ...changedValues })
  }
  return (
    <>
      <Form
        form={form}
        layout='vertical'
        name='personalHistory'
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        initialValues={personalHistory}
      >
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>Personal history</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='diseases' label='Diseases'>
              <Select
                mode='multiple'
                style={{ width: '100%' }}
                placeholder='Please select'
                options={diseases}
                optionFilterProp='label'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='observations' label='Observations'>
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

PersonalHistory.propTypes = {
  diseases: PropTypes.array,
  personalHistory: PropTypes.object,
  setPersonalHistory: PropTypes.func
}

export default PersonalHistory
