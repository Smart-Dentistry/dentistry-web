import React from 'react'
import { message } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
import useAxios from 'axios-hooks'
import MedHistorySteps from './MedHistorySteps'

const CreateMedHistory = () => {
  const history = useHistory()
  const location = useLocation()
  if (location.state === undefined) {
    history.push('/admin/patients')
    return <></>
  }
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
  const patient = location.state.patient

  const [, createNewMedHistory] = useAxios({ url: `/patients/${patient.key}/create_med_history/`, method: 'post' }, { manual: true })

  const createMedHistory = async newMedHistory => {
    try {
      await createNewMedHistory({ data: newMedHistory })
    } catch (error) {
      message.error('There was an error, please try again.')
      return
    }
    message.success({ content: 'Medical history was created sucessfully', duration: 3 })
    history.push({
      pathname: `/admin/patients/${patient.key}/details`,
      state: { patient }
    })
  }

  return <MedHistorySteps initialMedHistory={medHistory} processMedHistory={createMedHistory} />
}

export default CreateMedHistory
