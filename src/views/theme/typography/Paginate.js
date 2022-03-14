import { CPagination, CPaginationItem } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function Paginate({ pages, page, isAdmin = false, keyword = '' }) {
  return (
    pages > 1 && (
      <>
        <CPagination size="lg" align="center" aria-label="Page navigation example">
          <CPaginationItem>Previous</CPaginationItem>
          {[...Array(pages).keys()].map((x) => (
            <Link key={x + 1} to={`/checking/admin/${x + 1}`}>
              <CPaginationItem active={x + 1 === page}>{x + 1}</CPaginationItem>
            </Link>
          ))}
          <CPaginationItem>Next</CPaginationItem>
        </CPagination>
        <div style={{ textAlign: 'center' }}>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </>
    )
  )
}

export default Paginate
