/* eslint-disable prettier/prettier */
import React from 'react'
import styled, { keyframes } from 'styled-components'
import Navbar from './Navbar'
import {
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CContainer,
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
      <div style={{position:"absolute", zIndex:""}}>
        <Spline scene="https://draft.spline.design/agfTGlw1qSdGUqmG/scene.spline"/>
      </div>
    <Navbar/>
    <AppContainer style={{position:"absolute", left: "46vw", top: "35%"}}>
      <div>
        <CButton style={{background:"#02c18d", border:"2px solid #02c18d", padding:"1.5rem", fontWeight:"bold", fontSize:"1.2rem"}} shape="rounded-pill" type='submit' href='#/login'>Get Started</CButton>
      </div>
    </AppContainer>
    </div>

  )
}

export default Hero
