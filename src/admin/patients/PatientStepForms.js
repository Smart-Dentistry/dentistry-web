import React, { useState, useReducer } from 'react'
import { Steps } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import i18n from './i18n'

import PersonalInformationForm from './PersonalInformationForm'
import ContactInformationForm from './ContactInformationForm'

const { Step } = Steps
const steps = [
  i18n.t('Personal Information'),
  i18n.t('Contact Information')
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.updatedValues }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const PatientStepForm = ({ initialPatient, processPatient }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [patient, dispatchPatient] = useReducer(reducer, initialPatient)
  const [image, setImage] = useState(initialPatient.profilePictureUrl)
  const [showRepresentative, setShowRepresentative] = useState(!_.isEmpty(initialPatient.representative))
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
      {(() => {
        switch (currentStep) {
          case 0:
            return (
              <PersonalInformationForm
                next={next}
                image={image}
                setImage={setImage}
                patient={patient}
                dispatchPatient={dispatchPatient}
                setShowRepresentative={setShowRepresentative}
              />
            )
          case 1:
            return (
              <ContactInformationForm
                prev={prev}
                patient={patient}
                dispatchPatient={dispatchPatient}
                showRepresentative={showRepresentative}
                setShowRepresentative={setShowRepresentative}
                processPatient={processPatient}
              />
            )
          default:
            return 'Error!'
        }
      })()}
    </>
  )
}

PatientStepForm.propTypes = {
  initialPatient: PropTypes.object,
  dispatchPatient: PropTypes.func,
  processPatient: PropTypes.func
}

export default PatientStepForm
