/* eslint-disable prettier/prettier */
import React from 'react'
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

const Navbar = () => {
    return (
        <div style={{background:"#111111"}}>
            <CContainer>
                    <CNavbar placement="fixed-top">
                    <CContainer fluid>
                        <CNavbarBrand style={{color : "#02c18d", fontWeight: "bolder"}} href="#"></CNavbarBrand>
                        <CForm className="d-flex">
                        <CButton color="success" shape="rounded-pill" type="submit" variant="outline" href='#/login'>
                            Sign Up!
                        </CButton>
                        </CForm>
                    </CContainer>
                    </CNavbar>
            </CContainer>
        </div>
    )
}

export default Navbar