import React, { lazy, useCallback, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Line from './charts/Line.js'
import Line_chart from './charts_for_genarall_user/Line_chart'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import axios from 'axios'
import Checking_activity from './charts_for_genarall_user/Checking_activity.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const [present, setPresent] = useState([])
  const [over, setOver] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
  ]

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
    console.log(checking)
    const topActivePerson = checking.slice(0, 10)
    setPresent(topActivePerson)
  }, [userInfoFromLocalStorage.token])
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  return (
    <>
      {userInfoFromLocalStorage.isAdmin && (
        <>
          <>
            <WidgetsDropdown />
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCol sm={5}>
                    <h4 id="traffic" className="card-title mb-0" style={{ color: '#686666' }}>
                      Checking Over Views
                    </h4>
                    <div className="small text-medium-emphasis">Sunday - Thursday</div>
                  </CCol>
                </CRow>
                <div style={{ height: 500 }}>
                  <Line />
                </div>
              </CCardBody>
            </CCard>
            <WidgetsBrand />
          </>
          <CRow>
            <CCol xs>
              <CCard className="mb-4">
                <CCardHeader>User Checking {' & '} Activity</CCardHeader>
                <CCardBody>
                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>User</CTableHeaderCell>
                        <CTableHeaderCell>Activity</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {present.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell>
                            <div>{item.name}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="small text-medium-emphasis">Last login</div>
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
        </>
      )}
      {userInfoFromLocalStorage.isAdmin === false && (
        <>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0" style={{ color: '#686666' }}>
                    Checking Over Views
                  </h4>
                  <div className="small text-medium-emphasis">Sunday - Thursday</div>
                </CCol>
              </CRow>
              <div style={{ height: 500 }}>
                <Line_chart />
              </div>
            </CCardBody>
          </CCard>
          <Checking_activity />
        </>
      )}
    </>
  )
}

export default Dashboard
