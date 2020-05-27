import React from 'react'
import { Steps } from 'antd'
import PersonalInformationForm from './PersonalInformationForm'

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
      <Steps current={0}>
        <Step title='Personal Information' />
        <Step title='Contact Information' />
        <Step title='Background Information' />
      </Steps>
      <PersonalInformationForm />
    </>
  )
}

export default CreatePatient
