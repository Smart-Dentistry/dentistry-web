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
const validateMessages = {
  // eslint-disable-next-line
  required: '${label} is required!'
}

const ClinicalExamForm = ({ prev, medHistory, dispatchMedHistory }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const clinicalExam = {
    extraoralExam: medHistory.clinicalExam.extraoralExam,
    intraoralExam: medHistory.clinicalExam.intraoralExam
  }

  const onFinish = values => {
    console.log(values)
  }

  const dentalPlaqueOnChange = e => {
    dispatchMedHistory({ type: 'UPDATE', updatedValues: { periodontalExam: { ...medHistory.periodontalExam, dentalPlaque: e.target.checked } } })
  }
  const calculusOnChange = e => {
    dispatchMedHistory({ type: 'UPDATE', updatedValues: { periodontalExam: { ...medHistory.periodontalExam, calculus: e.target.checked } } })
  }
  const bleedingOnChange = e => {
    dispatchMedHistory({ type: 'UPDATE', updatedValues: { periodontalExam: { ...medHistory.periodontalExam, bleeding: e.target.checked } } })
  }
  const toothMobilityOnChange = e => {
    dispatchMedHistory({ type: 'UPDATE', updatedValues: { periodontalExam: { ...medHistory.periodontalExam, toothMobility: e.target.checked } } })
  }
  const flossOnChange = e => {
    dispatchMedHistory({ type: 'UPDATE', updatedValues: { nonPathologicalBackground: { ...medHistory.nonPathologicalBackground, floss: e.target.checked } } })
  }
  const mouthwashOnChange = e => {
    dispatchMedHistory({ type: 'UPDATE', updatedValues: { nonPathologicalBackground: { ...medHistory.nonPathologicalBackground, mouthwash: e.target.checked } } })
  }

  return (
    <>
      <Form
        form={form}
        layout='vertical'
        name='clinicalExamForm'
        onFinish={onFinish}
        scrollToFirstError
        validateMessages={validateMessages}
        initialValues={clinicalExam}
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
              <Checkbox checked={medHistory.periodontalExam.dentalPlaque} onChange={dentalPlaqueOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Dental plaque')}</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='calculus'>
              <Checkbox checked={medHistory.periodontalExam.calculus} onChange={calculusOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Calculus')}</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='bleeding'>
              <Checkbox checked={medHistory.periodontalExam.bleeding} onChange={bleedingOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Bleeding')}</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='toothMobility'>
              <Checkbox checked={medHistory.periodontalExam.toothMobility} onChange={toothMobilityOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Tooth mobility')}</span></Checkbox>
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
              <Checkbox checked={medHistory.nonPathologicalBackground.floss} onChange={flossOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Floss')}</span></Checkbox>
            </Form.Item>
          </Col>
          <Col offset={2} span={5}>
            <Form.Item {...inputLayout} name='mouthwash'>
              <Checkbox checked={medHistory.nonPathologicalBackground.mouthwash} onChange={mouthwashOnChange}><span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{t('Mouth wash')}</span></Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={6} span={5}>
            <Form.Item {...inputLayout} name='brushingFrequency' label={t('Brushing frequency (per day)')} rules={[{ required: true }]}>
              <Select options={brushingFrequencyOptions} style={{ width: '30%' }} />
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
  medHistory: PropTypes.object,
  dispatchMedHistory: PropTypes.func
}

export default ClinicalExamForm
