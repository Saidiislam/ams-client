import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import Card from 'src/views/theme/typography/Card'

const Login = () => {
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [message, setMessage] = useState('')
  const { activetion_token } = useParams()
  const form = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password === cpassword) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.put(
        'http://localhost:5000/api/users/resetpassword',
        { password, activetion_token },
        config,
      )
      if (data.msg) {
        setMessage(data.msg)
      }
    } else {
      setMessage('Password Not Match')
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4 ">
                <CCardBody>
                  {message && <Card message={message} />}
                  <CForm ref={form} onSubmit={handleSubmit}>
                    <h1>Reset Password</h1>
                    <p className="text-medium-emphasis">Enter New Password</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol className="d-flex justify-content-between">
                        <CButton color="primary" className="px-4 mb-3" type="submit">
                          Submit
                        </CButton>
                        <Link to="/login">Login</Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
