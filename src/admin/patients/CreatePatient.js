import React, { useState } from 'react'
import { Steps, Button, Row, Col } from 'antd'
import PersonalInformationForm from './PersonalInformationForm'
import ContactInformationForm from './ContactInformationForm'
import BackgroundForm from './BackgroundForm'

import './CreatePatient.sass'

const { Step } = Steps
const steps = [
  'Personal Information',
  'Contact Information',
  'Background Information'
]

const CreatePatient = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const next = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep(currentStep + 1)
  }

  const prev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep(currentStep - 1)
  }

  return (
    <>
      <Steps current={currentStep} style={{ marginBottom: '2rem' }}>
        {steps.map((step, index) => <Step key={index} title={step} />)}
      </Steps>
      {(() => {
        switch (currentStep) {
          case 0:
            return <PersonalInformationForm />
          case 1:
            return <ContactInformationForm />
          case 2:
            return <BackgroundForm />
          default:
            return 'Error!'
        }
      })()}
      <Row>
        <Col offset={6} span={6}>
          {currentStep === 0 ? null : (
            <Button type='primary' onClick={prev}>Previous</Button>
          )}
        </Col>
        <Col span={6}>
          <Row justify='end'>
            {currentStep >= 0 && currentStep < 2 ? (
              <Button type='primary' onClick={next}>Next</Button>
            ) : (
              <Button type='primary'>Create</Button>
            )}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default CreatePatient
