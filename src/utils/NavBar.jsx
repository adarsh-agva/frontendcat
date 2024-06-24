
/* eslint-disable */
import React, { useEffect, useState } from "react";
import CustomeDropDown from "../container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../store/action/AdminAction";
import Style from "../css/NavBar.module.css";
import { ThemeContext } from "./ThemeContext";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { getHospitalAdminUserRequestAction } from "../store/action/AdminDashboard";
export function Navbar() {

  const dispatch = useDispatch()
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  let { sideMenu } = React.useContext(ThemeContext);
  const { adminInfo } = adminLoginReducer;

  const avatar = useState(
    adminInfo && adminInfo.image && adminInfo.image && adminInfo.data.token
  )[0];

  // SHOW ACCOUNT DETAILS

  useEffect(() => {
    dispatch(getHospitalAdminUserRequestAction())
  }, [])


  const getHospitalAdminUserRequestReducer = useSelector(
    (state) => state.getHospitalAdminUserRequestReducer
  );
  const {  data } = getHospitalAdminUserRequestReducer;
  const [userInfo, setUserInfo] = useState(false);
  const userRole = adminInfo && adminInfo.data && adminInfo.data.userType


  let navigate = useNavigate();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(navigate));
    localStorage.setItem('userrole', userRole)
  };
  const showUserInfoFun = () => {
    setUserInfo(!userInfo);
  };
  const Updatedname = localStorage.getItem("name")
  const Updatedemail = localStorage.getItem("email")

  const history = useNavigate();
  const handleNotify = (e) => {
    e.preventDefault()
    history('/notificationHandle')
  }
  const handleClick = (e) => {
    e.preventDefault()
    history('/hospitalAdminUserRequest')
  }

  const handleClickAsistant = (e) => {
    e.preventDefault()
    history('/association_request_module')
  }

  const handleManageAccount = () => {
    if (adminInfo?.data?.userType == "User" || adminInfo?.data?.userType == "Doctor") {
      navigate("/update_profile_details")
    }
    else {
      navigate("/update")
    }
  }
  return (
    <>
      <section className={`${Style.NavbarOuter}`}>
        <section style={{ display: 'flex', gap: '1vw' }} className={sideMenu == "sidebar" ? `${Style.detailSection}` : `navBarDetails`}>
          {userRole === 'Support' ?
            <div>
              <button onClick={handleNotify} type="button" class="inline-flex items-center px-2 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <IoMdNotificationsOutline />
              </button>
            </div>
            : userRole == 'Hospital-Admin' ?
              <div>
                <button type="button" onClick={handleClick} style={{ backgroundColor: 'white', borderRadius: '20px' }} class="inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  <IoMdNotificationsOutline size={20} color="rgb(152, 0, 76)" />
                  <span> {data?.data?.length} </span>
                </button>
              </div>
              : ''}
          <section
            className={
              sideMenu == "sidebar"
                ? `${Style.AvatarSection}`
                : `AvatarSectionSidbar`
            }
            onClick={showUserInfoFun}
          >

            <FaUserCircle color="white" style={{ width: '2rem', height: '2rem' }} />
          </section>
        </section>
        {userInfo && (
          <CustomeDropDown
            position="fixed"
            right="0%"
            top="6%"
            width="400px"
            zIndex="10"
            marginRight="10px"
          >
            <section
              className={Style.AvatarSectionDropDown}
              onClick={showUserInfoFun}
            >
              <FaUserCircle color="white" style={{ width: '3.5rem', height: '3.5rem' }} />
            </section>
            <p
              className={Style.UpdateNameText}
            >
              {/* {localStorage.getItem("name")} */}
              {adminInfo && adminInfo.data && adminInfo.data.userType == "Super-Admin" ? <> Dr. {Updatedname}</> : adminInfo && adminInfo.data && Updatedname}
            </p>
            <p
              className={Style.updateEmailText}
            >
              {Updatedemail}
            </p>
            {adminInfo && adminInfo.data && adminInfo.data.userType == "Doctor" ?

              <p
                className={Style.updateEmailText}
              >
                Profile KEY - <span>{adminInfo?.data?.securityCode}</span>
              </p>
              : ""}
            <span
              onClick={handleManageAccount}
              className={`${Style.manageAccount}`}
              style={{ border: "1px solid #fff" }}
            >
              Manage your account
            </span>
            <span
              style={{ border: "1px solid #fff", marginTop: "5px" }}
              className={`${Style.logoutAccount}`}
              onClick={(e) => {
                handlelogout(e);
              }}
            >
              Logout
            </span>
            <section className={Style.privacyPolicy}>
              <Link to="/privacyPolicy" style={{ textDecoration: "none", color: "rgb(152, 0, 76)" }}>
                <h6 style={{ fontSize: "0.8rem" }}>Privacy policy</h6>
              </Link>
              <Link to="/termsOfServices" style={{ textDecoration: "none", color: "rgb(152, 0, 76)" }}>
                <h6 style={{ fontSize: "0.8rem" }}>Terms of service</h6>
              </Link>
            </section>
          </CustomeDropDown>
        )}
      </section>
    </>
  );
}
