import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Style from '../../../../css/deviceEvents.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getNewDevicesEventsById } from '../../../../store/action/DeviceAction';
import back from "../../../../assets/images/back.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
export default function Events() {
  const { theme } = React.useContext(ThemeContext);
  const getAllEventsByNewDeviceIdReducer = useSelector((state) => state.getAllEventsByNewDeviceIdReducer);
  const { loading, data } = getAllEventsByNewDeviceIdReducer;

  let eventsFilter = data && data.data && data.data.findDeviceById;
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = eventsFilter && eventsFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewDevicesEventsById({ page: 1, limit: recordsPerPage }));
  }, [dispatch])
  return (
    <>
      {records && records.length > 0 ?
        <>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '0px 0px 2rem 2rem' }}>
            <div className='csvImg' style={{ display: 'flex', gap: '0.5rem', justifyContent: 'end', alignItems: 'center', padding: '5px 10px 5px 0px', backgroundColor: 'rgb(152, 0, 76)' }}>
              <CSVLink title='LogCat' data={records} style={{ display: 'flex', fontSize: '0.8rem', textDecoration: 'none', color: 'white', textAlign: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline', fontSize: '0.8rem', textDecoration: 'none', color: 'white' }}>Download</span>
                <FontAwesomeIcon icon={faFileArrowDown} style={{ color: "white", height: "23px" }} />
              </CSVLink>
            </div>
            <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Device ID
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Message
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Type
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Date
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Time
                  </td>
                </tr>
              </thead>
              <tbody>
                {records && records.map((item, index) => {
                  return (
                    <tr class="bg-white border-b hover:bg-gray-50">
                      <td class="px-6 py-4 text-center font-semibold text-gray-900">
                        {item.did ? item.did : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.message ? item.message : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.type ? item.type : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.date ? item.date : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.time ? item.time : '---'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
              {incPage > 1 ?
                <button onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                  <img src={back} style={{ width: "3rem" }} />
                </button>
                : " "}
              {numbers.map((n, i) => (
                <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
              ))}
              {incPage !== totalPage ?
                <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                  <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                </button>
                : " "}
            </ul>
          </nav>
        </>
        :
        <div style={{ height: '500px', backgroundColor: 'white', width: '100%', borderRadius: '20px', boxShadow: '0px 0px 50px #00000029', background: '#FFFFFF 0% 0% no-repeat padding-box' }}>
          {records && records.length == 0 && (
            <section className={Style.noDataFound}>
              <span>
                No Data Found
              </span>
            </section>
          )}
          {loading && <span style={{ position: 'absolute', top: '50%', right: '50%' }}>Loading...</span>}
        </div>
      }
    </>
  )
  function prePage() {
    dispatch(getNewDevicesEventsById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getNewDevicesEventsById({ page: incPage + 1, limit: recordsPerPage }))
  }
}