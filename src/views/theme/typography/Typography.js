import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import axios from 'axios'

const Typography = () => {
  const [checkData, setCheckData] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadCheckData = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage ? userInfoFromLocalStorage.token : null}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/attendance/check', config)
    setCheckData(data)
    // console.log(data)
  }
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  return (
    <>
      <CTable color="success" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Checked</CTableHeaderCell>
            <CTableHeaderCell scope="col">Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {checkData.map((check) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow key={check._id}>
              <CTableDataCell>{check._id}</CTableDataCell>
              <CTableDataCell>{check.name}</CTableDataCell>
              <CTableDataCell>{check.check}</CTableDataCell>
              <CTableDataCell>{check.time}</CTableDataCell>
              <CTableDataCell>{check.date}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Typography
