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
    familyHistory: {
      diseases: []
    },
    personalHistory: {},
    generalPractitioners: []
  }
  return <MedHistorySteps initialMedHistory={medHistory} />
}

export default CreateMedHistory
