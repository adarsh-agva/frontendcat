import React, { useEffect, useState } from 'react'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import Style from "../../css/ServiceRecords.module.css";
import { Row, Col } from "react-bootstrap";
import TableCard1 from "../../container/TableCard1";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'flowbite-react';
import { getServiceRecordsById, getSingleUploadFile } from "../../store/action/DeviceAction"
import ReactReadMoreReadLess from "react-read-more-read-less";
import NavBarForAll from '../../utils/NavBarForAll';
function Services() {
  const getAllServiceRecordsDetails = useSelector((state) => state.getAllServiceRecordsDetails);
  const { loading, data ,error} = getAllServiceRecordsDetails;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const did = urlParams.get('DeviceId')
  const code = urlParams.get('code');
  let calibrationFilter = data;
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getServiceRecordsById(
        { data, did, code, page: 1, limit: recordsPerPage }
      )
    )
  }, ([]))
  const goBack = () => {
    window.history.go(-1)
  }
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = calibrationFilter && calibrationFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  const deviceId = did
  useEffect(() => {
    dispatch(getSingleUploadFile(deviceId))
  }, [dispatch])
  return (
    <div>
      <NavBarForAll />
      <div
        className=""
        style={{
          position: "relative",
          top: "6rem",
          marginLeft: "1%",
          width: "98%",
        }}
      >
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className={Style.deviceSummary}
          >
            <Link onClick={goBack}>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4 className={Style.Header}>Service Records</h4>
          </div>
        </div>
        <div className={Style.Container}>
          {/* Events  */}
          <Row className="mt-0">
            <Col>
              <TableCard1 borderRadius="20px">
                <div
                  className={Style.insideOuterTable}
                >
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "space-around",
                      padding: "20px",
                    }}
                  >
                    <div>
                      <h6 className={Style.insideHeadingData}>Device Id</h6>
                    </div>
                    <div>
                      <h6 className={Style.insideHeadingData}>Message</h6>
                    </div>
                    <div>
                      <h6 className={Style.insideHeadingData}>Serial No.</h6>
                    </div>
                    <div>
                      <h6 className={Style.insideHeadingData}>Time</h6>
                    </div>
                    <div>
                      <h6 className={Style.insideHeadingData}>Records</h6>
                    </div>
                  </div>
                </div>
                {/* TABLE HERE */}
                <div
                  className={Style.lowerData}
                >
                  {records?.length > 0 ?
                    <div className={Style.tableBody}>
                      {records && records.map((item, _id) => {
                        return (
                          <React.Fragment key={_id}>
                            <div className={Style.userDataDiv}>
                              <div
                              >
                                <h6 className={Style.userInsideData}>{item.deviceId}</h6>
                              </div>
                              <div
                              >
                                <h6 className={Style.userInsideData}>
                                  <ReactReadMoreReadLess
                                    charLimit={200}
                                    readMoreText={"Read more ▼"}
                                    readLessText={"Read less ▲"}
                                  >
                                    {item.message}
                                  </ReactReadMoreReadLess>
                                </h6>
                              </div>
                              <div>
                                <h6 className={Style.userInsideData}>{item.serialNo}</h6>
                              </div>
                              <div>
                                <h6 className={Style.userInsideData}>{item.date.split('T')[0]}</h6>
                              </div>
                              <div>
                                <h6 className={Style.userInsideData}>
                                  {!item.location ? '' :
                                    <Link to={item.location} style={{ textDecoration: 'none' }}>
                                      <Button>Service Reports</Button>
                                    </Link>
                                  }
                                </h6>
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
                          </React.Fragment>
                        )
                      })}

                    </div>
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
              </TableCard1>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
  function prePage() {
    dispatch(getServiceRecordsById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getServiceRecordsById({ page: incPage + 1, limit: recordsPerPage }))
  }
}
export default Services

