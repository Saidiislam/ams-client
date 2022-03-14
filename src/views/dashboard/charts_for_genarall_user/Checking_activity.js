import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

const Checking_activity = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const [present, setPresent] = useState([])
  const [over, setOver] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const date = new Date()
  const loadCheckData = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/attendance/check', config)
    // console.log(data)
    const reverseData = data.reverse()
    const checking = reverseData.filter((data) => {
      const check = data.check.split(' ')[1]
      return check === 'In'
    })
    // console.log(checking)
    const topActivePerson = checking.slice(0, 10)
    setPresent(topActivePerson)
  }, [userInfoFromLocalStorage.token])
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  return (
    <div>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>My Checking {' & '} Activity</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'center' }}>Day</CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: 'center' }}>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {present.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        <div>{item.days}</div>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        <div className="small text-medium-emphasis">Login</div>
                        <strong>{item.time}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Checking_activity
