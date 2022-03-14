import React from 'react'
import { CCard, CCardTitle } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const Card = ({ message }) => {
  return (
    <>
      <CCard>
        <CCardTitle style={{ padding: '10px' }}>{message}</CCardTitle>
      </CCard>
    </>
  )
}

export default Card
