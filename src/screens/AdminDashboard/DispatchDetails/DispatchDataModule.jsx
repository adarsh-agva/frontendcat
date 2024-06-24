"use client";
import React, { useEffect } from "react";
import { Navbar } from "../../../utils/NavBar";
import SideBar from "../../../utils/Sidebar";
import Style from "../../../css/DeviceDispatchModule.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import back from "../../../assets/images/back.png";
import TableCard1 from "../../../container/TableCard1";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import { getCompleteDispatchedDataAction } from "../../../store/action/DispatchDetailsAction";
import { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarForAll from "../../../utils/NavBarForAll";
import { CSVLink } from "react-csv";
function DispatchDataModule() {
  const [openModal, setOpenModal] = useState(false);
  const [returnDevice, setReturnDevice] = useState(false);

  const getCompleteDispatchedReducer = useSelector(
    (state) => state.getCompleteDispatchedReducer
  );
  const { loading, data ,error} = getCompleteDispatchedReducer;
  const getDispatchData = data && data.data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getCompleteDispatchedDataAction({ page: 1, limit: recordsPerPage })
    );
  }, []);
  const history = useNavigate();

  const incPage = parseInt(data && data.currentPage);
  const totalPage = parseInt(data && data.totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records =
    getDispatchData && getDispatchData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage);
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1);
  const navigate = useNavigate();

  const headersData = [
    { label: "Serial Number", key: "serialNumber" },
    { label: "Device Id", key: "deviceId" },
    { label: "Product Type", key: "productType" },
    { label: "Hospital Name", key: "hospitalName" },
    { label: "Batch Number", key: "batchNumber" },
    { label: "PO Number", key: "document_no" },
    { label: "Purpose", key: "purpose" },
    { label: "Marketing Lead", key: "marketing_lead" },
    { label: "So File", key: "soPdfFile" },
  ];

  const [query, setQuery] = useState("");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const handleClickSearch = () => {
    if (query && query.length > 0) {
      dispatch(
        getCompleteDispatchedDataAction({
          page: 1,
          limit: recordsPerPage,
          searchData: query,
        })
      );
    } else {
    }
  };


  const [navDeviceId, setNavDeviceId] = useState();
  const [navSerialNo, setNavSerialNo] = useState();
  const [navProduct, setNavProduct] = useState();


  const handleSearch=(e)=>{
    const searchData=e.target.value;
    if (e.keyCode === 13) {
     return dispatch(
      getCompleteDispatchedDataAction({ page:1, limit:recordsPerPage, searchData} )
      );
    }
  }

  return (
    <div>
      {/* <NavBarForAll /> */}
      <Row className="rowSection">
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={Style.NavbarColumn}
          style={{ width: "100%" }}
        >
          <div className={Style.mainDiv}>
            {/* Heading Section */}
            <div className={Style.topHeading}></div>
            {/* Events  */}
            
                <div
                  class="relative overflow-x-auto shadow-md sm:rounded-lg"
                  style={{ borderRadius: "1.5rem" }}
                >
                  <div className="search_section" style={{ display: "flex" }}>
                    <div
                      className="input_section"
                      style={{
                        display: "flex",
                        backgroundColor: "rgb(152, 0, 76)",
                        width: "100%",
                        padding: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <input
                        className="search_input"
                        type="text"
                        placeholder="Search device"
                        style={{
                          padding: "0.7rem",
                          border: "0px",
                          width: "100%",
                        }}
                        onChange={(e)=>{if(e.target.value===''){
                          setQuery(e.target.value.toLowerCase())
                          const limit=recordsPerPage;
                          const page=1;
                          const searchData='';
                          dispatch(
                            getCompleteDispatchedDataAction( {page, limit, searchData} )
                          );
                        }}}
                        onKeyUp={handleSearch}
                      />
                      {/* <CSVLink
                        asyncOnClick={true}
                        data={getDispatchData?getDispatchData:''}
                        headers={headersData}
                        separator={","}
                      >
                        <FontAwesomeIcon
                          icon={faFileArrowDown}
                          style={{ color: "white", height: "23px",padding:"5px" }}
                        />
                      </CSVLink> */}
                    </div>
                  </div>
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <td
                          scope="col"
                          class="px-6 py-3 text-center text-white text-4xl font-semibold"
                          style={{ backgroundColor: "rgb(152, 0, 76)" }}
                        >
                          Serial No.
                        </td>
                        <td
                          scope="col"
                          class="px-6 py-3 text-center text-white text-4xl font-semibold"
                          style={{ backgroundColor: "rgb(152, 0, 76)" }}
                        >
                          Device ID
                        </td>
                        <td
                          scope="col"
                          class="px-6 py-3 text-center text-white text-4xl font-semibold"
                          style={{ backgroundColor: "rgb(152, 0, 76)" }}
                        >
                          Product Type
                        </td>
                        <td
                          scope="col"
                          class="px-6 py-3 text-center text-white text-4xl font-semibold"
                          style={{ backgroundColor: "rgb(152, 0, 76)" }}
                        >
                          Hospital Name
                        </td>
                        <td
                          scope="col"
                          class="px-6 py-3 text-center text-white text-4xl font-semibold"
                          style={{ backgroundColor: "rgb(152, 0, 76)" }}
                        >
                          Batch No.
                        </td>
                        <td
                          scope="col"
                          class="px-6 py-3 text-center text-white text-4xl font-semibold"
                          style={{ backgroundColor: "rgb(152, 0, 76)" }}
                        >
                          PO Number
                        </td>
                        <td
                          scope="col"
                          class="px-6 py-3 text-center text-white text-4xl font-semibold"
                          style={{ backgroundColor: "rgb(152, 0, 76)" }}
                        >
                          Purpose
                        </td>
                        <td
                          scope="col"
                          class="px-6 py-3 text-center text-white text-4xl font-semibold"
                          style={{ backgroundColor: "rgb(152, 0, 76)" }}
                        >
                          Action
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {records?.length>0?
                      (records?.map((item1, index) => {
                          return (
                            <tr class="bg-white border-b hover:bg-gray-50">
                              <td class="px-6 py-4 text-center  font-semibold text-gray-900">
                                {item1.serialNumber ? item1.serialNumber : "NA"}
                              </td>
                              <td class="px-6 py-4 text-center">
                                {item1.deviceId ? item1.deviceId : "NA"}
                              </td>
                              <td class="px-6 py-4 text-center ">
                                {item1.productType ? item1.productType : "NA"}
                              </td>

                              <td class="px-6 py-4 text-center ">
                                {item1.hospitalName ? item1.hospitalName : "NA"}
                              </td>
                              <td class="px-6 py-4 text-center ">
                                {item1.batchNumber ? item1.batchNumber : "NA"}
                              </td>
                              <td class="px-6 py-4 text-center ">
                                {item1.document_no ? item1.document_no : "NA"}
                              </td>
                              <td class="px-6 py-4 text-center ">
                                {item1.purpose ? item1.purpose : "NA"}
                              </td>
                              <td class="px-6 py-4 text-center ">
                                <button
                                  onClick={() => {
                                    setNavDeviceId(item1.deviceId);
                                    setNavSerialNo(item1.serialNumber);
                                    setNavProduct(item1.productType);
                                    setReturnDevice(item1.return);
                                    setOpenModal(true);
                                  }}
                                  style={{
                                    textDecoration: "none",
                                    backgroundColor: "rgb(152, 0, 76)",
                                    color: "white",
                                    padding: "10px",
                                    width: "5vw",
                                    borderRadius: "5px",
                                  }}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })):
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
                        {error  && (
                          <div
                            style={{
                              width: "100%",
                              position:'absolute',
                              top:'50%',
                              textAlign:'center'
                            }}
                          >
                            <h6>{error}</h6>
                          </div>
                        )}
                      </div>
}
                    </tbody>
                  </table>
                </div>
                <Modal   dismissible show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <button
                      style={{ height: "1rem" }}
                      onClick={() => setOpenModal(false)}
                    >
                      <AiOutlineClose />
                    </button>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="text-center">
                      <h3 className="mb-5 text-sm font-small text-gray-500 dark:text-gray-400">
                        Please select an option to view data.
                      </h3>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => {
                            navigate(`/dispatchModel?serialNo=${navSerialNo}`);
                          }}
                          style={{
                            textDecoration: "none",
                            backgroundColor: "rgb(152, 0, 76)",
                            color: "white",
                            padding: "10px",
                            borderRadius: "8px",
                          }}
                        >
                          View all data
                        </button>
                        <button
                          onClick={() => {
                            navigate(
                              `/singleDispatchDataModule?deviceId=${navDeviceId}`
                            );
                          }}
                          style={{
                            backgroundColor: "white",
                            border: "0.5px solid gray",
                            color: "black",
                            padding: "10px",
                            borderRadius: "8px",
                          }}
                        >
                          Track device histroy
                        </button>
                        <button
                          onClick={() => {
                            navigate(
                              `/returnFormModule?deviceId=${navDeviceId}&serialNo=${navSerialNo}&product=${navProduct}`
                            );
                          }}
                          style={{
                            backgroundColor: "white",
                            border: "0.5px solid gray",
                            color: "black",
                            padding: "10px",
                            borderRadius: "8px",
                          }}
                        >
                          Return device
                        </button>
                        {returnDevice === "true" ? (
                          <button
                            onClick={() => {
                              navigate(
                                `/previousHistoryData?deviceId=${navDeviceId}`
                              );
                            }}
                            style={{
                              backgroundColor: "white",
                              border: "0.5px solid gray",
                              color: "black",
                              padding: "10px",
                              borderRadius: "8px",
                            }}
                          >
                            Previous History
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                <nav aria-label="Page navigation example">
                  <ul
                    class="pagination justify-content-end"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {incPage > 1 ? (
                      <Link
                        onClick={prePage}
                        style={{ border: "0px", backgroundColor: "white" }}
                      >
                        <img src={back} style={{ width: "3rem" }} />
                      </Link>
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
                    ):''}
                  </ul>
                </nav>
              
          </div>
        </Col>
      </Row>
    </div>
  );
  function prePage() {
    dispatch(
      getCompleteDispatchedDataAction({
        page: incPage - 1,
        limit: recordsPerPage,
      })
    );
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    dispatch(
      getCompleteDispatchedDataAction({
        page: incPage + 1,
        limit: recordsPerPage,
      })
    );
  }
}

export default DispatchDataModule;
