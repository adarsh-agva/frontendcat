import React, { useEffect, useState } from 'react'
import { Navbar } from './NavBar'
import SideBar from './Sidebar'
import back from "../assets/images/back.png";
import { Link } from 'react-router-dom';
import Style from "../css/History.module.css"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { getHistoryLogsData } from "../store/action/UserProfileAction";
import { useDispatch, useSelector } from 'react-redux';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function History() {
    const getHistoryDataReducer = useSelector(
        (state) => state.getHistoryDataReducer
    );
    const { loading, data } = getHistoryDataReducer;
    const historyData = data && data.data

    const incPage = parseInt(data && data.currentPage)
    const totalPage = parseInt(data && data.totalPages)
    const [query, setQuery] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHistoryLogsData({ page: 1, limit: recordsPerPage }))
    }, [dispatch])
    const handleClickSearch = () => {
        if (query && query.length > 0) {
            dispatch(getHistoryLogsData({ page: 1, limit: recordsPerPage, searchData: query }));
        }
    }
    const handleSearchChange = (e) => {
        setQuery(e.target.value.toLowerCase())
    }
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 6;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = historyData && historyData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data && data.data.length / recordsPerPage)
    const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
    return (
        <>
            <Navbar />
            <SideBar />
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
                            marginLeft: "7%",
                            width: "90%",
                        }}
                    >
                        {/* Heading Section */}
                        <div
                            className="topHeading"
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <div
                                className="deviceSummary"
                                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                            >
                                <Link to="/">
                                    <img src={back} style={{ width: "3rem" }} />
                                </Link>
                                <h4 className={Style.Header}>History</h4>
                            </div>
                        </div>
                        <div className={Style.Container}>
                            {/* Events  */}
                            <Row className="mt-0">
                                <Col>
                                    <div className={Style.tableCard} borderRadius="20px">

                                        <>
                                            {records && records.length > 0 ?
                                                <section className={Style.OuterTable}>

                                                    <div
                                                        className={Style.insideOuterTable}
                                                    >
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
                                                                    width: "90%",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <input
                                                                    className="search_input"
                                                                    type="text"
                                                                    placeholder="Enter Email Id"
                                                                    onChange={handleSearchChange}
                                                                    style={{
                                                                        padding: "0.5rem",
                                                                        border: "0px",
                                                                        width: "100%",
                                                                    }}
                                                                />
                                                            </div>
                                                            <button style={{ backgroundColor: 'white', borderRadius: '10px', width: '3rem' }} onClick={handleClickSearch}>
                                                                <FontAwesomeIcon
                                                                    icon={faMagnifyingGlass}
                                                                    style={{
                                                                        color: "rgb(152, 0, 76)",
                                                                        padding: "0px 8px",
                                                                    }}
                                                                />
                                                            </button>
                                                        </div>
                                                        <div className={Style.insideOuterDataTable}>
                                                            <div>
                                                                <span className={Style.deviceTextData}>User Id</span>
                                                            </div>
                                                            <div>
                                                                <span className={Style.deviceTextData}>Action</span>
                                                            </div>
                                                            <div>
                                                                <span className={Style.deviceTextData}>Email</span>
                                                            </div>
                                                            <div>
                                                                <span className={Style.deviceTextData}>Message</span>
                                                            </div>
                                                            <div>
                                                                <span className={Style.deviceTextData}>
                                                                    Date
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* TABLE HERE */}
                                                    <section className={Style.tableBody}>
                                                        {records && records.map((item, index) => {
                                                            return (
                                                                <div className={Style.rowSection} key={index}>
                                                                    <div
                                                                        className={Style.insideTextData}
                                                                    >
                                                                        <h5 style={{ fontSize: '0.8rem' }}>
                                                                            {item.userId}
                                                                        </h5>
                                                                    </div>
                                                                    <div
                                                                        className={Style.insideTextData}
                                                                    >
                                                                        <h5 style={{ fontSize: '0.8rem' }}>
                                                                            {item.action}
                                                                        </h5>
                                                                    </div>
                                                                    <div
                                                                        className={Style.insideTextData}
                                                                    >
                                                                        <h5 style={{ fontSize: '0.8rem' }}>
                                                                            {item.email}
                                                                        </h5>
                                                                    </div>
                                                                    <div
                                                                        className={Style.insideTextData}
                                                                    >
                                                                        <h5 style={{ fontSize: '0.8rem' }}>
                                                                            <ReactReadMoreReadLess
                                                                                charLimit={50}
                                                                                readMoreText={"Read more ▼"}
                                                                                readLessText={"Read less ▲"}
                                                                            >
                                                                                {item.msg}
                                                                            </ReactReadMoreReadLess>

                                                                        </h5>
                                                                    </div>
                                                                    <div
                                                                        className={Style.insideTextData}
                                                                    >
                                                                        <h5 style={{ fontSize: '0.8rem' }}>
                                                                            {item.createdAt.split('T')[0]}
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </section>

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
                                                    {loading && <span style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>Loading...</span>}
                                                </section>
                                            }
                                            <nav aria-label="Page navigation example">
                                                <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
                                                    {incPage > 1 ?
                                                        <button onClick={prePage} style={{ border: "0px" }}>
                                                            <img src={back} style={{ width: "3rem" }} />
                                                        </button>
                                                        : " "}
                                                    {numbers.map((n, i) => (
                                                        <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
                                                    ))}
                                                    {incPage !== totalPage ?
                                                        <button onClick={nextPage} style={{ border: "0px" }}>
                                                            <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                                                        </button>
                                                        : " "}
                                                </ul>
                                            </nav>
                                        </>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row >

        </>
    )
    function prePage() {
        dispatch(getHistoryLogsData({ page: incPage - 1, limit: recordsPerPage }))
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        dispatch(getHistoryLogsData({ page: incPage + 1, limit: recordsPerPage }))
    }
}

export default History