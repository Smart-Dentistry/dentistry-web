import React, { useState, useReducer } from 'react'
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
const newPatientReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.updatedValues }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const CreatePatient = ({ addPatient }) => {
  const history = useHistory()
  const [currentStep, setCurrentStep] = useState(0)
  const [image, setImage] = useState()
  const [showRepresentative, setShowRepresentative] = useState(false)
  const [newPatient, dispatchNewPatient] = useReducer(
    newPatientReducer,
    {
      receivePromos: true,
      whatsapp: false,
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
      ...newPatient,
      birthdate: newPatient.birthdate.format('YYYY-MM-DD'),
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
