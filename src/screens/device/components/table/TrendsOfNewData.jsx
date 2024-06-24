
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from '../../../../css/deviceTreendsNewData.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getNewDevicesOfTrendsById } from '../../../../store/action/DeviceAction';

function TrendsOfNewData() {
  const { theme } = React.useContext(ThemeContext);
  const getAllTrendsByNewDevicesIdReducer = useSelector((state) => state.getAllTrendsByNewDevicesIdReducer);
  const { loading, data } = getAllTrendsByNewDevicesIdReducer;

  let trendsFilter = data && data.data && data.data.findDeviceById;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('name');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getNewDevicesOfTrendsById(
        code,
      )
    )
  }, ([]))
  return (
    <>
      <div className='d-flex' style={{ fontSize: "0.9rem" }}>
        {/* Trends Value */}
        {trendsFilter && trendsFilter.length > 0 ?
          <>
            <div>
              <div className={Style.trendsInnerValueTop}>
                <div className={Style.insideMapData} style={{color:'#4d4d4d'}}>m</div>
                <div className={Style.insideMapData} style={{color:'#4d4d4d'}}>m</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData} style={{color:'#2a9e2a'}}>HR</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>/min</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData} style={{color:'#01E3E4'}}>SpO2</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>%</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData} style={{color:'#01E3E4'}}>Pulse</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>%</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div style={{ margin: "0.8rem", width: "6rem", textAlign: "center",color:'#FF007A' }}>Nibp Sys</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>mmHg</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData} style={{color:'#FF007A'}}>Nibp Dia</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>mmHg</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData} style={{color:'white'}}>CO2</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>mmHg</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData} style={{color:'#FFBF00'}}>IBP Sys</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>mmHg</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData} style={{color:'#FFBF00'}}>IBP Dia</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>mmHg</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData} style={{color:'#e21010'}}>T-1</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>C</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div style={{ margin: "0.8rem", width: "7rem", textAlign: "center",color:'#e21010' }}>T-2</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>C</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData} style={{color:'gray'}}>RR</div>
                <div className={Style.insideMapData} style={{color:'gray'}}>bpm</div>
              </div>
            </div>
            {/* Trends Data */}
            <div className="d-grid" style={{ maxWidth: "100%", overflowX: "auto"}}>
              <div className={Style.trendsInnerDataTop}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.time}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'#2a9e2a'}}>{item.hr}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'#01E3E4'}}>{item.spo2}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'#01E3E4'}}>{item.pr}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'#FF007A'}}>{item.nibp_S}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'#FF007A'}}>{item.nibp_D}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'white'}}>{item.etCo2}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'#FFBF00'}}>{item.iBP_S}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'#FFBF00'}}>{item.iBP_D}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'#e21010'}}>{item.temp1}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'#e21010'}}>{item.temp2}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData} style={{color:'gray'}}>{item.rr}</div>
                    </>
                  )
                })}
              </div>
            </div>
          </>
          :
          <section style={{ width: '100%', height: '100%', marginTop: '10rem', marginBottom: '10rem' }}>
            {trendsFilter && trendsFilter.length == 0 && (
              <section className={Style.noDataFound}>
                <span>
                  No Data Found
                </span>
              </section>
            )}
            {loading && <span style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>Loading...</span>}
          </section>
        }
      </div>
    </>
  )
}

export default TrendsOfNewData