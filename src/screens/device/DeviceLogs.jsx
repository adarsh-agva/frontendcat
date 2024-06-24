import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Style from '../../css/device.module.css';
import { useSelector } from 'react-redux';
import TableCard1 from '../../container/TableCard1';
import Events from './components/table/Events';
import Logs from './components/table/Logs';
import Alarms from './components/table/Alarms';
import Trends from './components/table/Trends';
import back from "../../assets/images/back.png"
import { Link } from 'react-router-dom';
import Calibration from "../device/components/table/Calibration"
import NavBarForAll from '../../utils/NavBarForAll';
export default function DeviceLogs() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const did = urlParams.get('DeviceId');
  const projectCode =urlParams.get('projectCode');
  const getAllSectionByDeviceId = useSelector((state) => state.getAllSectionByDeviceId);
  const { loading, data } = getAllSectionByDeviceId;
  const deviceLogsData = data && data.data

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType


  const [eventsbtn, setEventsbtn] = useState("btn text-black")
  const [alarmsbtn, setAlarmsbtn] = useState()
  const [logsbtn, setLogsbtn] = useState()
  const [trendsbtn, setTrendsbtn] = useState()
  const [calibrationbtn, setCaliberationbtn] = useState()
  const [patientDetailsbtn, setPatientDetailsbtn] = useState()
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    if (tabIndex == 0) {
      setEventsbtn("btn text-black")
    }
    else {
      setEventsbtn("btn-light")
    }
    if (tabIndex == 1) {
      setAlarmsbtn('btn text-black')
    }
    else {
      setAlarmsbtn('btn-light')
    }
    if (tabIndex == 2) {
      setLogsbtn('btn text-black')
    }
    else {
      setLogsbtn('btn-light')
    }
    if (tabIndex == 3) {
      setTrendsbtn('btn text-black')
    }
    else {
      setTrendsbtn('btn-light')
    }
    if (tabIndex == 4) {
      setCaliberationbtn('btn text-black')
    }
    else {
      setCaliberationbtn('btn-light')
    }
    if (tabIndex == 5) {
      setPatientDetailsbtn('btn text-black')
    }
    else {
      setPatientDetailsbtn('btn-light')
    }
  };
  const goBack = () => {
    window.history.go(-1)
  }
  return (
    <div className={Style.rotate}>
      <NavBarForAll />
      <Row className='rowSection'>
        <Col xl={2} lg={2} md={2} sm={2} className='noSidebar colSection'>
        </Col>
        <div
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
          <div className='d-flex rohan' style={{ justifyContent: "center" }}>
            <div className={Style.container}>
              <div className='d-flex' style={{ gap: "10px" }}>
                <div class="d-flex" style={{ width: "4rem" }}>
                  <div class="card-header" style={{ display: "flex", alignItems: "center" }}>
                    <Link onClick={goBack}>
                      <img src={back} style={{ width: "3rem" }} />
                    </Link>
                  </div>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header">
                    Status
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.message}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{fontSize:'0.9rem'}}>
                    Alias Name
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Alias_Name ? deviceLogsData.Alias_Name : '- - -'}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{fontSize:'0.9rem'}}>
                    Department
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Department_Name}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{fontSize:'0.9rem'}}>
                    Hospital Name
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Hospital_Name}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{fontSize:'0.9rem'}}>
                    Doctor
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Doctor_Name}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>
                  <div class="card-header" style={{fontSize:'0.9rem'}}>
                    Ward Number
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Ward_No}
                  </span>
                </div>
                <div class={`${Style.detialsOfDid} shadow`}>

                  <div class="card-header">
                    Bio-Med
                  </div>
                  <span style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                    {deviceLogsData && deviceLogsData.Bio_Med}
                  </span>
                </div>
              </div>
              <Row className='mt-3'>
                <div class={Style.overflowdiv}>
                  <TableCard1 borderRadius="20px 20px 20px 20px">
                    <>
                      <div className={`${Style.Tabs} `}>
                        <div>
                          <button className={eventsbtn} onClick={() => handleTabClick(0)} style={{ width: "6rem", border: 'none', padding: "10px", color: "#fff",fontSize:'0.9rem' }} defaultChecked>Events</button>
                          <button className={alarmsbtn} onClick={() => handleTabClick(1)} style={{ width: "6rem", padding: "10px", border: 'none', color: "#fff",fontSize:'0.9rem' }}>Alarms</button>\
                          {adminProfile == 'Super-Admin'?
                          <button className={logsbtn} onClick={() => handleTabClick(2)} style={{ width: "7rem", padding: "10px", border: 'none', color: "#fff",fontSize:'0.9rem' }}>Crash Logs</button>
                          :''}
                          <button className={trendsbtn} onClick={() => handleTabClick(3)} style={{ width: "6rem", padding: "10px", border: 'none', color: "#fff",fontSize:'0.9rem' }}>Trends</button>
                          <button className={calibrationbtn} onClick={() => handleTabClick(4)} style={{ width: "7rem", padding: "10px", border: 'none', color: "#fff",fontSize:'0.9rem' }}>Calibration</button>
                          {/* {adminProfile == 'Super-Admin' || adminProfile == 'Nurse' ?
                            <button className={patientDetailsbtn} onClick={() => handleTabClick(5)} style={{ width: "10rem", padding: "6px", border: 'none', color: "#fff",fontSize:'0.9rem' }}>Patient Details</button>
                            : ''} */}
                        </div>
                      </div>
                      <section className={`${Style.tableHeader}`}>
                        {activeTab === 0 && <Events />}
                        {activeTab === 1 && < Alarms />}
                        {activeTab === 2 && <Logs />}
                        {activeTab === 3 && <Trends />}
                        {activeTab === 4 && <Calibration />}
                        {/* {activeTab === 5 && <PatientDetailsData />} */}
                      </section>
                    </>
                  </TableCard1>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </Row>
    </div>
  )
}