import patientReducer from '../../patients/patientReducer'

const patients = [{ key: 1, firstName: 'John' }, { key: 2, firstName: 'Jeff' }]

describe('patientReducer', () => {
  let newState

  beforeEach(() => {
    newState = patientReducer([], { type: 'LOAD', patients })
  })

  it('loads patients', () => {
    expect(newState).toBe(patients)
  })

  it('adds new patient', () => {
    const patient = { key: 3, firstName: 'Peter' }
    newState = patientReducer(newState, { type: 'ADD', patient: patient })

    expect(newState).toHaveLength(3)
    expect(newState).toContain(patient)
  })

  it('raises exception', () => {
    expect(() => {
      newState = patientReducer(newState, { type: 'UNKNOWN' })
    }).toThrow(Error)
  })
})
