/* eslint-disable prettier/prettier */
import React, { lazy, useCallback, useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCarousel,
  CCarouselItem,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CProgress,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardImage,
  CCardLink,
  CCardTitle,
  CCardSubtitle,
  CCardText,
  CListGroup,
  CListGroupItem,
  CBadge,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faBoltLightning, faBrain, faCheck, faWrench } from '@fortawesome/free-solid-svg-icons'

import Bigtwo from './img/bigt.png'
import Bigwall from './img/wall2.jpg'
import Fade from 'react-reveal/Fade'
import { Spline } from '@splinetool/react-spline'

const Bigcard = () => {
  return (
    <>
    <Spline style={{position:'absolute'}} scene="https://draft.spline.design/lrhAB4soqTNZothw/scene.spline"/>
    <div style={{ width: '100vw', height: '100vh', background: '#76A6E0', position: '' }}>
      <Fade bottom>
        <div
          className="row justify-content-md-center"
          style={{ width: '70vw', margin: 'auto', padding: '5rem 0' }}
        >
          <CContainer style={{ position: 'absolute' }}>
            <div className="">
              <CRow>
                <CCol
                  sm={6}
                  md={5}
                  lg={6}
                  style={{ alignItems: 'center', justifyContent: 'center', display: '' }}
                >
                  <h1 style={{ fontSize: '3.8rem', fontWeight: 'bolder', color: 'wheat' }}>
                    We Introduce
                  </h1>

                  <h2 style={{ fontSize: '1.8rem', fontWeight: '500', color: 'white' }}>
                    A Quick and Easy Way to track and manage your and employee&rsquo;s Attendances{' '}
                  </h2>
                  <div style={{ margin: '2rem 1rem' }}>
                    <div className="w-100">
                      <CListGroupItem
                        className="d-flex justify-content-between align-items-center"
                        style={{
                          color: 'wheat',
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          backgroundColor: 'transparent',
                          border: '0px',
                          paddingBottom: '0px'
                        }}
                      >
                        <div className="d-flex col">
                          <FontAwesomeIcon
                            style={{ marginRight: '10px', marginTop: '10px' }}
                            icon={faBoltLightning}
                          ></FontAwesomeIcon>
                          <div className="">
                            Fast serve
                            <p style={{ color: 'white', fontSize: '15px', fontWeight: '400' }}>
                              super fast and reliable, saves your time and effort!
                            </p>
                          </div>
                        </div>
                        <CBadge color="success" shape="rounded-pill">
                          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        </CBadge>
                      </CListGroupItem>
                      <CListGroupItem
                        className="d-flex justify-content-between align-items-center"
                        style={{
                          color: 'wheat',
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          backgroundColor: 'transparent',
                          border: '0px'
                        }}
                      >
                        <div className="d-flex col">
                          <FontAwesomeIcon
                            style={{ marginRight: '10px', marginTop: '10px' }}
                            icon={faWrench}
                          ></FontAwesomeIcon>
                          <div className="">
                            You Control!
                            <p style={{ color: 'white', fontSize: '15px', fontWeight: '400' }}>
                              Giving you the administrative powers to take control
                            </p>
                          </div>
                        </div>
                        <CBadge color="success" shape="rounded-pill">
                          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        </CBadge>
                      </CListGroupItem>
                      <CListGroupItem
                        className="d-flex justify-content-between align-items-center"
                        style={{
                          color: 'wheat',
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          backgroundColor: 'transparent',
                          border: '0px'
                        }}
                      >
                        <div className="d-flex col">
                          <FontAwesomeIcon
                            style={{ marginRight: '10px', marginTop: '10px' }}
                            icon={faBrain}
                          ></FontAwesomeIcon>
                          <div className="">
                            Options to choose
                            <p style={{ color: 'white', fontSize: '15px', fontWeight: '400' }}>
                              varies manual to fully automated attendance options
                            </p>
                          </div>
                        </div>
                        <CBadge color="success" shape="rounded-pill">
                          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        </CBadge>
                      </CListGroupItem>
                    </div>
                  </div>
                </CCol>
                <CCol
                  sm={6}
                  md={{ span: 5, offset: 2 }}
                  lg={{ span: 6, offset: 0 }}
                  style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}
                >
                  <CCard style={{ width: '60rem', padding: '0', backgroundColor: 'transparent' }}>
                    {/* <img style={{ borderRadius: '10px', width: '40rem' }} src={Bigwall} alt="" /> */}
                    <CCarousel controls transition="crossfade">
                      <CCarouselItem>
                        <img style={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '100%' }} src={Bigwall} alt="slide 1" />
                      </CCarouselItem>
                      <CCarouselItem>
                        <img style={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '100%' }} src={Bigtwo} alt="slide 2" />
                      </CCarouselItem>
                    </CCarousel>
                  </CCard>
                </CCol>
              </CRow>
            </div>
          </CContainer>
        </div>
      </Fade>
    </div></>
  )
}

export default Bigcard
