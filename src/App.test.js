import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('display page header', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Dentistry Web UI/i)
  expect(linkElement).toBeInTheDocument()
})
