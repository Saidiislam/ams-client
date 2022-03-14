import { CCard, CCardBody } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import QrReader from 'react-qr-reader'

function QrCodeScanner() {
  const [scanResultWebcam, setScanResultWebcam] = useState('')
  const qrRef = useRef(null)
  const [name, setName] = useState('')
  const [qrcodeId, setQrcodeId] = useState('')
  const [checked, setChecked] = useState(true)
  const [location, setLocation] = useState({
    lati: '',
    long: '',
  })
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  // console.log(userInfoFromLocalStorage)
  const RealTime = new Date()
  const months = RealTime.getMonth()
  const time = RealTime.getHours() + ':' + RealTime.getMinutes() + ':' + RealTime.getSeconds()
  const date = RealTime.getDate() + '-' + months + 1 + '-' + RealTime.getFullYear()
  const getHours = RealTime.getHours()
  const success = (pos) => {
    var crd = pos.coords
    const latitu = crd.latitude
    const longitu = crd.longitude
    setLocation({
      lati: latitu,
      long: longitu,
    })
  }
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  const handleErrorWebcam = (error) => {
    console.log(error)
  }
  const handleScanWebcam = (result) => {
    setScanResultWebcam(result)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadStoreQrCode = () => {
    if (scanResultWebcam !== null) {
      const resultwebcam = scanResultWebcam.split(',')
      setName(resultwebcam[0])
      setQrcodeId(resultwebcam[1])
      handleSubmit()
      console.log(name, qrcodeId)
    }
  }
  const handleSubmit = async () => {
    const { lati, long } = location
    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lati}&lon=${long}&apiKey=9515698e632448d0820d65669c5fa699`,
    )
    console.log(data.features[0])
    const placedata = data.features[0].properties.formatted
    let check
    if (checked === true) {
      check = 'Check In'
      console.log(userInfoFromLocalStorage._id)
      if (userInfoFromLocalStorage._id === qrcodeId) {
        if (getHours >= 9 && getHours < 10) {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
            },
          }
          await axios.post(
            `http://localhost:5000/api/attendance/select`,
            { name, check, time, date, lati, long, placedata },
            config,
          )
          setChecked(!checked)
          alert('CheckIn')
          console.log('chceking')
        } else {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
            },
          }
          await axios.post(
            `http://localhost:5000/api/pending/selectpending`,
            { name, check, time, date, lati, long, placedata },
            config,
          )
          setChecked(!checked)
          alert('CheckIn')
          console.log('chceking')
        }
      } else {
        console.log('check false')
      }
    }
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error)
    loadStoreQrCode()
  }, [loadStoreQrCode])
  return (
    <CCard className="mt-3">
      <CCardBody
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="col-md-6 col-md-6">
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {/* <button onClick={onScanFile}>Qr code reader</button> */}
            <QrReader
              ref={qrRef}
              delay={300}
              onError={handleErrorWebcam}
              onScan={handleScanWebcam}
            />
          </div>
          <div
            style={{
              fontWeight: '700',
            }}
            className=""
          >
            <p>Your QRCodeHolds: {scanResultWebcam} </p>
          </div>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default QrCodeScanner
