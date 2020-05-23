import React from 'react'
import { Steps } from 'antd'

const { Step } = Steps

const CreatePatient = () => {
  return (
    <Steps current={0}>
      <Step title="Title to decide" description="This is a description." />
      <Step title="Another title to decide" description="This is a description." />
    </Steps>
  )
}

export default CreatePatient
