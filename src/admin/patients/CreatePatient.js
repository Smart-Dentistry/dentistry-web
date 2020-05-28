import React from 'react'
import { Steps } from 'antd'
import PersonalInformationForm from './PersonalInformationForm'
import ContactInformationForm from './ContactInformationForm'
import BackgroundForm from './BackgroundForm'

import './CreatePatient.sass'

const { Step } = Steps

const CreatePatient = () => {
  // const [, createPatient] = useAxios(
  //   {
  //     url: `${process.env.REACT_APP_API_URL}/patients/`,
  //     method: 'post'
  //   },
  //   { manual: true }
  // )

  return (
    <>
      <Steps current={0} style={{ marginBottom: '2rem' }}>
        <Step title='Personal Information' />
        <Step title='Contact Information' />
        <Step title='Background Information' />
      </Steps>
      <PersonalInformationForm />
      <ContactInformationForm />
      <BackgroundForm />
    </>
  )
}

export default CreatePatient
