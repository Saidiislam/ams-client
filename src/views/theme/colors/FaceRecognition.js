import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useCallback } from 'react'
import classNames from 'classnames'
import {
  CCol,
  CCard,
  CButton,
  CCardBody,
  CContainer,
  CRow,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import {
  loadModels,
  getFullFaceDescription,
  createMatcher,
  isFaceDetectionModelLoaded,
} from '../../../face-api/face'
import CameraFaceDetect from './components/Camrea'

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

const FaceRecognition = () => {
  // const [imageObj, setImageObj] = useState({})
  // const [discriptor, setDiscriptor] = useState([])
  // const [name, setName] = useState('')
  // const userInfoFromLocalStorage = localStorage.getItem('userTime')
  //   ? JSON.parse(localStorage.getItem('userTime'))
  //   : null
  // const handleFileChange = (event) => {
  //   setImageObj(URL.createObjectURL(event.target.files[0]))
  // }
  // const handleButtonClick = async (e) => {
  //   e.preventDefault()
  //   let blob = await fetch(imageObj)
  //     .then((r) => r.blob())
  //     .catch((error) => console.log(error))
  //   if (!!blob && blob.type.includes('image')) {
  //     setImageObj(URL.createObjectURL(blob))

  //     await getFullFaceDescription(imageObj).then((fullDesc) => {
  //       fullDesc.map((fd) => {
  //         setDiscriptor(fd.descriptor.toString())
  //         console.log(discriptor)
  //       })
  //     })
  //   }
  // }
  // useEffect(() => {
  //   loadModels()
  // }, [])
  // const postdata = async () => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
  //     },
  //   }
  //   const { data } = await axios.post('http://localhost:5000/api/attendance/faceapi/descriptor', {
  //     name,
  //     discriptor,
  //   })
  //   console.log(data)
  //   // console.log(discriptor)
  // }
  return (
    <>
      <div className="min-vh-70 d-flex flex-row align-items-start">
        <CContainer>
          <CRow className="justify-content-center">
            {/* <CCol md={3} lg={5} xl={4}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={handleButtonClick}>
                    <br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="username"
                        required
                      />
                    </CInputGroup>
                    <br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="file"
                        placeholder="Enter Your File"
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png"
                        autoComplete="username"
                        required
                      />
                    </CInputGroup>
                    <CCol xs={6} className="text-right">
                      <CButton className="px-2" color="secondary" type="submit">
                        <b>Upload</b>
                      </CButton>
                    </CCol>
                  </CForm>
                  <br />
                  <CButton onClick={postdata} className="px-2" color="secondary">
                    <b>Postdata</b>
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol> */}
            <CCol md={7} lg={5} xl={6}>
              <CameraFaceDetect />
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default FaceRecognition
