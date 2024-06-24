import React from 'react'
import { Navbar } from '../../../utils/NavBar'
import SideBar from '../../../utils/Sidebar'
import { Col, Container } from "react-bootstrap";
import CustomCard from "../../../container/CustomCard";
import { Link } from "react-router-dom";
import production from "../../../assets/icons/Production.png"
import productionList from "../../../assets/icons/production-2.png"
function ServiceEng() {
    return (
        <>
            <Container>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '5%', flexWrap:'wrap' }} className="rowSection">
                    <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
                        <CustomCard
                            padding="15px"
                            height="200px"
                            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
                        >
                            <Link
                                to="/supportForm"
                                style={{ textDecoration: "none" }}
                            >
                                <div
                                    className="project-cart"
                                    style={{
                                        backgroundColor: "white",
                                        padding: "2rem",
                                        borderRadius: "5px",
                                        width: "100%",
                                    }}
                                >
                                    <div className="d-flex" style={{ justifyContent:'space-between' }}>
                                        <img
                                            src={production}
                                            style={{ height: "6rem" }}
                                            alt="AgvaVenti"
                                        />
                                        <div
                                            className="d-flex"
                                            style={{
                                                gap: "1rem",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div>
                                                <h6 style={{ color: "#707070", fontSize: "1.5rem" }}>
                                                    Assign Ticket
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </CustomCard>

                    </Col>
                    <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
                        <CustomCard
                            padding="15px"
                            height="200px"
                            boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
                        >
                            <Link
                                to="/Support_eng_data_module"
                                style={{ textDecoration: "none" }}
                            >
                                <div
                                    className="project-cart"
                                    style={{
                                        backgroundColor: "white",
                                        padding: "2rem",
                                        borderRadius: "5px",
                                        width: "100%",
                                    }}
                                >
                                    <div className="d-flex" style={{ justifyContent:'space-between' }}>
                                        <img
                                            src={productionList}
                                            style={{ height: "5rem" }}
                                            alt="AgvaVenti"
                                        />
                                        <div
                                            className="d-flex"
                                            style={{
                                                gap: "1rem",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div>
                                                <h6 style={{ color: "#707070", fontSize: "1.5rem" }}>
                                                    Assigned Ticket Data
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </CustomCard>

                    </Col>
                </div>
            </Container>
        </>
    )
}

export default ServiceEng