import React, { useCallback, useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

const WidgetsDropdown = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const [present, setPresent] = useState([])
  const [over, setOver] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const loadUserData = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/users', config)
    // console.log(data)
    setUser(data)
    setLoading(false)
    // console.log(data)
  }, [userInfoFromLocalStorage.token])

  const date = new Date()
  const loadCheckData = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/attendance/adcheckbyfilter', config)
    // console.log(data)
    const newDate = data.filter((data) => {
      // console.log(date.getDate())
      const dbdate = new Date(data.date).getDate()
      // console.log(dbdate)
      setLoading(false)
      return dbdate === date.getDate()
    })
    const checking = newDate.filter((data) => {
      const check = data.check.split(' ')[1]
      return check === 'In'
    })
    const checkOutOverTime = newDate.filter((data) => {
      const checkout = data.check.split(' ')[1]
      return checkout === 'Out'
    })
    const overTime = checkOutOverTime.filter((data) => {
      const dbtime = data.time.split(':')
      const dbMinute = dbtime[0] * 60 + Number(dbtime[1])
      let startTime = '18:00'
      startTime = startTime.split(':')[0] * 60 + Number(startTime.split(':')[1])
      let endTime = '22:00'
      endTime = endTime.split(':')[0] * 60 + Number(endTime.split(':')[1])
      return startTime <= dbMinute && dbMinute <= endTime
    })
    setOver(overTime)
    setPresent(checking)
  }, [userInfoFromLocalStorage.token])
  useEffect(() => {
    loadUserData()
    loadCheckData()
  }, [loadCheckData, loadUserData])

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <Link to="checking/userlist" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <div>
                <h2>User</h2>
                <h4>{loading ? 'loading...' : user.length - 1}</h4>
              </div>
            }
            title=""
          />
        </Link>
      </CCol>
      <CCol sm={6} lg={3}>
        <Link to="checking/filterUserTable" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={
              <>
                <div>
                  <h2>Present</h2>
                  <h4>{loading ? 'loading...' : present.length}</h4>
                </div>
              </>
            }
            title=""
          />
        </Link>
      </CCol>
      <CCol sm={6} lg={3}>
        <Link to="checking/filterUserTable" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={
              <>
                <div>
                  <h2>Absent</h2>
                  <h4>{loading ? 'loading...' : user.length - present.length - 1}</h4>
                </div>
              </>
            }
            title=""
          />
        </Link>
      </CCol>
      <CCol sm={6} lg={3}>
        <Link to="checking/filterUserTable" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={
              <>
                <div>
                  <h2>Over Time</h2>
                  <h4>{loading ? 'loading...' : over.length}</h4>
                </div>
              </>
            }
            title=""
          />
        </Link>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
