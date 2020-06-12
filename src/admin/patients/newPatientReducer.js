const newPatientReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.updatedValues }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default newPatientReducer
