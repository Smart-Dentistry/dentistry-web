import React, { useState } from 'react'
import { Steps, message } from 'antd'
import { useHistory } from 'react-router-dom'
import useAxios from 'axios-hooks'
import PropTypes from 'prop-types'

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

const CreatePatient = ({ addPatient }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const history = useHistory()
  const [imageUrl, setImageUrl] = useState()
  const [receivePromos, setReceivePromos] = useState(true)
  const [whatsapp, setWhatsapp] = useState(false)
  const [showRepresentative, setShowRepresentative] = useState(false)
  const [personalInformation, setPersonalInformation] = useState({})
  const [contactInformation, setContactInformation] = useState({
    countryResidence: 'E',
    province: 'Azuay',
    canton: 'Cuenca'
  })
  const [familyHistory, setFamilyHistory] = useState([])
  const [familyHistoryObservations, setFamilyHistoryObservations] = useState('')
  const [personalHistory, setPersonalHistory] = useState({ diseases: [], observations: '' })
  const [generalPractitioners, setGeneralPractitioners] = useState([])
  const [, createNewPatient] = useAxios(
    {
      url: `${process.env.REACT_APP_API_URL}/patients/`,
      method: 'post'
    },
    { manual: true }
  )

  const next = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep(currentStep + 1)
  }

  const prev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep(currentStep - 1)
  }

  const createPatient = async () => {
    const data = {
      profilePictureUrl: imageUrl,
      ...personalInformation,
      birthdate: personalInformation.birthdate.format('YYYY-MM-DD'),
      receivePromos,
      whatsapp,
      healthInsuranceCompany: contactInformation.healthInsuranceCompany,
      email: contactInformation.email,
      countryOfResidence: contactInformation.countryResidence,
      address: contactInformation.addressLine,
      phone: contactInformation.phone,
      emergencyContact: {
        fullName: contactInformation.emergencyContactName,
        phone: contactInformation.emergencyContactPhone
      },
      representative: {
        fullName: contactInformation.representativeName,
        phone: contactInformation.representativePhone,
        relationship: contactInformation.representativeRelationship
      },
      familyHistory: {
        diseases: familyHistory,
        observations: familyHistoryObservations
      },
      personalHistory,
      generalPractitioners
    }
    let patient
    try {
      const response = await createNewPatient({ data })
      patient = response.data
    } catch (error) {
      message.error('There was an error, please try again.')
      console.log(error)
      console.log(error.reponse)
      return
    }
    addPatient(patient)
    message.success({ content: 'Patient was created sucessfully', duration: 3 })
    history.push('/admin/patients')
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
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                receivePromos={receivePromos}
                setReceivePromos={setReceivePromos}
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
                whatsapp={whatsapp}
                setWhatsapp={setWhatsapp}
                contactInformation={contactInformation}
                setContactInformation={setContactInformation}
                showRepresentative={showRepresentative}
                setShowRepresentative={setShowRepresentative}
              />
            )
          case 2:
            return (
              <BackgroundForm
                prev={prev}
                familyHistory={familyHistory}
                setFamilyHistory={setFamilyHistory}
                familyHistoryObservations={familyHistoryObservations}
                setFamilyHistoryObservations={setFamilyHistoryObservations}
                personalHistory={personalHistory}
                setPersonalHistory={setPersonalHistory}
                generalPractitioners={generalPractitioners}
                setGeneralPractitioners={setGeneralPractitioners}
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

CreatePatient.propTypes = {
  addPatient: PropTypes.func
}

export default CreatePatient
