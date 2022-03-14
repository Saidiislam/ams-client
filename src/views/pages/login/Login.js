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
import { useHistory } from 'react-router-dom'
import { useRef } from 'react'
import Card from 'src/views/theme/typography/Card'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const form = useRef()
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      config,
    )
    if (data.msg) {
      setMessage(data.msg)
    } else {
      localStorage.setItem('userTime', JSON.stringify(data))
    }
    if (data._id && data.email) {
      history.push('/dashboard')
    } else {
      history.push('/login')
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
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Log In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol className="d-flex justify-content-between">
                        <CButton color="primary" className="px-4 mb-3" type="submit">
                          Login
                        </CButton>
                        <Link to="/forgotpassword">
                          <p>Forgot Password</p>
                        </Link>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={6}>
                        <p>Dont have an account?</p>
                        <Link to="/register">
                          <CButton color="primary" className="" active tabIndex={-1}>
                            Register Now!
                          </CButton>
                        </Link>
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
