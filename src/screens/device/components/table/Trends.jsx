import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from '../../../../css/deviceTrends.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceTrendsById } from '../../../../store/action/DeviceAction';

function Trends() {
  const { theme } = React.useContext(ThemeContext);
  const getAllTrendsByDeviceIdReducer = useSelector((state) => state.getAllTrendsByDeviceIdReducer);
  const { loading, data, error } = getAllTrendsByDeviceIdReducer;

  let trendsFilter = data && data.data && data.data.findDeviceById;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('name');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getDeviceTrendsById(
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
                <div className={Style.insideMapData} style={{ padding: '0.68rem' }}>Parameter</div>
                <div className={Style.insideMapData} style={{ padding: '0.68rem' }}>Unit</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>Mode</div>
                <div className={Style.insideMapData}>Mode Type</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData}>PIP</div>
                <div className={Style.insideMapData}>cmH20</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>PEEP</div>
                <div className={Style.insideMapData}>cmH20</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div style={{ margin: "0.8rem", width: "6rem", textAlign: "center" }}>Mean Airway</div>
                <div className={Style.insideMapData}>cmH20</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>Vti</div>
                <div className={Style.insideMapData}>ml</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData}>Vte</div>
                <div className={Style.insideMapData}>ml</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>Mve</div>
                <div className={Style.insideMapData}>Litre</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData}>Mvi</div>
                <div className={Style.insideMapData}>Litre</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>FiO2</div>
                <div className={Style.insideMapData}>%</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div style={{ margin: "0.8rem", width: "7rem", textAlign: "center" }}>RR</div>
                <div className={Style.insideMapData}>BPM</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>I:E</div>
                <div className={Style.insideMapData}>Ratio</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData}>Tinsp</div>
                <div className={Style.insideMapData}>sec</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>Texp</div>
                <div className={Style.insideMapData}>sec</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div style={{ margin: "0.8rem", width: "6rem", textAlign: "center" }}>Average Leak</div>
                <div className={Style.insideMapData}>%</div>
              </div>
            </div>
            {/* Trends Data */}
            <div className="d-grid" style={{ maxWidth: "100%", overflowX: "auto" }}>
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
                      <div className={Style.insideMapData}>{item.mode}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.pip}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.peep}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.mean_Airway}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.vti}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.vte}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.mve}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.mvi}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.fio2}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.respiratory_Rate}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.ie}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.tinsp}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.texp}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.averageLeak}</div>
                    </>
                  )
                })}
              </div>
            </div>
          </>
          :
          <div
            style={{
              height: "500px",
              backgroundColor: "white",
              width: "100%",
              borderRadius: "20px",
              background: "#FFFFFF 0% 0% no-repeat padding-box",
            }}
          >
            {loading && (
              <span
                style={{ position: "absolute", top: "50%", right: "50%" }}
              >
                {" "}
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </span>
            )}
            {error && (
              <div
                style={{
                  width: "100%",
                  position: 'absolute',
                  top: '50%',
                  textAlign: 'center'
                }}
              >
                <h6>{error}</h6>
              </div>
            )}
          </div>
        }
      </div>
    </>
  )
}

export default Trends