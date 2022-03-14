import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout, cilUser, cilShieldAlt, cilPen } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import './appheader.css'

import avatar8 from '../../assets/images/avatars/userImage.png'
import { NavLink, useHistory } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const history = useHistory()
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const clearLocalStorage = () => {
    history.push('/home')
    localStorage.removeItem('userTime')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilShieldAlt} className="me-2" />
          {userInfoFromLocalStorage ? userInfoFromLocalStorage.name : 'no user'}
        </CDropdownItem>
        {userInfoFromLocalStorage && userInfoFromLocalStorage.isAdmin && (
          <CDropdownItem className="logginOut">
            <NavLink to="/checking/userlist" className="navLinkColor">
              <CIcon icon={cilUser} className="me-2" />
              User List
            </NavLink>
          </CDropdownItem>
        )}
        {userInfoFromLocalStorage && userInfoFromLocalStorage.isAdmin && (
          <CDropdownItem className="logginOut">
            <NavLink to="/checking/paddingcheck" className="navLinkColor">
              <CIcon icon={cilPen} className="me-2" />
              CheckIn Pending
            </NavLink>
          </CDropdownItem>
        )}
        {userInfoFromLocalStorage && (
          <>
            <CDropdownItem className="logginOut">
              <NavLink to="/checking/userprofile" className="navLinkColor">
                <CIcon icon={cilUser} className="me-2" />
                Profile
              </NavLink>
            </CDropdownItem>
            <CDropdownItem>
              <div className="logginOut" onClick={clearLocalStorage}>
                <CIcon icon={cilAccountLogout} className="me-2" />
                Log Out
              </div>
            </CDropdownItem>
          </>
        )}
        {/* <CDropdownDivider /> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
