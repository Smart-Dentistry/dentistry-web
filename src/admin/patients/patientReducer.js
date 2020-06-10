const patientReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.patients
    case 'ADD':
      return [action.patient, ...state]
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default patientReducer
