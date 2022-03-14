import React, { useCallback, useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import axios from 'axios'
import { cilCheckAlt, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const PendingCheck = () => {
  const [checkData, setCheckData] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const loadCheckPendingData = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage && userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/pending/pendingadcheck', config)
    setCheckData(data)
    // console.log(data)
  }, [userInfoFromLocalStorage])
  useEffect(() => {
    loadCheckPendingData()
  }, [loadCheckPendingData])
  const pendingApprove = async (id) => {
    for (let i = 0; i < checkData.length; i++) {
      // const element = checkData[i]
      // console.log(element)
      const _id = checkData[i]._id
      const user = checkData[i].user
      const name = checkData[i].name
      const check = checkData[i].check
      const time = checkData[i].time
      const date = checkData[i].date
      const lati = checkData[i].lati
      const long = checkData[i].long
      const placedata = checkData[i].placedata
      const days = checkData[i].days
      if (_id === id) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfoFromLocalStorage && userInfoFromLocalStorage.token}`,
          },
        }
        const { data } = await axios.post(
          `http://localhost:5000/api/pending/pendingcheck`,
          { _id, user, name, check, time, date, lati, long, placedata, days },
          config,
        )
        console.log(data)
      }
    }
  }
  const deletecheckApprove = async (id) => {
    // console.log(id)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage && userInfoFromLocalStorage.token}`,
      },
    }
    await axios.delete(`http://localhost:5000/api/pending/pendingcheckdelete/${id}`, config)
    // console.log('delete')
  }
  return (
    <>
      <h1>Pending User Checking</h1>
      <br />
      <CTable color="secondary" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Checked</CTableHeaderCell>
            <CTableHeaderCell scope="col">Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">Place</CTableHeaderCell>
            <CTableHeaderCell scope="col">Approve/Delete</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
          {checkData.map((check) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow key={check._id}>
              <CTableDataCell>{check.user}</CTableDataCell>
              <CTableDataCell>{check.name}</CTableDataCell>
              <CTableDataCell>{check.check}</CTableDataCell>
              <CTableDataCell>{check.time}</CTableDataCell>
              <CTableDataCell>{check.date}</CTableDataCell>
              <CTableDataCell>
                {check.lati}/{check.long}
              </CTableDataCell>
              <CTableDataCell>{check.placedata}</CTableDataCell>
              <CTableDataCell>
                <button onClick={() => pendingApprove(check._id)}>
                  <CIcon icon={cilCheckAlt} className="me-2" style={{ color: 'green' }} />
                </button>
                <button onClick={() => deletecheckApprove(check._id)}>
                  <CIcon icon={cilTrash} className="me-2" style={{ color: 'red' }} />
                </button>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default PendingCheck
