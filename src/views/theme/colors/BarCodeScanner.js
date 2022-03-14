import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useCallback, useRef } from 'react'
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
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import axios from 'axios'
import Quagga from 'quagga'

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
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const BarCodeScanner = () => {
  const [checked, setChecked] = useState(true)
  const firstUpdate = useRef(true)
  const [isStart, setIsStart] = useState(false)
  const [barcode, setBarcode] = useState('')
  const [location, setLocation] = useState({
    lati: '',
    long: '',
  })
  useEffect(() => {
    return () => {
      if (isStart) stopScanner()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
          constraints: {
            facingMode: 'environment', // or user
          },
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        frequency: 1,
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: 'large', // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false,
            },
          },
        },
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader',
            'i2of5_reader',
            '2of5_reader',
            'code_93_reader',
          ],
        },
      },
      (err) => {
        if (err) {
          return console.log(err)
        }
        Quagga.start()
      },
    )
    Quagga.onDetected(_onDetected)
    Quagga.onProcessed((result) => {
      let drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute('width')),
            parseInt(drawingCanvas.getAttribute('height')),
          )
          result.boxes
            .filter((box) => box !== result.box)
            .forEach((box) => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2,
              })
            })
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2,
          })
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, {
            color: 'red',
            lineWidth: 3,
          })
        }
      }
    })
  }
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    if (isStart) startScanner()
    else stopScanner()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart])

  const _onDetected = (res) => {
    // stopScanner();
    setBarcode(res.codeResult.code)
  }

  const stopScanner = () => {
    Quagga.offProcessed()
    Quagga.offDetected()
    Quagga.stop()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const RealTime = new Date()
  const months = RealTime.getMonth()
  const time = RealTime.getHours() + ':' + RealTime.getMinutes() + ':' + RealTime.getSeconds()
  const date = RealTime.getDate() + '-' + months + 1 + '-' + RealTime.getFullYear()
  const getHours = RealTime.getHours()
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const success = (pos) => {
    var crd = pos.coords
    const latitu = crd.latitude
    const longitu = crd.longitude
    // console.log(crd.accuracy)
    // eslint-disable-next-line no-sequences
    setLocation({
      lati: latitu,
      long: longitu,
    })
  }
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkingApiFunc = async (attendanceApi, name, check, lati, long) => {
    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lati}&lon=${long}&apiKey=9515698e632448d0820d65669c5fa699`,
    )
    console.log(data.features[0])
    const placedata = data.features[0].properties.formatted
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    await axios.post(
      `http://localhost:5000/api/${attendanceApi}`,
      { name, check, time, date, lati, long, placedata },
      config,
    )
    setChecked(!checked)
    alert('CheckIn')
  }
  useEffect(() => {
    let check
    navigator.geolocation.getCurrentPosition(success, error)
    const CheckDataPost = async () => {
      const { lati, long } = location
      if (checked === true) {
        check = 'Check In'
        if (userInfoFromLocalStorage.barCode === Number(barcode)) {
          const name = userInfoFromLocalStorage.name
          if (getHours >= 9 && getHours < 10) {
            checkingApiFunc('attendance/select', name, check, lati, long)
          } else {
            checkingApiFunc('pending/selectpending', name, check, lati, long)
            console.log('chceking')
          }
        }
      }
    }
    CheckDataPost()
  }, [RealTime, barcode, checked, checkingApiFunc, getHours, location, userInfoFromLocalStorage])
  return (
    <>
      <h1>Autonomous Attendance By Bar-Code Scanner</h1>
      <div style={{ textAlign: 'center' }}>
        <CButton
          style={{ marginRight: '10px', marginBottom: '10px' }}
          onClick={() => setIsStart((prevStart) => !prevStart)}
        >
          Start
        </CButton>
        {isStart && (
          <React.Fragment>
            <div id="scanner-container" />
            <span>Barcode: {barcode}</span>
          </React.Fragment>
        )}
      </div>
    </>
  )
}

export default BarCodeScanner
