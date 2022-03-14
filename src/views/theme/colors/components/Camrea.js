import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Webcam from 'react-webcam'
import { loadModels, getFullFaceDescription, createMatcher } from '../../../../face-api/face'
import DrawBox from '../components/drawBox'
import { JSON_PROFILE } from '../../../../common/profile'
import axios from 'axios'

const WIDTH = 420
const HEIGHT = 420
const inputSize = 160

class CameraFaceDetect extends Component {
  constructor(props) {
    super(props)
    this.webcam = React.createRef()
    this.state = {
      fullDesc: null,
      faceMatcher: null,
      facingMode: null,
      dis: [],
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    loadModels()
    this.setInputDevice()
    this.matcher()
    // this.loadData()
  }

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async (devices) => {
      let inputDevice = await devices.filter((device) => device.kind === 'videoinput')
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: 'user',
        })
      } else {
        await this.setState({
          facingMode: { exact: 'environment' },
        })
      }
      this.startCapture()
    })
  }

  // loadData = async () => {
  //   const { data } = await axios.get('http://localhost:5000/api/attendance/faceapi/faechAll')
  //   this.setState({ des: data })
  // }

  matcher = async () => {
    const faceMatcher = await createMatcher(JSON_PROFILE)
    this.setState({ faceMatcher })
  }

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture()
    }, 1500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  capture = async () => {
    if (!!this.webcam.current) {
      await getFullFaceDescription(this.webcam.current.getScreenshot(), inputSize).then(
        (fullDesc) => this.setState({ fullDesc }),
      )
    }
  }

  render() {
    const { fullDesc, faceMatcher, facingMode } = this.state
    let videoConstraints = null
    let camera = ''
    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode,
      }
      if (facingMode === 'user') {
        camera = 'Front'
      } else {
        camera = 'Back'
      }
    }

    return (
      <div
        className="Camera"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p>Camera: {camera}</p>
        <div
          style={{
            width: WIDTH,
            height: HEIGHT,
          }}
        >
          <div style={{ position: 'relative', width: WIDTH }}>
            {!!videoConstraints ? (
              <div style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={WIDTH}
                  height={HEIGHT}
                  ref={this.webcam}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : null}
            {!!fullDesc ? (
              <DrawBox
                fullDesc={fullDesc}
                faceMatcher={faceMatcher}
                imageWidth={WIDTH}
                boxColor={'blue'}
              />
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default CameraFaceDetect
