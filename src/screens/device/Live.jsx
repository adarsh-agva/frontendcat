// Live.js
import React from 'react';
import image from '../../assets/images/standBy.png';
import alarmUnMute from '../../assets/images/alarmumute-2.png';
import alarmMute from '../../assets/images/alarmMute.png';
import chargingConnect from '../../assets/images/plug.png';
import charging from '../../assets/images/Charging.png';
import discharging from '../../assets/images/discharge.png';
import Betteryfull from '../../assets/images/Betteryfull.png';
import Betterylow from '../../assets/images/Betterylow.png';
import Betterylowup from '../../assets/images/Betterylowup.png';
import Betterymedium from '../../assets/images/Betterymedium.png';
import { useNavigate } from 'react-router';
import lungs from '../../assets/icons/lungs.png';
import { IoExitOutline } from "react-icons/io5";
import DynamicGraphData from "./DynamicGraphData"
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Toaster } from 'react-hot-toast';
import Style from "../../css/Live.module.css"
// const serverUrl = 'http://192.168.2.1:8000/';
const serverUrl = `${process.env.REACT_APP_BASE_URL}/` 
const socket = io.connect(serverUrl, () => {
})
function Live() {
  const [dataArray, setDataArray] = useState([]);
  const [mode, setMode] = useState([])
  const [perameters, setParameters] = useState([])
  const [observer, setObserver] = useState([])
  const [spo2List, setSpo2List] = useState([])
  const [alertData, setAlertData] = useState([])
  const [batteryAlarmData, setBatteryData] = useState([])
  const [btnChange, setBtnChange] = useState('black')
  const [seconds, setSeconds] = useState(300);
  // let zoom = (( window.outerWidth - 10 ) / window.innerWidth) * 100;
  // 2 Minute timmer functionality

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);
    if (seconds <= 0) {
      socket.emit('ReactNodeStop', deviceId)
      navigate(`/device`)
    }
    return () => {
      clearInterval(timer);
    };
  }, [seconds]);


  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`)
  };
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deviceId = urlParams.get('DeviceId')
  const projectName = urlParams.get('projectName');
  const code = urlParams.get('code');
  const navigate = useNavigate()
  const handleClose = () => {
    socket.emit('ReactNodeStop', deviceId)
    navigate(`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${deviceId}`)
  };

  const [rohan, setRohan] = useState("Loading...")
  const [graphBtn, setGraphBtn] = useState(false)
  const [graphSocketData, setGraphSocketData] = useState()
  useEffect(() => {
    const connectToServer = async () => {
      try {
        await io.connect();
        console.log('Connected to server');
        checkServerStatus();
      } catch (error) {
        console.error('Error connecting to server:', error);
      }
    };
    connectToServer()
    socket.on('DataReceivingReact', data => {
      var value = data.split("^")[0];
      if (value == deviceId) {
        const modeData = data.split("^")[1]
        const observedData = data.split("^")[2].split(",")
        const setParameter = data.split("^")[3].split(",")
        const secondaryObserved = data.split("^")[4].split(",")
        const spo2List = data.split("^")[5].split(",")
        const alertData = data.split("^")[6]
        const batteryAlarmData = data.split("^")[7]

        setDataArray(observedData)
        setMode(modeData)
        setParameters(setParameter)
        setObserver(secondaryObserved)
        setSpo2List(spo2List)
        setAlertData(alertData)
        setBatteryData(batteryAlarmData)
      }
    })

    socket.on('DataGraphReceivingReact', data => {
      var value = data.split("^")[0];
      if (value == deviceId) {
        const graphData = data.split("^")[1]
        setGraphSocketData(graphData)
      }
    })
    socket.on('ReceiverVentilatorDisconnected', data => {
      var value = data.split(",")[0];
      setRohan("No Data Found")
      if (value == deviceId) {
        setTimeout(() => {
          navigate(`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${deviceId}`)
        }, 1000);
      }
    })
    socket.emit('ReactStartUp', deviceId)

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setDataArray([]);
    });

    var newDeviceId = deviceId
    var supernewDeviceid = JSON.stringify(newDeviceId)
    console.log("supernewDeviceid1", supernewDeviceid)
    socket.on(supernewDeviceid, (data) => {
      console.log('Received data:', data);
      console.log("supernewDeviceid2", supernewDeviceid)
    });
    var newDeviceId = deviceId
    var supernewDeviceid = JSON.stringify(newDeviceId)
    const checkServerStatus = () => {
    };
  }, [])
  const detectHistory = () => {

    socket.emit('ReactNodeStop', deviceId)
  }
  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener("popstate", detectHistory);
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  const [dataBtn, setDataBtn] = useState("btn text-black")
  const [graphDataBtn, setGraphDataBtn] = useState('')
  const handleDataBtn = () => {
    if (graphBtn == true) {
      setGraphBtn(false)
      setDataBtn('btn text-black')
      setGraphDataBtn('')
    }
  }
  const handleGraphBtn = () => {
    if (graphBtn == false) {
      setGraphBtn(true)
      setDataBtn('')
      setGraphDataBtn('btn text-black')
    }
  }
  return (
    // <div className={dataArray.length > 0 ?Style.container:Style.containerTwo} id='container'>
     <div className={Style.container} id='container'>
      <Toaster />
      {dataArray.length > 0 ?
        <div className={Style.insideContainer}>
          <div className={Style.upperModel}>
            <div className={Style.liveHeading}>
              <h1 className={Style.model_heading}>{mode}</h1>
              <h5 style={{ color: 'white', width: '1rem' }}>{formatTime()}</h5>
              {batteryAlarmData.split(",")[3] == "true" ? <img
                src={lungs}
                alt="alarmMute"
                className={Style.alarmmute_ing}
              />
                : ""
              }
              {/* </h5> */}
              <h5 style={{ width: "400px", backgroundColor: alertData.split("~")[1], color: alertData.split("~")[2], padding: '22px', fontSize: "1rem" }}>{alertData.split("~")[0]}</h5>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '5rem', width: '30%', alignItems: 'center' }}>
                  {batteryAlarmData.split(",")[2] == "true" ?
                    <div style={{ backgroundColor: '#f4c430', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <img
                        src={alarmMute}
                        alt="alarmMute"
                        className={Style.alarmmute_ing}
                      />
                      <p style={{ color: 'black', fontSize: '10px', padding: '5px', fontWeight: 'bolder' }}>Audio Paused</p>
                    </div>
                    :
                    <img
                      src={alarmUnMute}
                      alt="alarmUnMute"
                      className={Style.alarm_ing}
                    />
                  }
                </div>
                {batteryAlarmData.split(',')[1] === "charging" ?
                  <img
                    src={charging}
                    alt="battery"
                    className={Style.charging_ing}
                  /> :
                  batteryAlarmData.split(',')[1] === "full" ?
                    <img
                      src={Betteryfull}
                      alt="battery"
                      className={Style.charging_ing}
                    /> :
                    batteryAlarmData.split(',')[1] === "medium" ?
                      <img
                        src={Betterymedium}
                        alt="battery"
                        className={Style.charging_ing}
                      /> :
                      batteryAlarmData.split(',')[1] === "half" ?
                        <img
                          src={Betterylowup}
                          alt="battery"
                          className={Style.charging_ing}
                        /> :
                        <img
                          src={Betterylow}
                          alt="battery"
                          className={Style.charging_ing}
                        />
                }
                {batteryAlarmData.split(",")[0] == "true" ?
                  <img
                    src={discharging}
                    alt="discharging"
                    className={Style.charging_ing}
                  />
                  :
                  <img
                    src={chargingConnect}
                    alt="chargingConnect"
                    className={Style.discharging_ing}
                  />}
                <div
                  style={{
                    cursor: 'pointer',
                  }}
                  className={Style.exitBtn}
                  onClick={handleClose}
                >
                  <IoExitOutline className={Style.cross_ing} value={{ color: 'white'}}/>
                </div>
                <div style={{ border: '1px solid #606060', display: 'flex', marginBottom: '-16px', height: '5.5rem' }}>
                  {spo2List.map((item, index) => {
                    return (
                      <div key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", textAlign: 'center', color: '#787878', width: '7.5rem' }}>
                        <h6 style={{ color: 'white' }}>{item.split("~")[0]}</h6>
                        <h6 style={{ color: 'white' }}>{item.split("~")[1]}</h6>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={Style.formData}>
            <div className={Style.leftDataForm}>
              <h5>
                <button className={dataBtn} onClick={handleDataBtn} defaultChecked style={{width:'12rem',height:'3.5rem',borderRadius:'0px',textAlign:'left'}}>
                  DATA
                </button>
              </h5>
              <h5>ALARMS</h5>
              <h5>LOOPS</h5>
              <h5>
                <button className={graphDataBtn} onClick={handleGraphBtn} style={{width:'12rem',height:'3.5rem',borderRadius:'0px',textAlign:'left'}}>
                  GRAPHS
                </button>
              </h5>
              {/* <h5>MANEUVERS</h5> */}
              {/* <h5>LOGS</h5> */}
              <h5>MODES</h5>
              <h5>CONTROLS</h5>
              <h5>SYSTEM</h5>
            </div>
            {graphBtn == false ?
             
              <div className={Style.mainData}>
                {dataArray.map((label, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', gap: "1rem" }}>
                    <span style={{ color: "white", fontSize: 20 }}>{label.split("~")[0]}</span>
                    <span style={{ color: "white", fontSize: 15 }}>{label.split("~")[1] === "null" ? "-" : label.split("~")[1]}</span>
                  </div>
                ))}
              </div>
              :
              <div className={Style.graphData} style={{ marginTop: "1rem", width: "70%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                 <DynamicGraphData style={{ position: 'fixed' }} data={graphSocketData} />
              </div>
            }
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {observer.map((item, index) => {
                return (
                  <div key={index} style={{ textAlign: "start", color: '#787878', width: '15rem', border: '1px solid #606060', padding: '0.8rem' }}>
                    <h6>{item.split("~")[0]}</h6>
                    <h1 style={{ textAlign: 'end', color: 'white' }}>{item.split("~")[1]}</h1>
                    <h6>{item.split("~")[2]}</h6>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='lower_model' style={{ marginTop: "1rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {perameters.map((item, index) => {
                return (
                  <div key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: 'center', color: '#787878', width: '12rem', height: '9rem', border: '1px solid #606060', padding: '1rem' }}>
                    <h6>{item.split("~")[0]}</h6>
                    <h1 style={{ color: 'white' }}>{item.split("~")[1]}</h1>
                    <h6>{item.split("~")[2]}</h6>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        :
        <div style={{ display: 'flex', position:'relative', top: '50%', justifyContent: 'center', backgroundColor: "black",width:'100%'}}>
          <h5 style={{ color: "white" }}>{rohan}</h5></div>}
    </div>
  );
}
export default Live;