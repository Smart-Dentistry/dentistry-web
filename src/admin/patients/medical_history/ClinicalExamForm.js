import React from 'react'
import { Form, Row, Col, Input, Button, Typography, Checkbox, Select } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import i18n from '../../../i18n'

const { TextArea } = Input
const { Title } = Typography
const inputLayout = {
  wrapperCol: { span: 24 }
}
const brushingFrequencyOptions = [
  { value: 0, label: i18n.t('None') },
  { value: 1, label: i18n.t('1') },
  { value: 2, label: i18n.t('2') },
  { value: 3, label: i18n.t('3') },
  { value: 4, label: i18n.t('More') }
]

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
            <Title level={4}>{t('Extraoral & Intraoral Exams')}</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='extraoralExam' label={t('Extraoral Exam')}>
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Form.Item {...inputLayout} name='intraoralExam' label={t('Intraoral Exam')}>
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>{t('Periodontal Exam')}</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='dentalPlaque'>
              <Checkbox ><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Dental plaque')}</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='calculus'>
              <Checkbox ><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Calculus')}</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='bleeding'>
              <Checkbox ><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Bleeding')}</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='toothMobility'>
              <Checkbox ><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Tooth mobility')}</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={12}>
            <Title level={4}>{t('Non-pathological backgrond')}</Title>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='floss'>
              <Checkbox ><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Floss')}</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='mouthWash'>
              <Checkbox ><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Mouth wash')}</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='brushingFrequency' label={t('Brushing frequency (per day)')} rules={[{ required: true }]}>
              <Col span={6}>
                <Select options={brushingFrequencyOptions} />
              </Col>
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
