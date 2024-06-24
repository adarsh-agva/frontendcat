/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Style from "../../css/UserDevicePageModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import SpinnerCustom from "../../container/SpinnerCustom";
import {
    deviceAction,
    getRegisteredDetailsById,
    getRequestUserDataAction,
    getSingleDeviceIdDetails,
    getUserDeviceAction,
} from "../../store/action/DeviceAction";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import EditDetailsModal from "./model/EditDetailsModal";
import UpdateDetailsModal from "./model/UpdateDetailsModal"
import back from "../../assets/images/back.png";
import download from "../../assets/images/download.png";
import { toast } from "react-hot-toast";
import NavBarForAll from "../../utils/NavBarForAll";

export default function UserDevice() {
    const [query, setQuery] = useState("");

    const getUserDataReducer = useSelector((state) => state.getUserDataReducer);
    const { loading, data } = getUserDataReducer;
    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType
    const incPage = parseInt(data && data.currentPage)
    const totalPage = parseInt(data && data.totalPages)
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 20;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data && data.data && data.data.data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data && data.data && data.data.data.length / recordsPerPage)

    const [reqBtnChange, setReqBtnChange] = useState('Request')
    const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
    useEffect(() => {
        dispatch(getRegisteredDetailsById(code));
    }, []);
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    const projectName = urlParams.get("name");
    useEffect(() => {
        dispatch(getUserDeviceAction({ page: 1, limit: recordsPerPage }));
    }, [dispatch]);
    const handleClickSearch = () => {
        if (query && query.length > 0) {
            dispatch(getUserDeviceAction({ page: 1, limit: recordsPerPage, searchData: query }));
        }
        else {

        }
    }
    const handleSearchChange = (e) => {
        setQuery(e.target.value.toLowerCase())
    }

    return (
        <div>
            <NavBarForAll />
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
                            width: "100%",
                        }}
                    >
                        {/* Heading Section */}
                        <div
                            className="topHeading"
                            style={{ display: "flex", flexDirection: "column", marginTop: '2rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                                <div
                                    className="deviceSummary"
                                    style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                                >
                                    <Link to="/home">
                                        <img src={back} style={{ width: "3rem" }} />
                                    </Link>
                                    <h4 className={Style.Header}>Device Summary</h4>
                                </div>
                                <div>
                                    <h5 className={Style.heading}>Device: <span>{projectName}</span></h5>
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
                                                <div
                                                    className={Style.insideOuterTable}
                                                >
                                                    <div
                                                        className="search_section"
                                                        style={{ display: "flex" }}
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
                                                                placeholder="Enter Device ID"
                                                                onChange={handleSearchChange}
                                                                style={{
                                                                    padding: "0.5rem",
                                                                    border: "0px",
                                                                    width: "100%",
                                                                }}
                                                            />
                                                            <button className={Style.searchBtn} onClick={handleClickSearch}>
                                                                <FontAwesomeIcon
                                                                    icon={faMagnifyingGlass}
                                                                    style={{
                                                                        color: "#ffff",
                                                                        padding: "0px 8px",
                                                                    }}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={Style.deviceDataText}
                                                    >
                                                        <div>
                                                            <span className={Style.deviceTextData}>Device ID</span>
                                                        </div>
                                                        <div>
                                                            <span className={Style.deviceTextData}>Status</span>
                                                        </div>
                                                        <div>
                                                            <span className={Style.deviceTextData}>Name</span>
                                                        </div>
                                                        <div>
                                                            <span className={Style.deviceTextData}>Department</span>
                                                        </div>
                                                        <div>
                                                            <span className={Style.deviceTextData}>
                                                                Hospital Name
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className={Style.deviceTextData}>Ward No.</span>
                                                        </div>
                                                        {/* <div>
                                                            <span className={Style.deviceTextData}>Doctor</span>
                                                        </div> */}
                                                        <div>
                                                            <span className={Style.deviceTextData}>Bio-Med</span>
                                                        </div>
                                                        <div>
                                                            <span className={Style.deviceTextData}>Actions</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* TABLE HERE */}
                                                {records && records.length > 0 ?
                                                    <section className={Style.alertTable}>

                                                        <div>
                                                            {records &&
                                                                records
                                                                    .filter(
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
                                                                                            <>
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
                                                                                            </>
                                                                                        ) : (
                                                                                            ""
                                                                                        )}
                                                                                    </section>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {item && item.deviceInfo && item.deviceInfo[0] && item.deviceInfo[0].Alias_Name.length > 0 ? item && item.deviceInfo[0] && item.deviceInfo[0].Alias_Name : "--"}
                                                                                    </section>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {item && item.deviceInfo && item.deviceInfo.length > 0 ? item && item.deviceInfo[0] && item.deviceInfo[0].Department_Name : "--"}
                                                                                    </section>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {item && item.deviceInfo && item.deviceInfo.length > 0 ? item && item.deviceInfo[0] && item.deviceInfo[0].Hospital_Name : "--"}
                                                                                    </section>
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {item && item.deviceInfo && item.deviceInfo.length > 0 ? item && item.deviceInfo[0] && item.deviceInfo[0].Ward_No : "--"}
                                                                                    </section>
                                                                                    {/* <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {item && item.deviceInfo && item.deviceInfo.length > 0 ? item && item.deviceInfo[0] && item.deviceInfo[0].Doctor_Name : "--"}
                                                                                    </section> */}
                                                                                    <section
                                                                                        className={Style.insideTextData}
                                                                                    >
                                                                                        {item && item.deviceInfo && item.deviceInfo.length > 0 ? item && item.deviceInfo[0] && item.deviceInfo[0].Bio_Med : "--"}
                                                                                    </section>
                                                                                    <section
                                                                                        className="buttonDiv" style={{ display: 'flex' }}
                                                                                    >
                                                                                        <div class="px-4 py-1" style={{ padding: '1px', margin: '1px' }}>
                                                                                            {
                                                                                                item && item.deviceInfo && item.deviceInfo.length > 0 ?
                                                                                                    item && item.isAssigned === 'Accepted' ?
                                                                                                        <span class="block text-sm text-gray-900 dark:text-white">
                                                                                                            <button
                                                                                                                title="More"
                                                                                                                onClick={() => {
                                                                                                                    navigate(
                                                                                                                        `/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${item.deviceId}`
                                                                                                                    );
                                                                                                                }} style={{ width: '8rem', backgroundColor: 'rgb(152, 0, 76)' }} class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">More</button>
                                                                                                        </span>
                                                                                                        :
                                                                                                        <span class="block text-sm text-gray-900 dark:text-white">
                                                                                                            <button
                                                                                                                title="Request"
                                                                                                                onClick={() => {
                                                                                                                    const deviceId = item.deviceId
                                                                                                                    dispatch(getRequestUserDataAction(deviceId))
                                                                                                                    setReqBtnChange(item && item.isAssigned === 'Rejected' ? 'Pending' : 'Request')
                                                                                                                }} style={reqBtnChange == 'Pending' ? { width: '8rem', color: 'black', backgroundColor: 'grey' } : { width: '8rem', backgroundColor: 'rgb(152, 0, 76)' }} class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">{reqBtnChange}</button>
                                                                                                        </span>
                                                                                                    : ''
                                                                                            }
                                                                                        </div>
                                                                                    </section>
                                                                                </section>
                                                                            </React.Fragment>
                                                                        );
                                                                    })}
                                                        </div>
                                                    </section>
                                                    :
                                                    <section style={{ width: '100%', height: '100%', marginTop: '10rem', marginBottom: '10rem' }}>
                                                        {records && records.length == 0 && (
                                                            <section className={Style.noDataFound}>
                                                                <span>
                                                                    No Data Found
                                                                </span>
                                                            </section>
                                                        )}
                                                    </section>
                                                }
                                                {loading && <SpinnerCustom />}
                                            </section>
                                        </>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <div
                className="left_arrow" style={{ display: "flex", justifyContent: "flex-end", margin: "4rem 4rem 0rem 0rem" }}
            >
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
                        {incPage > 1 ?
                            <Link onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                                <img src={back} style={{ width: "3rem" }} />
                            </Link>
                            : " "}
                        {numbers.map((n, i) => (
                            <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
                        ))}
                        {incPage !== totalPage ?
                            <Link onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                                {/* {recordsPerPage < 19 ?
                  <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                  : ''} */}
                                <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                            </Link>
                            : " "}
                    </ul>
                </nav>
            </div>
        </div>
    );
    function prePage() {
        dispatch(deviceAction({ page: incPage - 1, limit: recordsPerPage }))
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        dispatch(deviceAction({ page: incPage + 1, limit: recordsPerPage }))
    }
}