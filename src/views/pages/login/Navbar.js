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
import ReactLogo from './svgs.svg'
const Navbar = () => {
    return (
        <div style={{background:"#111111"}}>
            <CContainer>
                    <CNavbar placement="fixed-top">
                    <CContainer fluid style={{marginLeft:"10vw", marginRight:"10vw"}}>
                        <CNavbarBrand style={{color : "#02c18d", fontWeight: "bolder"}} href="#">
                            <CContainer>
                                <img style={{width:"3rem",  color:"#f5deb3"}} src={ReactLogo} alt=""/>
                            </CContainer>
                        </CNavbarBrand>
                        <CForm className="d-flex">
                        <CButton color="primary" shape="rounded-pill" type="submit" variant="outline" href='#/login'>
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