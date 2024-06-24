/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Style from "../../css/DevicePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deviceAction,
  getRegisteredDetailsById,
  getRequestUserDataAction,
  getSingleDeviceIdDetails,
} from "../../store/action/DeviceAction";
import EditDetailsModal from "./model/EditDetailsModal";
import UpdateDetailsModal from "./model/UpdateDetailsModal";
import back from "../../assets/images/back.png";
import NavBarForAll from "../../utils/NavBarForAll";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Toaster, toast } from "react-hot-toast";

export default function Device() {
  const deviceReducer = useSelector((state) => state.deviceReducer);
  const { loading, data, error } = deviceReducer;
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType;


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");
  const pageCnt = urlParams.get("page");

  const incPage = parseInt(data && data.currentPage);
  const totalPage = parseInt(data && data.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPageCurrent,setNewPageCurrent]=useState(pageCnt?pageCnt:1)


  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records =data && data.data && data.data.data.slice(firstIndex, lastIndex);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);

  const page = pageCnt?pageCnt:1;
  const limit = recordsPerPage;
  useEffect(() => {
  dispatch(deviceAction(page, limit));
  dispatch(getRegisteredDetailsById(code));
  }, []);
  const [searchData,setSearchData]=useState('')
  const handleSearch = (e) => {
    setSearchData(e.target.value?e.target.value:'')
    const searchData = e.target.value;
    let pageN=searchData.length>0?page=1:page='';
    var page=pageN;
    if (e.keyCode === 13) {
      return dispatch(
        deviceAction(page, limit, searchData)
      );
    }
  }
  const [reqStatuss, setReqStatus] = useState(false);

  const [sendDataToEdit, setSendDataToEdit] = useState();
  const [deviceIDToEdit, setDeviceIdToEdit] = useState();

  return (
    <div>
      <NavBarForAll />
      <Toaster/>
      {/* <SideBar /> */}
      <Row className="rowSection">
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={Style.NavbarColumn}
          style={{ width: "100%" }}
        >
          <div
            className=""
            style={{
              position: "relative",
              top: "3.5rem",
              marginLeft: "2rem",
              width: "97%",
            }}
          >
            {/* Heading Section */}
            <div
              className="topHeading"
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  className="deviceSummary"
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Link to="/home">
                  <IoIosArrowDropleftCircle color="rgb(152, 0, 76)" size={40}/>
                  </Link>
                  <h4 className={Style.Header}>Device Summary</h4>
                </div>
                <div>
                  <h5 className={Style.heading}>Device: {projectName}</h5>
                </div>
              </div>
            </div>
            <div className={Style.Container}>
              {/* Events  */}
              <Row className="mt-0">
                <Col>
                  <div className={Style.tableCard} borderRadius="20px">
                    <>
                      <section className={Style.OuterTable}>
                        <div className={Style.insideOuterTable}>
                          <div
                            className="search_section"
                            style={{ display: "flex", gap: "3rem" }}
                          >
                            <div
                              className="input_section"
                              style={{
                                display: "flex",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                width: "100%",
                                alignItems: "center",

                              }}
                            >
                              <input
                                className="search_input"
                                type="text"
                                placeholder="Enter Details"
                                onChange={(e) => {
                                  if (e.target.value === '') {
                                    const limit = recordsPerPage;
                                    const page = 1;
                                    const searchData = '';
                                    dispatch(
                                      deviceAction(page, limit, searchData)
                                    );
                                  }
                                }}
                                onKeyUp={handleSearch}
                                style={{
                                  padding: "0.8rem",
                                  border: "0px",
                                  width: "100%",
                                }}
                              />
                            </div>
                          </div>
                          <div className={Style.deviceDataText}>
                            <div>
                              <span className={Style.deviceTextData}>
                                Device ID
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Status
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Serial Number
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Last Active
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Hospital Name
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Date of dispatch
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Doctor
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Purpose
                              </span>
                            </div>
                            <div>
                              <span className={Style.deviceTextData}>
                                Actions
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* TABLE HERE */}
                        {records?.length > 0 ? (
                          <section className={Style.alertTable}>
                            <div>
                              {records?.filter(
                                    (item, index) =>
                                      records.findIndex(
                                        (obj) => obj.deviceId === item.deviceId
                                      ) === index
                                  )
                                  .map((item, _id) => {
                                    return (
                                      <React.Fragment key={_id}>
                                        <section className={Style.tableBody}>
                                          <section
                                            className={Style.insideTextData}
                                          >
                                            {item.deviceId}
                                          </section>
                                          <section
                                            className={Style.insideTextData}
                                          >
                                            {item.message == "ACTIVE" ? (
                                              <>
                                                <svg
                                                  width="40px"
                                                  height="35px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  stroke="#11ac14"
                                                >
                                                  <g id="SVGRepo_iconCarrier">
                                                    <path
                                                      d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                                                      fill="#11ac14"
                                                    ></path>
                                                  </g>
                                                </svg>
                                              </>
                                            ) : item.message == "INACTIVE" ? (
                                                <svg
                                                  width="40px"
                                                  height="40px"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  stroke="#ffbf00"
                                                >
                                                  <g
                                                    id="SVGRepo_bgCarrier"
                                                    stroke-width="0"
                                                  ></g>
                                                  <g
                                                    id="SVGRepo_tracerCarrier"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                  ></g>
                                                  <g id="SVGRepo_iconCarrier">
                                                    {" "}
                                                    <path
                                                      d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
                                                      fill="#ffbf00"
                                                    ></path>{" "}
                                                  </g>
                                                </svg>
                                            ) : (
                                              "--"
                                            )}
                                          </section>
                                          <section
                                            className={Style.insideTextData}
                                          >
                                            {item?.serialNumber ? item?.serialNumber : '--'}
                                          </section>
                                          <section
                                            className={Style.insideTextData}
                                          >
                                            {/* {item?.deviceInfo?.length > 0
                                              ? item?.lastActive : "--"} */}
                                              {item?.deviceInfo?.length > 0
                                              ? item.message == "INACTIVE"? item?.lastActive : "--":'---'}
                                          </section>
                                          <section
                                            className={Style.insideTextData}
                                          >
                                            {item?.deviceInfo?.length > 0
                                              ? item &&
                                              item.deviceInfo[0] &&
                                              item.deviceInfo[0].Hospital_Name
                                              : "--"}
                                          </section>
                                          <section
                                            className={Style.insideTextData}
                                          >
                                            {item?.deviceInfo?.length > 0
                                              ? item?.dispatchDate?.split('-').reverse().join('-')
                                              : "--"}
                                          </section>
                                          <section
                                            className={Style.insideTextData}
                                          >
                                            {item?.deviceInfo?.length > 0
                                              ? item &&
                                              item.deviceInfo[0] &&
                                              item.deviceInfo[0].Doctor_Name
                                              : "--"}
                                          </section>
                                          <section
                                            className={Style.insideTextData}
                                          >
                                            {item?.purpose ? item?.purpose : '--'}
                                          </section>
                                          <section
                                            className="buttonDiv"
                                            style={{ display: "flex" }}
                                          >
                                            <div
                                              class="px-4 py-1"
                                              style={{
                                                padding: "1px",
                                                margin: "1px",
                                              }}
                                            >
                                              {adminProfile == "User" ||
                                                adminProfile == "Doctor" ||
                                                adminProfile == "Assistant" ? (
                                                item &&
                                                  item.deviceInfo &&
                                                  item.deviceInfo.length > 0 ? (
                                                  <>
                                                    {item?.isAssigned ===
                                                      'Accepted' ? (
                                                      <span class="block text-sm text-gray-900 ">
                                                        <button
                                                          title="More"
                                                          onClick={() => {
                                                            navigate(
                                                              `/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${item.deviceId}&page=${newPageCurrent}`
                                                            );
                                                          }}
                                                          style={{
                                                            width: "9rem",
                                                            backgroundColor:
                                                              "rgb(152, 0, 76)",
                                                          }}
                                                          class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                                        >
                                                          More
                                                        </button>
                                                      </span>
                                                    ) : item?.isAssigned ===
                                                    'Request' ? (
                                                      <span class="block text-sm text-gray-900 ">
                                                        <button
                                                          title="Req"
                                                          onClick={() => {
                                                            if(item?.deviceId){
                                                              dispatch(
                                                                getRequestUserDataAction(
                                                                  item.deviceId
                                                                )
                                                              );
                                                              setReqStatus(true);
                                                              return toast.success('Request sent')
                                                            }
                                                          }}
                                                          style={{
                                                            width: "9rem",
                                                            backgroundColor:
                                                              "#808080",
                                                          }}
                                                          class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                                        >
                                                          Request
                                                        </button>
                                                      </span>
                                                    ):<span class="block text-sm text-gray-900 ">
                                                    <button
                                                      title="Req"
                                                      style={{
                                                        width: "9rem",
                                                        backgroundColor:
                                                          "#ffaa1d",
                                                      }}
                                                      class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                                    >
                                                      Pending
                                                    </button>
                                                  </span>}
                                                  </>
                                                ) : (
                                                  ""
                                                )
                                              ) : adminProfile ==
                                                "Hospital-Admin" ? (
                                                <span class="block text-sm text-gray-900 ">
                                                  <button
                                                    title="More"
                                                    onClick={() => {
                                                      navigate(
                                                        `/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${item.deviceId}&page=${newPageCurrent}`
                                                      );
                                                    }}
                                                    style={{
                                                      width: "9rem",
                                                      backgroundColor:
                                                        "rgb(152, 0, 76)",
                                                    }}
                                                    class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                                  >
                                                    More
                                                  </button>
                                                </span>
                                              ) : item &&
                                                item.deviceInfo &&
                                                item.deviceInfo.length > 0 ? (
                                                <>
                                                  {/* edit */}
                                                  <span class="block text-sm text-gray-900 ">
                                                    <button
                                                      title="Edit"
                                                      onClick={(e) => {
                                                        setModalShow1(true);
                                                        setSendDataToEdit(item);
                                                        setDeviceIdToEdit(
                                                          item.deviceId
                                                        );
                                                        dispatch(
                                                          getSingleDeviceIdDetails(
                                                            item.deviceId
                                                          )
                                                        );
                                                        {
                                                          localStorage.setItem(
                                                            "item1",
                                                            JSON.stringify(item)
                                                          );
                                                        }
                                                      }}
                                                      style={{
                                                        width: "9rem",
                                                        backgroundColor:
                                                          "#98004c",
                                                      }}
                                                      class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                                    >
                                                      Edit
                                                    </button>
                                                  </span>
                                                  {/* more */}
                                                  <span class="block text-sm text-gray-900 ">
                                                    <button
                                                      title="More"
                                                      onClick={() => {
                                                        navigate(
                                                          `/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${item.deviceId}&page=${newPageCurrent}`
                                                        );
                                                      }}
                                                      style={{
                                                        width: "9rem",
                                                        backgroundColor:
                                                          "#98004c",
                                                      }}
                                                      class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                                    >
                                                      More
                                                    </button>
                                                  </span>
                                                </>
                                              ) : (
                                                // register
                                                <span class="block text-sm text-gray-900 ">
                                                  <button
                                                    type="Register"
                                                    onClick={() => {
                                                      setModalShow(true);
                                                      {
                                                        item;
                                                      }
                                                      localStorage.setItem(
                                                        "DeviceId",
                                                        JSON.stringify(
                                                          item.deviceId
                                                        )
                                                      );
                                                    }}
                                                    style={{
                                                      width: "9rem",
                                                      backgroundColor:
                                                        "#98004c",
                                                    }}
                                                    class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                                  >
                                                    Register
                                                  </button>
                                                </span>
                                              )}
                                            </div>
                                          </section>
                                        </section>
                                      </React.Fragment>
                                    );
                                  })}
                            </div>
                          </section>
                        ) :
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
                      </section>
                      <UpdateDetailsModal
                        show={modalShow1}
                        onHide={() => setModalShow1(false)}
                        {...sendDataToEdit}
                        devicdId={deviceIDToEdit}
                      />
                      <EditDetailsModal
                        show={modalShow}
                        projectName={projectName}
                        onHide={() => setModalShow(false)}
                        {...sendDataToEdit}
                        item={JSON.parse(localStorage.getItem("DeviceId"))}
                      />
                    </>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <div
        className="left_arrow"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "4rem 4rem 0rem 0rem",
        }}
      >
        <nav aria-label="Page navigation example">
          <ul
            class="pagination justify-content-end"
            style={{ display: "flex", alignItems: "center" }}
          >
            {incPage > 1 ? (
              <button
                onClick={prePage}
                style={{ border: "0px", backgroundColor: "white" }}
              >
                <img src={back} style={{ width: "3rem" }} />
              </button>
            ) : (
              " "
            )}
            {!error && !loading ?
              incPage !== totalPage ? (
                <button
                  onClick={nextPage}
                  style={{ border: "0px", backgroundColor: "white" }}
                >
                  <img
                    src={back}
                    style={{ width: "3rem", transform: "rotate(180deg)" }}
                  />
                </button>
              ) : (
                " "
              ) : ''}
          </ul>
        </nav>
      </div>
    </div>
  );
  function prePage() {
    const page = incPage - 1;
    const limit = recordsPerPage;
    setNewPageCurrent(page)
    dispatch(deviceAction(page, limit,searchData));
  }
  function nextPage() {
    const page = incPage + 1
    const limit = recordsPerPage;
    setNewPageCurrent(page)
    dispatch(deviceAction(page, limit,searchData));
  }
}
