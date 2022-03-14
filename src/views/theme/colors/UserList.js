import React, { useCallback, useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'

import { cilCheckAlt, cilX, cilTrash, cilPenAlt } from '@coreui/icons'
import { NavLink } from 'react-router-dom'
import QRCode from 'qrcode.react'
import '../../../components/navdesgin.css'

const Colors = () => {
  const [user, setUser] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadCheckData = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/users', config)
    setUser(data)
    // console.log(data)
  }, [userInfoFromLocalStorage.token])
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
        },
      }
      await axios.delete(`http://localhost:5000/api/users/${id}`, config)
    }
  }
  return (
    <>
      <h1>This Is For Admin</h1>
      <br />
      <CTable color="secondary" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">IsAdmin</CTableHeaderCell>
            <CTableHeaderCell scope="col">QrCode</CTableHeaderCell>
            <CTableHeaderCell scope="col">Edit and Delete</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
          {user.map((user) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow key={user._id}>
              <CTableDataCell>{user._id}</CTableDataCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>
                {
                  <a href={`mailto:${user.email}`} style={{ color: 'black' }}>
                    {user.email}
                  </a>
                }
              </CTableDataCell>
              <CTableDataCell>
                {user.isAdmin ? (
                  <CIcon icon={cilCheckAlt} className="me-2" style={{ color: 'green' }} />
                ) : (
                  <CIcon icon={cilX} className="me-2" style={{ color: 'red' }} />
                )}
              </CTableDataCell>
              <CTableDataCell>
                <QRCode id={user._id} value={`${user.name},${user._id}`} className="qrcode_size" />
              </CTableDataCell>
              <CTableDataCell>
                {
                  <>
                    <NavLink to={`/checking/edit/${user._id}`}>
                      <button>
                        <CIcon icon={cilPenAlt} className="me-2" />
                      </button>
                    </NavLink>
                    <button onClick={() => deleteUser(user._id)}>
                      <CIcon icon={cilTrash} className="me-2" style={{ color: 'red' }} />
                    </button>
                  </>
                }
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Colors
