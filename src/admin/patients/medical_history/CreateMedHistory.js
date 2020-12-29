import React from 'react'
import { message } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
import useAxios from 'axios-hooks'
import MedHistorySteps from './MedHistorySteps'
import PropTypes from 'prop-types'

const CreateMedHistory = ({ updatePatient }) => {
  const history = useHistory()
  const location = useLocation()
  if (location.state === undefined) {
    history.push('/admin/patients')
    return <></>
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    updatePatient({ ...patient, hasMedicalHistory: true }, 0)
    message.success({ content: 'Medical history was created sucessfully', duration: 3 })
    history.push({
      pathname: `/admin/patients/${patient.key}/details`,
      state: { patient: { ...patient, hasMedicalHistory: true } }
    })
  }

  return <MedHistorySteps initialMedHistory={medHistory} processMedHistory={createMedHistory} />
}

CreateMedHistory.propTypes = {
  updatePatient: PropTypes.func
}

export default CreateMedHistory
