import React, { useState } from "react";
import CustomeDropDown from "../../../container/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../store/action/AdminAction";
import Style from "../../../css/NavBar.module.css";
import logo from "../../../assets/images/lgnewsmall.png";
import { ThemeContext } from "./../../../utils/ThemeContext";
function Navbar() {
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  let { sideMenu } = React.useContext(ThemeContext);
  const { adminInfo } = adminLoginReducer;

  const avatar = useState(adminInfo && adminInfo.image && adminInfo.image)[0];

  // SHOW ACCOUNT DETAILS

  const [userInfo, setUserInfo] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(navigate));
  };

  const showUserInfoFun = () => {
    setUserInfo(!userInfo);
  };
  var showDate = new Date();
  var displayCurrentDate =
    showDate.getDate() +
    "-" +
    (showDate.getMonth() + 1) +
    "-" +
    showDate.getFullYear();
  var displayCurrentTime = showDate.getHours() + ":" + showDate.getMinutes();
  return (
    <div>
      <div
        className="d-flex"
        style={{
          margin: "1rem",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <div className="d-flex" style={{ gap: "43rem" }}>
          {/* Logo section */}
          <div>
            <img src={logo} style={{ width: "1.5rem" }} />
          </div>
          {/* Heading Section */}
          <div style={{ color: "#0099A4" }}>
            <h4>AgVa Healthetech</h4>
          </div>

        </div>
        <div className="d-flex" style={{ gap: "5rem" }}>
          {/* Time section */}
          <div>
            <span>{displayCurrentDate}</span>
            <span>{displayCurrentTime}</span>
          </div>

          {/* Profile section */}
          <section
            className={
              sideMenu == "sidebar" ? `${Style.detailSection}` : `navBarDetails`
            }
          >
            <h5
              style={{
                backgroundColor: "#0099A4",
                width: "1.9rem",
                height: "1.9rem",
                color: "white",
                borderRadius: "4rem",
              }}
              className={
                sideMenu == "sidebar"
                  ? `${Style.AvatarSection}`
                  : `AvatarSectionSidbar`
              }
              onClick={showUserInfoFun}
            >
              {adminInfo &&
                adminInfo.data &&
                adminInfo.data.name.split(" ")[0].split("")[0]}
            </h5>
          </section>
        </div>
        
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
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="Avatar" />
              ) : (
                adminInfo &&
                adminInfo.data &&
                adminInfo.data.name.split(" ")[0].split("")[0]
              )}
            </section>

            <p
              style={{
                fontSize: "1.3rem",
              }}
              className="darkModeColor"
            >
              {adminInfo && adminInfo.data && adminInfo.data.name}
            </p>
            <p
              style={{
                fontSize: "1rem",
              }}
              className="darkModeColor"
            >
              {adminInfo && adminInfo.data && adminInfo.data.email}
            </p>
            <section
              onClick={() => navigate("/update")}
              className={`${Style.manageAccount} darkModeColor`}
              style={{ border: "1px solid #fff" }}
            >
              Manage your account
            </section>

            <section
              style={{ border: "1px solid #fff", marginTop: "5px" }}
              className={`${Style.logoutAccount} darkModeColor`}
              onClick={(e) => {
                handlelogout(e);
              }}
            >
              Logout
            </section>

            <section className={Style.privacyPolicy}>
              <p className="darkModeColor">Privacy policy</p>
              <p className="darkModeColor">Terms of service</p>
            </section>
          </CustomeDropDown>
        )}
      </div>
    </div>
  );
}

export default Navbar;
