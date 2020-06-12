const patientReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.patients
    case 'ADD':
      return [action.patient, ...state]
    case 'REMOVE':
      return state.filter(patient => patient.key !== action.key)
    case 'UPDATE': {
      const newState = [...state]
      newState[action.index] = action.patient
      return newState
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default patientReducer
