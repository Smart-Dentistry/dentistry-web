import React, { useState } from 'react'
import { Steps } from 'antd'
import i18n from '../../../i18n'

const { Step } = Steps
const steps = [
  i18n.t('Medical Information'),
  i18n.t('Clinical Exam')
]

const MedHistorySteps = () => {
  const x = false
  const [currentStep, setCurrentStep] = useState(0)
  const next = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep(currentStep + 1)
  }
  const prev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep(currentStep - 1)
  }

  if (x) {
    next()
    prev()
  }

  return (
    <>
      <Steps current={currentStep} style={{ marginBottom: '2rem', padding: '0 18rem' }}>
        {steps.map((step, index) => <Step key={index} title={step} />)}
      </Steps>
    </>
  )
}

export default MedHistorySteps
