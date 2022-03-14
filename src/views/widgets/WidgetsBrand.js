import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CWidgetStatsD,
  CRow,
  CCol,
  CWidgetStatsA,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibLinkedin, cibTwitter, cilCalendar, cilOptions } from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'
import axios from 'axios'
import { Link } from 'react-router-dom'

const WidgetsBrand = () => {
  const [loading, setLoading] = useState(true)
  const [officeChecking, setOfficeChecking] = useState([])
  const [outOfficeChecking, setOutOfficeChecking] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }

  const officeLocation = [23.87007, 90.39878]
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
    const checkingOfficePlace = checking.filter((data) => {
      const latitute = data.lati
      const longtitute = data.long
      const officeLait = officeLocation[0]
      const officelong = officeLocation[1]
      return (latitute === officeLait) & (longtitute === officelong)
    })
    // console.log(checkingOfficePlace)
    const checkingOutOfficePlace = checking.filter((data) => {
      const latitute = data.lati
      const longtitute = data.long
      const officeLait = officeLocation[0]
      const officelong = officeLocation[1]
      return (latitute !== officeLait) & (longtitute !== officelong)
    })
    // console.log(checkingOutOfficePlace)
    setOfficeChecking(checkingOfficePlace)
    setOutOfficeChecking(checkingOutOfficePlace)
  }, [userInfoFromLocalStorage.token])
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  return (
    <CRow>
      <CCol sm={6} lg={6}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <div>
              <h2>Checked In Office</h2>
              <h4>{loading ? 'loading...' : officeChecking.length}</h4>
            </div>
          }
          title=""
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <Link to="checking/userlist" style={{ textDecoration: 'none' }}>
                  <CDropdownItem>See</CDropdownItem>
                </Link>
              </CDropdownMenu>
            </CDropdown>
          }
        />
      </CCol>

      <CCol sm={6} lg={6}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              <div>
                <h2>Checked In Other Place</h2>
                <h4>{loading ? 'loading...' : outOfficeChecking.length}</h4>
              </div>
            </>
          }
          title=""
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <Link to="checking/filterUserTable" style={{ textDecoration: 'none' }}>
                  <CDropdownItem>See Other</CDropdownItem>
                </Link>
              </CDropdownMenu>
            </CDropdown>
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsBrand
