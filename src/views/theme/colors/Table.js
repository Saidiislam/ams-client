import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useCallback } from 'react'
import classNames from 'classnames'
import {
  CCol,
  CCard,
  CFormSelect,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardFooter,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import axios from 'axios'
import Paginate from '../typography/Paginate'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from './pagination/useFetch'

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
      {/* <Colors /> */}
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  const { loading, data } = useFetch()
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])
  const reversData = followers.reverse()
  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [data, loading, page])
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > data.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = data.length - 1
      }
      return prevPage
    })
  }

  const handlePage = (index) => {
    setPage(index)
  }
  return (
    <>
      <div>
        <h1>{loading ? 'loading...' : 'This Is For Admin'}</h1>
      </div>
      <br />
      <CTable color="secondary" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Checked</CTableHeaderCell>
            <CTableHeaderCell scope="col">Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">Place</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
          {reversData.map((check) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow key={check._id}>
              <CTableDataCell>{check.user}</CTableDataCell>
              <CTableDataCell>{check.name}</CTableDataCell>
              <CTableDataCell>{check.check}</CTableDataCell>
              <CTableDataCell>{check.time}</CTableDataCell>
              <CTableDataCell>{check.date}</CTableDataCell>
              <CTableDataCell>
                {check.lati}/{check.long}
              </CTableDataCell>
              <CTableDataCell>{check.placedata}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
      {!loading && (
        <CPagination size="lg" align="center" aria-label="Page navigation example">
          <CPaginationItem onClick={prevPage}>prev</CPaginationItem>
          {data.map((item, index) => {
            return (
              <CPaginationItem
                key={index}
                active={index === page}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </CPaginationItem>
            )
          })}
          <CPaginationItem onClick={nextPage}>next</CPaginationItem>
        </CPagination>
      )}
    </>
  )
}

export default Colors
