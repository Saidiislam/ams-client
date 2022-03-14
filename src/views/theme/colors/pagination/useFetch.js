import axios from 'axios'
import { useState, useEffect } from 'react'
import paginate from './utils'
const url = 'http://localhost:5000/api/attendance/adchecktesting?limit=100000'

export const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const loadCheckData = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage && userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get(url, config)
    setData(paginate(data))
    setLoading(false)
  }
  useEffect(() => {
    loadCheckData()
  }, [])
  return { loading, data }
}
