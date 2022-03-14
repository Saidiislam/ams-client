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
  const [message, setMessage] = useState('')
  const form = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/users/forgotpassword',
      { email },
      config,
    )
    if (data.msg) {
      setMessage(data.msg)
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
                    <h1>Forgot Password</h1>
                    <p className="text-medium-emphasis">Enter Your Password</p>
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
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4 mb-3" type="submit">
                          Submit
                        </CButton>
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
