import React, { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import useAxios from 'axios-hooks'

import './App.css'

function App () {
  const [{ data, loading, error }] = useAxios(
    `${process.env.REACT_APP_API_URL}/users/`
  )
  const [users, setUsers] = useState([])

  useEffect(() => { if (data) setUsers(data) }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <>
      <h1>Dentistry Web UI</h1>
      <DatePicker />
      <ul>
        {users.map(user => <li key={user.id}>{user.username} - {user.email}</li>)}
      </ul>
    </>
  )
}

export default App
