import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import App from './App'

test('display page header', () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  )
  const linkElement = getByText(/Loading.../i)
  expect(linkElement).toBeInTheDocument()
})
