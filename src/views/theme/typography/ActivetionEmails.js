import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const ActivetionEmails = () => {
  console.log(useParams())
  const { activetion_token } = useParams()
  const history = useHistory()
  useEffect(() => {
    if (activetion_token) {
      const emailActivetion = async () => {
        const { data } = await axios.post('http://localhost:5000/api/users/activetion', {
          activetion_token,
        })
        console.log(data)
        localStorage.setItem('userTime', JSON.stringify(data))
        if (data) {
          history.push('/dashboard')
        }
      }
      emailActivetion()
    }
  }, [activetion_token, history])
  return <></>
}

export default ActivetionEmails
