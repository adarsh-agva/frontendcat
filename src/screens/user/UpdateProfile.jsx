
/* eslint-disable */
import React, { useRef, useState } from "react";
import { faEnvelope, faUser, } from "@fortawesome/free-solid-svg-icons";
import Style from "../../css/UpdateProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, Toaster } from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { updateUserInfoAction } from "../../store/action/UpdateUserInfoAction";
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import NavBarForAll from "../../utils/NavBarForAll";
export default function UpdateProfile() {
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const userId = adminInfo && adminInfo.data && adminInfo.data._id

  const userInfoReducer = useSelector((state) => state.userInfoReducer);
  const { data } = userInfoReducer;
  // uprofile reducer
  const passwordChangeReducer = useSelector(
    (state) => state.passwordChangeReducer
  );

  const { data: updatepasswordresponseData } = passwordChangeReducer;

  const [name, setname] = useState(localStorage.getItem("name"));

  const [email, setEmail] = useState(localStorage.getItem("email"))

  const [avatar, setAvtar] = useState("")



  const dispatch = useDispatch();

  if (
    updatepasswordresponseData &&
    updatepasswordresponseData.success == false
  ) {
    updatepasswordresponseData.success = "";
    toast.error(
      updatepasswordresponseData && updatepasswordresponseData.message
    );
  }
  if (updatepasswordresponseData && updatepasswordresponseData.status == 1) {
    updatepasswordresponseData.status = "";
    toast.success(
      updatepasswordresponseData && updatepasswordresponseData.message
    );
  }

  // Update profile data
  const handleSubmit = () => {
    if (name === "") {
      return toast.error("Please enter name")
    }
    else if (email === "") {
      return toast.error("Please enter email")
    }
    else {
      toast.success("User name and email updated..")
      localStorage.setItem("name", name)
      localStorage.setItem("email", email)
      localStorage.getItem("name")
      localStorage.getItem("email")
      return (dispatch(updateUserInfoAction(name, userId, email)))
    }
  };

  const inputRef = useRef(null);

  const handleAvtarClick = () => {
    inputRef.current.click()
  }
  const handlAvtarChange = (event) => {
    const file = event.target.files[0];
    setAvtar(event.target.files[0])
  }
  const goBack = () => {
    window.history.go(-1)
  }
  return (
    <>
    <NavBarForAll/>
      <div
        className={Style.mainOverview}
        style={{ position: "absolute", top: "5rem", left: "8rem", width: "100%" }}
      >
        <div
          className={Style.insideoverview}
        >
          {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", color: "#707070" }}
          >
            <Link onClick={goBack}>
              <img src={back} style={{ width: "4rem" }} />
            </Link>
          </div>
          <div
            className={Style.card}
          >
            <h4 style={{ fontSize: "2rem" }}>Profile</h4>
            {/* <section className={Style.OuterDiv}> */}
            <Toaster />
            <div className={Style.main}
            >
              <section className={Style.Avtarunder}>
                {/* {avatar ? ( */}
                <div onClick={handleAvtarClick}>
            <FaUserCircle color="white" style={{width:'6rem',height:'6rem'}}/>

                  {/* {avatar ?
                    <img src={URL.createObjectURL(avatar)} alt="Avatar" style={{ height: "7rem" }} /> :
                    <>
                      {adminInfo && adminInfo.data && adminInfo.data.userType == "Admin" ?
                        <img className="avtar" src={doctor} style={{ widt: "0rem", height: "0rem" }} /> :
                        adminInfo && adminInfo.data && adminInfo.data.userType == "User" ?
                          <img className="avtar" src={user} style={{ widt: "0rem", height: "7rem" }} /> :
                          <img className="avtar" src={dispatchIcon} style={{ widt: "0rem", height: "5rem" }} />}
                    </>} */}
                  <input type="file" ref={inputRef} onChange={handlAvtarChange} style={{ display: "none" }} />
                </div>
              </section>
              {/*name field  */}
              <section>
                <h6 className="darkModeColor">Name</h6>
                <div
                  className={`${Style.imputFields} darkBgColorSec mt-2`}
                >
                  <span className="ms-2">
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </span>
                  <input
                    style={{ color: "#212529", opacity: ".7" }}
                    type="email"
                    autoComplete="Enter your full name"
                    value={name}
                    autocomplete="on"
                    className="form-control LoginForminput"
                    placeholder="Enter your name"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}

                  />
                </div>
              </section>
              {/* email field */}
              <section>
                <h6 className="darkModeColor">Email</h6>
                <div
                  className={`${Style.imputFields} darkBgColorSec mt-2 `}
                >
                  <span className="ms-2">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  </span>
                  <input
                    style={{ opacity: ".6" }}
                    type="email"
                    autoComplete="Enter your email"
                    value={email}
                    className="form-control LoginForminput"
                    placeholder="Enter your email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </section>
              <div>
                <button className={Style.updateBtn} onClick={handleSubmit}>
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
