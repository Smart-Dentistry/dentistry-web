import React, { useState } from 'react'
import { Steps } from 'antd'
import PropTypes from 'prop-types'

import PersonalInformationForm from './PersonalInformationForm'
import ContactInformationForm from './ContactInformationForm'
import BackgroundForm from './BackgroundForm'

const { Step } = Steps
const steps = [
  'Personal Information',
  'Contact Information',
  'Background Information'
]

const PatientStepForm = ({ image, setImage, newPatient, dispatchNewPatient, createPatient }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showRepresentative, setShowRepresentative] = useState(false)
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
                newPatient={newPatient}
                dispatchNewPatient={dispatchNewPatient}
                showRepresentative={showRepresentative}
                setShowRepresentative={setShowRepresentative}
              />
            )
          case 1:
            return (
              <ContactInformationForm
                prev={prev}
                next={next}
                newPatient={newPatient}
                dispatchNewPatient={dispatchNewPatient}
                showRepresentative={showRepresentative}
                setShowRepresentative={setShowRepresentative}
              />
            )
          case 2:
            return (
              <BackgroundForm
                prev={prev}
                newPatient={newPatient}
                dispatchNewPatient={dispatchNewPatient}
                createPatient={createPatient}
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
  image: PropTypes.string,
  setImage: PropTypes.func,
  newPatient: PropTypes.object,
  dispatchNewPatient: PropTypes.func,
  createPatient: PropTypes.func
}

export default PatientStepForm
