import React from 'react'
import { Form, Row, Col, Input, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const { TextArea } = Input
const inputLayout = {
  wrapperCol: { span: 24 }
}

const ClinicalExamForm = ({ prev, medHistory }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const onFinish = values => {
    console.log(values)
  }

  return (
    <>
      <Form
        form={form}
        layout='vertical'
        name='contactInformation'
        onFinish={onFinish}
        scrollToFirstError
        initialValues={medHistory}
      >
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='extraoralExam' label={t('Extraoral Exam')}>
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='intraoralExam' label={t('Intraoral Exam')}>
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={6}>
            <Button type='primary' onClick={prev}><FontAwesomeIcon icon={faChevronLeft} /></Button>
          </Col>
          <Col span={6}>
            <Row justify='end'>
              <Button type='primary' htmlType='submit'>
                <FontAwesomeIcon icon={faSave} />
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

ClinicalExamForm.propTypes = {
  prev: PropTypes.func,
  medHistory: PropTypes.object
}

export default ClinicalExamForm
