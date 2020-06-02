import React, { useState } from 'react'
import { Steps } from 'antd'
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
  const [showRepresentative, setShowRepresentative] = useState(false)
  const [personalInformation, setPersonalInformation] = useState({})
  const [contactInformation, setContactInformation] = useState({
    countryResidence: 'E'
  })
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
                personalInformation={personalInformation}
                setPersonalInformation={setPersonalInformation}
                showRepresentative={showRepresentative}
                setShowRepresentative={setShowRepresentative}
              />
            )
          case 1:
            return (
              <ContactInformationForm
                prev={prev}
                next={next}
                contactInformation={contactInformation}
                setContactInformation={setContactInformation}
                showRepresentative={showRepresentative}
                setShowRepresentative={setShowRepresentative}
              />
            )
          case 2:
            return <BackgroundForm prev={prev} />
          default:
            return 'Error!'
        }
      })()}
    </>
  )
}

export default CreatePatient
