/* eslint-disable prettier/prettier */
import React, { Suspense, lazy } from 'react'
import styled, { keyframes } from 'styled-components'
import Navbar from './Navbar'
import {
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CContainer,
  CCol,
  CFooter,
  CImage,
  CNav,
  CNavItem,
  CNavLink,
  CNavbar,
  CNavbarBrand,
  CFormInput,
  CButton,
  CForm
} from '@coreui/react'
import { Spline } from '@splinetool/react-spline';
import Cards from './Cards';
import Bigcard from './Bigcard';
import Fade from 'react-reveal/Fade'

const textFade = keyframes`
  0%   {  opacity: 0;  }
  100% { opacity: 1;  }
`

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index:1;

  div {
    padding: 1rem;
    color: #fff;
    text-align: center;
    animation: 2s ${textFade} ease-in;
  }
`

const Hero = () => {
  return (
    <div>
      <Navbar/>
      <AppContainer style={{position:"absolute", left: "50%", top: "35%", transform:'translate(-40%, 0%)'}}>
        <div>
          <CButton className='Buttoned' style={{background:"#1f8cff", border:"2px solid #1f8cff", padding:"1.5rem", fontWeight:"bold", fontSize:"1.2rem"}} shape="rounded-pill" type='submit' href='#/login'>Get Started</CButton>
        </div>
      </AppContainer>
      <div style={{position:"absolute", zIndex:"-2000"}}>
        {/* <Spline scene="https://draft.spline.design/PxyhUgpENILAjw60/scene.spline"/> */}
        <Spline scene="https://draft.spline.design/AGUV07rpFDGD4v83/scene.spline"/>
        <div style={{position:"relative", width:"auto"}}>
          <Bigcard />
        </div>
      </div>
    </div>

  )
}

export default Hero
