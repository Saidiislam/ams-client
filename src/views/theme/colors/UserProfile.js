import QRCode from 'qrcode.react'
import { useBarcode } from 'react-barcodes'
import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { rgbToHex } from '@coreui/utils'
import ShareLink from './components/ShareLink'
// import '../../../components/navdesgin.css'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const UserProfile = () => {
  const [name, seTname] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      id: userInfoFromLocalStorage._id,
      name,
      password,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const response = await axios.put(`http://localhost:5000/api/users/profile`, user, config)
    localStorage.setItem('userTime', JSON.stringify(response.data))
    setMessage(response.statusText)
  }
  const { inputRef } = useBarcode({
    value: `${
      userInfoFromLocalStorage ? userInfoFromLocalStorage.barCode : userInfoFromLocalStorage.name
    }`,
    options: {
      background: '#ccffff',
    },
  })
  return (
    <div className="min-vh-70 d-flex flex-row align-items-start">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4} lg={7} xl={6}>
            <CCard style={{ width: '30rem' }}>
              <CCardHeader>
                <h3>Your Profile</h3>
              </CCardHeader>
              <CListGroup flush>
                <CListGroupItem>ID : {userInfoFromLocalStorage._id}</CListGroupItem>
                <CListGroupItem>Name : {userInfoFromLocalStorage.name}</CListGroupItem>
                <CListGroupItem>Email : {userInfoFromLocalStorage.email}</CListGroupItem>
                <h6 style={{ textAlign: 'center' }}>Get Your QrCode</h6>{' '}
                <CListGroupItem style={{ textAlign: 'center' }}>
                  <QRCode
                    id={userInfoFromLocalStorage ? userInfoFromLocalStorage._id : null}
                    value={`${userInfoFromLocalStorage ? userInfoFromLocalStorage.name : null},${
                      userInfoFromLocalStorage ? userInfoFromLocalStorage._id : null
                    }`}
                  />
                  <br />
                  <ShareLink
                    style={{}}
                    label="Share"
                    title="Here's Your Code"
                    text="Grab your code here"
                  />
                </CListGroupItem>
                <h6 style={{ textAlign: 'center' }}>Get Your BarCode</h6>{' '}
                <CListGroupItem style={{ textAlign: 'center' }}>
                  <svg alt="BarCode" className="svgClass" ref={inputRef} />
                  <br />
                  <ShareLink
                    style={{}}
                    label="Share"
                    title="Here's Your Code"
                    text="Grab your code here"
                  />
                </CListGroupItem>
              </CListGroup>
            </CCard>
          </CCol>
          <br />
          <CCol md={6} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  {message === 'OK' && <p>User Update sucessfull</p>}
                  <h3>Update User Profile</h3>
                  <br />
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={name}
                      onChange={(e) => seTname(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <br />
                  <CCol xs={6} className="text-right">
                    <CButton className="px-2" color="secondary" type="submit">
                      <b>UPDATE</b>
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default UserProfile
