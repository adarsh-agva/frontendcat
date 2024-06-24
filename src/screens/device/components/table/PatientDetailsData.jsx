import React, { useEffect, useState } from 'react';
import back from "../../../../assets/images/back.png";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Style from '../../../../css/deviceCalibration.module.css';
import { getPatientDetails, getPatientDetailsByUhid } from '../../../../store/action/DeviceAction';
import { useNavigate, useNavigation } from 'react-router';
import { Button, Modal } from 'flowbite-react';
export default function PatientDetailsData() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const getPatientDetailsReducer = useSelector((state) => state.getPatientDetailsReducer);
  const { loading, data } = getPatientDetailsReducer;

  const getPatientDetailsByUhidReducer = useSelector((state) => state.getPatientDetailsByUhidReducer);
  const { data: dataa } = getPatientDetailsByUhidReducer;

  useEffect(() => {
    dispatch(getPatientDetailsByUhid())
  }, [])


  const [openModal, setOpenModal] = useState();
  const [detailsData, setDetailsData] = useState()
  const props = { openModal, setOpenModal };
  let calibrationFilter = data;
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPatientDetails()
    )
  }, ([]))
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = calibrationFilter && calibrationFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  return (
    <>
      {records && records.length > 0 ?
        <>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '0px 0px 2rem 2rem' }}>
            <table class="w-full text-sm text-left text-gray-500 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    UHID
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Patient Name
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Details
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Action
                  </td>
                </tr>
              </thead>
              <tbody>
                {records && records.map((item1, index) => {
                  return (
                    <tr class="bg-white border-b hover:bg-gray-50">
                      <td class="px-6 py-4 text-center font-semibold text-gray-900">
                        {item1.UHID ? item1.UHID : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item1.patientName ? item1.patientName : '---'}
                      </td>
                      <td class="px-6 py-4 text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => {
                          (props.setOpenModal('default'))
                          setDetailsData(item1.details)
                          const uhid = item1.UHID
                          dispatch(getPatientDetailsByUhid(uhid))
                        }
                        }>View</Button>
                        <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                          <Modal.Header style={{ padding: '1rem' }}>Patient Details</Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6">
                              <p className="text-base leading-relaxed text-gray-500">
                                UHID: {dataa && dataa.UHID ? dataa.UHID : '- -'}
                              </p>
                              <p className="text-base leading-relaxed text-gray-500">
                                Patient Name: {dataa && dataa.patientName ? dataa.patientName : '- - -'}
                              </p>
                              <p className="text-base leading-relaxed text-gray-500">
                                Patient Age: {dataa && dataa.age ? dataa.age : '- - -'}
                              </p>
                              <p className="text-base leading-relaxed text-gray-500">
                                Patient Height: {dataa && dataa.height ? dataa.height : '- - -'}
                              </p>
                              <p className="text-base leading-relaxed text-gray-500">
                                Patient Weight: {dataa && dataa.weight ? dataa.weight : '- - -'}
                              </p>
                              <p className="text-base leading-relaxed text-gray-500">
                                Dosage Provided: {dataa && dataa.dosageProvided ? dataa.dosageProvided : '- - -'}
                              </p>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </td>
                      <td class="px-6 py-4 text-center ">
                        <button
                          onClick={() => navigate(`/patientDetails?uhId=${item1.UHID}&deviceId=${item1.deviceId}`)}
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
                        >More</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
    dispatch(getPatientDetails({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getPatientDetails({ page: incPage + 1, limit: recordsPerPage }))
  }
}