import React, { useState } from 'react'
import { CButton, CCol, CCollapse, CRow } from '@coreui/react'
import QrCodeScanner from './components/QrCodeScanner'

const QrCode = () => {
  const [visibleA, setVisibleA] = useState(false)

  return (
    <>
      <h1>Autonomous Attendance By Qr-Code Scanner</h1>
      <div
        className=""
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <CButton
          style={{ marginRight: '10px', marginBottom: '10px' }}
          onClick={() => {
            setVisibleA(!visibleA)
          }}
        >
          Scan QR Code
        </CButton>
      </div>
      <CRow>
        <CCol md={12}>
          <CCollapse visible={visibleA}>
            <QrCodeScanner />
          </CCollapse>
        </CCol>
      </CRow>
    </>
  )
}

export default QrCode
