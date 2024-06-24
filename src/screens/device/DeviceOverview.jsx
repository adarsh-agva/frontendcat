import React, { useEffect, useState } from "react";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../utils/NavBar";
import arrowNext from "../../assets/images/NextArrow.png";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { Button, Modal } from "flowbite-react";
import shield from "../../assets/icons/shield.png";
import {
  getLockKeyOfDeviceIdction,
  getSingleDeviceIdDetails,
  postLockToDeviceIdAction,
} from "../../store/action/DeviceAction";
import NavBarForAll from "../../utils/NavBarForAll";
import { Card } from "flowbite-react";
import Otpinput from "../auth/OtpInput";
function DeviceOverview() {
  const getAllSectionByDeviceId = useSelector(
    (state) => state.getAllSectionByDeviceId
  );
  const { loading, data } = getAllSectionByDeviceId;
  const overviewData = data && data.data;

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const adminProfile = adminInfo && adminInfo.data && adminInfo.data.userType;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectName = urlParams.get("projectName");
  const code = urlParams.get("code");
  const deviceid = urlParams.get("DeviceId");
  const projectCode = urlParams.get("projectCode");
  const page = urlParams.get("page");


  const status = overviewData && overviewData.message;
  const lastHours = overviewData && overviewData.last_hours;
  const totalHours = overviewData && overviewData.total_hours;
  const health = overviewData && overviewData.health;
  const address = overviewData && overviewData.address;
  const isPaymentComplete = overviewData?.isPaymentDone;
  const isLocked = overviewData?.isLocked
  const alertHandel = () => {
    toast.error("Device Inactive");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleDeviceIdDetails(deviceid));
  }, [dispatch]);


  const history = useNavigate();
  const handleBackBtn = () => {
    if (adminProfile == "User") {
      history(`/user_device?code=${code}&name=${projectName}&page=${page}`);
    } else if (adminProfile == "Assistant") {
      history(`/nurse_module`);
    } else if (
      projectCode === "004" ||
      projectCode === "003" ||
      projectCode === "006"
    ) {
      history(
        `/newDevice?code=${code}&name=${projectName}&projectCode=${projectCode}&page=${page}`
      );
    } else {
      history(`/device?code=${code}&name=${projectName}&page=${page}`);
    }
  };

  const handelLock = () => {
    if (isPaymentComplete === "true") {
      dispatch(
        postLockToDeviceIdAction({ DeviceId: deviceid, isPaymentDone: "false", isLocked: false })
      );
    } else {
      dispatch(
        postLockToDeviceIdAction({ DeviceId: deviceid, isPaymentDone: "true", isLocked: false })
      );
    }
  };
  //  otp handel validation

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const [state, setState] = useState({
    otp: null,
  });


  const handleSubmitOtp = (e) => {
    e.preventDefault();
    const otp = state.otp;
    // const {
    //   data: verifyData,
    //   error: err,
    //   message: msg,
    // } = VerifySMSOtpNumberReducer;
    if (!otp) {
      toast.error("Enter OTP");
    } else {

    }
  };
  return (
    <>
      <NavBarForAll />
      <div
        className="main-overview"
        style={{
          position: "absolute",
          top: "5rem",
          left: "1rem",
          width: "100vw",
        }}
      >
        <Toaster />
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Heading  */}
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              color: "#707070",
            }}
          >
            <button onClick={handleBackBtn}>
              <img src={back} style={{ width: "3rem" }} />
            </button>
            <h4>Device Overview</h4>
          </div>
          {/* Details */}
          <div>
            <div style={{ width: "93%" }}>
              <Card>
                <form
                  className="flex justify-between flex-wrap"
                  style={{ gap: "2rem" }}
                >
                  <div className="flex flex-col gap-4">
                    <section
                      style={{
                        width: "full",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ width: "10rem" }}>Device ID :</span>
                      <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                        {overviewData && overviewData.DeviceId}
                      </h5>
                    </section>
                    <section
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ width: "10rem" }}>Running Status :</span>
                      <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                        {status === "ACTIVE" ? (
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
                        ) : (
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
                        )}
                      </h5>
                    </section>
                    <section
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ width: "11rem" }}>Last Hours :</span>
                      <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                        {status == "ACTIVE" ? "In Ventilation" : lastHours}
                      </h5>
                    </section>
                  </div>
                  <div className="flex flex-col gap-4">
                    <section
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ width: "11rem" }}>
                        Total Ventilation Hours :
                      </span>
                      <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                        {!totalHours ? "- - -" : totalHours}
                      </h5>
                    </section>
                    <section
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ width: "11rem" }}>Health :</span>
                      <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                        {!health ? "- - -" : health}
                      </h5>
                    </section>
                    <section
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ width: "11rem" }}>Address :</span>
                      <h5 style={{ width: "9rem", fontSize: "0.9rem" }}>
                        {!address ? "- - -" : address}
                      </h5>
                    </section>
                  </div>
                </form>
              </Card>
            </div>
          </div>
          {/* device data */}
          <div
            className="container"
            style={{
              borderRadius: "15px",
              padding: "0.1rem",
              marginLeft: "0px",
              color: "#707070",
            }}
          >
            <h4>Device Data</h4>
            <div
              className="d-flex"
              style={{ gap: "2rem", textAlign: "center", flexWrap: "wrap" }}
            >
              <Link
                to={`/about?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    padding: "15px",
                    width: "10rem",
                    borderRadius: "10px",
                    color: "#707070",
                  }}
                >
                  <h6>About</h6>
                  <img src={arrowNext} style={{ width: "1.3rem" }} />
                </div>
              </Link>
              {projectCode === "003" || projectCode === "004" ? (
                <Link
                  to={`/newDeviceEvents?code=${code}&projectName=${projectName}&DeviceId=${deviceid}&projectCode=${projectCode}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => localStorage.setItem("deviceid", deviceid)}
                >
                  <div
                    style={{
                      alignItems: "center",
                      justifyContent: "space-around",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 50px #00000029",
                      display: "flex",
                      padding: "15px",
                      width: "11rem",
                      borderRadius: "10px",
                      color: "#707070",
                    }}
                  >
                    <h6>Monitor Data</h6>
                    <span
                      style={{
                        width: "0.8rem",
                        height: "0.8rem",
                        backgroundColor: "red",
                        borderRadius: "10px",
                      }}
                    ></span>
                  </div>
                </Link>
              ) : (
                <Link
                  to={`/deviceEvents?code=${code}&projectName=${projectName}&DeviceId=${deviceid}&projectCode=${projectCode}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => localStorage.setItem("deviceid", deviceid)}
                >
                  <div
                    style={{
                      alignItems: "center",
                      justifyContent: "space-around",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 50px #00000029",
                      display: "flex",
                      padding: "15px",
                      width: "11rem",
                      borderRadius: "10px",
                      color: "#707070",
                    }}
                  >
                    <h6>Monitor Data</h6>
                    <span
                      style={{
                        width: "0.8rem",
                        height: "0.8rem",
                        backgroundColor: "red",
                        borderRadius: "10px",
                      }}
                    ></span>
                  </div>
                </Link>
              )}
              {status == "ACTIVE" ? (
                <>
                  <Link
                    to={`/live?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        justifyContent: "space-around",
                        background: "#FFFFFF 0% 0% no-repeat padding-box",
                        boxShadow: "0px 0px 50px #00000029",
                        display: "inline-block",
                        padding: "15px",
                        width: "10rem",
                        borderRadius: "10px",
                        color: "#707070",
                      }}
                    >
                      <h6>Live</h6>
                    </div>
                  </Link>
                </>
              ) : (
                <button
                  onClick={alertHandel}
                  style={{
                    justifyContent: "space-around",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    padding: "15px",
                    width: "11rem",
                    borderRadius: "10px",
                    color: "#707070",
                    border: "0px",
                  }}
                >
                  <h6>Live</h6>
                </button>
              )}
              {adminProfile == "Super-Admin" ? (
                <Link
                  to={`/service?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      justifyContent: "space-around",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 50px #00000029",
                      display: "flex",
                      alignItems: "center",
                      padding: "15px",
                      width: "13rem",
                      borderRadius: "10px",
                      color: "#707070",
                      textAlign: "center",
                    }}
                  >
                    <h6>Service Records</h6>
                    <span
                      style={{
                        backgroundColor: "red",
                        borderRadius: "10px",
                        height: "0.8rem",
                        width: "0.8rem",
                      }}
                    ></span>
                  </div>
                </Link>
              ) : (
                ""
              )}
              {adminProfile == "Super-Admin" ? (
                <button
                  style={isLocked === true ? {
                    justifyContent: "space-around",
                    background: "green 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    width: "13rem",
                    borderRadius: "10px",
                    color: "#fff",
                    textAlign: "center",
                  } : {
                    background: "#fff 0% 0% no-repeat padding-box",
                    boxShadow: "0px 0px 50px #00000029",
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    width: "13rem",
                    justifyContent: 'center',
                    borderRadius: '10px'
                  }}
                  onClick={handelLock}
                >
                  {isPaymentComplete == "true" ? (
                    <h6 style={{ display: 'flex', justifyContent: 'space-between', gap: "5px" }}>
                      Unlocked
                      <FaLockOpen />
                    </h6>
                  ) : (
                    <h6 style={{ display: 'flex', justifyContent: 'space-between', gap: "5px" }}>
                      Locked
                      <FaLock />
                    </h6>
                  )}
                </button>
              ) : (
                ""
              )}

              <Modal
                show={props.openModal === "pop-up"}
                size="md"
                popup
                onClose={() => props.setOpenModal(undefined)}
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <div class="mb-6">
                      <img
                        src={shield}
                        loading="lazy"
                        style={{
                          height: "3rem",
                          display: "block",
                          margin: "10px auto",
                        }}
                      />
                      <label
                        for="large-input"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Enter OTP Code
                      </label>
                      <div class="flex items-center" style={{ gap: "20px" }}>
                        <Otpinput setState={setState} state={state} />
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button onClick={handleSubmitOtp} color="failure">
                        Verify OTP
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
              {adminProfile == "Doctor" ? (
                <Link
                  to={`/deviceAssignToUserModel?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      justifyContent: "space-around",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 50px #00000029",
                      display: "flex",
                      alignItems: "center",
                      padding: "15px",
                      width: "11rem",
                      borderRadius: "10px",
                      color: "#707070",
                      textAlign: "center",
                    }}
                  >
                    <h6>Assign</h6>
                  </div>
                </Link>
              ) : (
                ""
              )}

              {/* doctor remove by assistant */}
              {adminProfile == "Hospital-Admin" ? (
                <Link
                  to={`/hospitalAdmoinRemoveDoctor?code=${code}&projectName=${projectName}&DeviceId=${deviceid}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      justifyContent: "space-around",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 50px #00000029",
                      display: "flex",
                      alignItems: "center",
                      padding: "15px",
                      width: "11rem",
                      borderRadius: "10px",
                      color: "#707070",
                      textAlign: "center",
                    }}
                  >
                    <h6>Assiged Owner</h6>
                  </div>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DeviceOverview;
