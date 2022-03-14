import React, { useEffect } from 'react'

// eslint-disable-next-line react/prop-types
const Alert = ({ type, msg }) => {
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
