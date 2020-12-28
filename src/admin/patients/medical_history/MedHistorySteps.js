import React, { useState, useReducer } from 'react'
import { Steps } from 'antd'
import PropTypes from 'prop-types'
import i18n from '../../../i18n'
import BackgroundForm from './BackgroundForm'
import ClinicalExamForm from './ClinicalExamForm'

const { Step } = Steps
const steps = [
  i18n.t('Medical Information'),
  i18n.t('Clinical Exam')
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.updatedValues }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const MedHistorySteps = ({ initialMedHistory }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [medHistory, dispatchMedHistory] = useReducer(reducer, initialMedHistory)
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
      <Steps current={currentStep} style={{ marginBottom: '2rem', padding: '0 18rem' }}>
        {steps.map((step, index) => <Step key={index} title={step} />)}
      </Steps>
      { (() => {
        switch (currentStep) {
          case 0:
            return (
              <BackgroundForm
                next={next}
                medHistory={medHistory}
                dispatchMedHistory={dispatchMedHistory}
              />
            )
          case 1:
            return <ClinicalExamForm prev={prev} medHistory={medHistory}/>
          default:
            return 'Error!'
        }
      })()}
    </>
  )
}

MedHistorySteps.propTypes = {
  initialMedHistory: PropTypes.object
}

export default MedHistorySteps
