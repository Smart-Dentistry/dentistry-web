import patientReducer from './patientReducer'

const patients = [{ key: 1, firstName: 'John' }, { key: 2, firstName: 'Jeff' }]

describe('patientReducer', () => {
  let state

  beforeEach(() => {
    state = patientReducer([], { type: 'LOAD', patients })
  })

  it('loads patients', () => {
    expect(state).toBe(patients)
  })

  it('adds new patient', () => {
    const patient = { key: 3, firstName: 'Peter' }
    state = patientReducer(state, { type: 'ADD', patient: patient })

    expect(state).toHaveLength(3)
    expect(state).toContain(patient)
  })

  it('removes a patient', () => {
    const patient = patients[0]
    state = patientReducer(state, {type: 'REMOVE', key: patient.key})
    
    expect(state).toHaveLength(1)
    expect(state).not.toContain(patient)
  })

  it('raises exception', () => {
    expect(() => {
      state = patientReducer(state, { })
    }).toThrow(Error)
  })
})
