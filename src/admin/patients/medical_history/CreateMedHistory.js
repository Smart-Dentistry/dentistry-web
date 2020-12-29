import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import MedHistorySteps from './MedHistorySteps'

const CreateMedHistory = () => {
  const history = useHistory()
  const location = useLocation()
  if (location.state === undefined) {
    history.push('/admin/patients')
    return <></>
  }
  const patient = location.state.patient
  console.log(patient.key)
  const medHistory = {
    appointmentReason: '',
    familyHistory: {
      diseases: [],
      observations: ''
    },
    personalHistory: {
      diseases: [],
      observations: ''
    },
    generalPractitioners: [],
    clinicalExam: {
      extraoralExam: '',
      intraoralExam: ''
    },
    periodontalExam: {
      dentalPlaque: false,
      calculus: false,
      bleeding: false,
      toothMobility: false
    },
    nonPathologicalBackground: {
      mouthwash: false,
      floss: false
    }
  }
  const processMedHistory = medHistory => {
    console.log(medHistory)
  }

  return <MedHistorySteps initialMedHistory={medHistory} processMedHistory={processMedHistory} />
}

export default CreateMedHistory
