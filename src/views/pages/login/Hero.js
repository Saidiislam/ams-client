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

const Landing = lazy(() => import('./Landing'))

// const Data1 = React.lazy(
//   () =>
//     new Promise((resolve, reject) => {
//       console.log("fetching Data1");
//       setTimeout(() => {
//         resolve({ default: ({ children }) => <>{children}</> });
//       }, 5000);
//     })
// );

const Hero = () => {
  return (
    <div className='Landing'>
      <Suspense fallback={<h1>Loading (3 sec)...</h1>}>
          <Landing />
      </Suspense>
    </div>

  )
}

export default Hero
