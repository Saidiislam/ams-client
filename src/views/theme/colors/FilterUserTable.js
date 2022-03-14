import QRCode from 'qrcode.react'
import React, { useCallback, useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { CSVLink, CSVDownload } from 'react-csv'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import axios from 'axios'
import '../../../components/navdesgin.css'

const Colors = () => {
  const [checkData, setCheckData] = useState([])
  const [text, setText] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [user, setUser] = useState([])
  const [selected, setSelected] = useState([])
  const [visible, setVisible] = useState(false)
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const tabelData = [
    { headTabel: 'Id', selector: 'user' },
    { headTabel: 'name', selector: 'name' },
    { headTabel: 'Checked', selector: 'check' },
    { headTabel: 'Time', selector: 'time' },
    { headTabel: 'Date', selector: 'date' },
    { headTabel: 'Place', selector: 'placedata' },
  ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadCheckData = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/attendance/adcheckbyfilter', config)
    // console.log(data)

    setCheckData(data)
  }, [userInfoFromLocalStorage.token])
  const loadUserData = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/attendance/select', config)
    console.log(data)
    setUser(data)
    // console.log(data)
  }, [userInfoFromLocalStorage.token])
  useEffect(() => {
    loadCheckData()
    loadUserData()
  }, [loadCheckData, loadUserData])
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  //
  let tempCheckData = [...checkData]
  const handleFilter = (e) => {
    // console.log(tempCheckData)
    // console.log(text)
    if (text) {
      tempCheckData = tempCheckData.filter((data) => {
        return data.name.toLowerCase().startsWith(text.toLocaleLowerCase())
      })
      console.log(tempCheckData)
      setCheckData(tempCheckData)
    }
  }
  const handleDateFilter = () => {
    tempCheckData = tempCheckData.filter((data) => {
      const date = new Date(data.date).getTime()
      const start = new Date(startDate).getTime()
      const end = new Date(endDate).getTime()
      return start <= date && date <= end
    })
    setCheckData(tempCheckData)
  }
  const handleTimeFilter = () => {
    tempCheckData = tempCheckData.filter((data) => {
      const dbTime = data.time.split(':')
      const dbMinute = dbTime[0] * 60 + Number(dbTime[1])
      const starttime = startTime.split(':')
      const startMunite = starttime[0] * 60 + Number(starttime[1])
      const endtime = endTime.split(':')
      const endMinute = endtime[0] * 60 + Number(endTime[1])
      return startMunite <= dbMinute && dbMinute <= endMinute
    })
    setCheckData(tempCheckData)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let newArray = []
  useEffect(() => {
    selected.forEach((v) => {
      newArray.push(v.label)
    })
  }, [newArray, selected])

  const handleOptionSelect1 = () => {
    tempCheckData = tempCheckData.filter((data) => {
      return newArray.includes(data.name)
    })
    console.log(tempCheckData)
    setCheckData(tempCheckData)
  }
  const downloadPdf = () => {
    const columns_data_for_export = tabelData.slice(0, tabelData.length).map((d) => d.headTabel)
    const doc = new jsPDF()

    const temp_rows = checkData.map((d1) =>
      tabelData
        .slice(0, tabelData.length)
        .map((d2) => d2.selector)
        .map((d3) => d1[d3]),
    )
    doc.autoTable({
      head: [columns_data_for_export],
      body: temp_rows,
    })
    console.log(columns_data_for_export, temp_rows)
    doc.save('client_list.pdf')
  }
  return (
    <>
      <CRow className="justify-content-center">
        <CCol md={4} lg={7} xl={6}>
          <h5>Search User</h5>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <CInputGroup className="mb-3" style={{ width: '60%' }}>
              <CFormInput
                placeholder="Username"
                aria-label="Username"
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-describedby="basic-addon1"
              />
              <CButton onClick={handleFilter}>Search</CButton>
            </CInputGroup>
            <CButton onClick={() => setVisible(!visible)} className="btn-filter-style">
              Advance Filter
            </CButton>
          </div>
          <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle>Filter Select By Date And Time : </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div
                style={{
                  display: 'flex',
                  marginBottom: '18px',
                }}
              >
                <MultiSelect
                  options={user}
                  value={selected}
                  onChange={setSelected}
                  labelledBy={'Select'}
                />
                <CButton onClick={handleOptionSelect1} className="btn-style">
                  Filter
                </CButton>
              </div>
              <CInputGroup className="mb-3" style={{ width: '100%' }}>
                <CFormInput
                  type="time"
                  id="formFileMultiple3"
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <CFormInput
                  type="time"
                  id="formFileMultiple4"
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <CButton onClick={handleTimeFilter}>Filter</CButton>
              </CInputGroup>
              <CInputGroup className="mb-3" style={{ width: '100%' }}>
                <CFormInput
                  type="date"
                  id="formFileMultiple"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <CFormInput
                  type="date"
                  id="formFileMultiple1"
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <CButton onClick={handleDateFilter}>Filter</CButton>
              </CInputGroup>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </CCol>
        <CCol md={6} lg={7} xl={6}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'end' }}>
            <CDropdown>
              <CDropdownToggle>Export Table</CDropdownToggle>
              <CDropdownMenu>
                <CSVLink data={checkData}>
                  <CButton
                    color="secondary"
                    style={{ padding: '10px 61px', margin: '0px 4px 10px 5px' }}
                  >
                    CSV
                  </CButton>
                </CSVLink>
                <CButton
                  onClick={downloadPdf}
                  color="secondary"
                  style={{ padding: '10px 61px', marginLeft: '5px' }}
                >
                  PDF
                </CButton>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </CCol>
      </CRow>

      <br />
      <CTable color="secondary" striped>
        <CTableHead>
          <CTableRow>
            {tabelData.map((t) => (
              <CTableHeaderCell scope="col" key={t.headTabel}>
                {t.headTabel}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
          {checkData.map((check) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow key={check._id}>
              <CTableDataCell>{check.user}</CTableDataCell>
              <CTableDataCell>{check.name}</CTableDataCell>
              <CTableDataCell>{check.check}</CTableDataCell>
              <CTableDataCell>{check.time}</CTableDataCell>
              <CTableDataCell>{check.date}</CTableDataCell>
              <CTableDataCell>{check.placedata}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Colors
