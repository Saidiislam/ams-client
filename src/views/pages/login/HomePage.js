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
} from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="whitesmoke">
      <CContainer>
        <CNav className="d-flex justify-content-between">
          <CNavItem>
            <CNavLink>
              <h2 style={{ color: 'black' }}>Attendance Management System</h2>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <Link to="/login" style={{ textDecoration: 'none', color: 'GrayText' }}>
                <h4>Login</h4>
              </Link>
            </CNavLink>
          </CNavItem>
        </CNav>
      </CContainer>
      <div>
        <CCarousel controls indicators dark>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src="https://www.talentproindia.com/wp-content/uploads/2020/11/How-Does-the-Attendance-Management-System-Help-the-Employees.jpg"
              alt="slide 1"
            />
            <CCarouselCaption className="d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src="https://empmonitor.com/blog/wp-content/uploads/2021/11/time-and-attendance-management-system-what-are-the-benefits.png"
              alt="slide 2"
            />
            <CCarouselCaption className="d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
            <CImage
              className="d-block w-100"
              src="https://www.techfunnel.com/wp-content/uploads/2021/04/employee-attendance-management-systems.png"
              alt="slide 3"
            />
            <CCarouselCaption className="d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </CCarouselCaption>
          </CCarouselItem>
        </CCarousel>
      </div>
      <CFooter>
        <div>
          <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
            Attendance
          </a>
          <span className="ms-1">&copy; 2021 creativeLabs.</span>
        </div>
        <div className="ms-auto">
          <span className="me-1">Powered by</span>
          <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
            CoreUI for React
          </a>
        </div>
      </CFooter>
    </div>
  )
}

export default HomePage
