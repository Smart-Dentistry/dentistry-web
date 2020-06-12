import React, { useState, useReducer } from 'react'
import { Steps } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'

import PersonalInformationForm from './PersonalInformationForm'
import ContactInformationForm from './ContactInformationForm'
import BackgroundForm from './BackgroundForm'

const { Step } = Steps
const steps = [
  'Personal Information',
  'Contact Information',
  'Background Information'
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
      <Steps current={currentStep} style={{ marginBottom: '2rem' }}>
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
                showRepresentative={showRepresentative}
                setShowRepresentative={setShowRepresentative}
              />
            )
          case 1:
            return (
              <ContactInformationForm
                prev={prev}
                next={next}
                patient={patient}
                dispatchPatient={dispatchPatient}
                showRepresentative={showRepresentative}
                setShowRepresentative={setShowRepresentative}
              />
            )
          case 2:
            return (
              <BackgroundForm
                prev={prev}
                patient={patient}
                dispatchPatient={dispatchPatient}
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
