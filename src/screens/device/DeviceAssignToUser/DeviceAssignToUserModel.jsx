import React, { useState } from "react";
import { Navbar } from "../../../utils/NavBar";
import SideBar from "../../../utils/Sidebar";
import { Link } from "react-router-dom";
import AssignedUsers from "./AssignedUsers";
import AddUser from "./AddUser";
import back from "../../../assets/images/back.png";
import NavBarForAll from "../../../utils/NavBarForAll";

function DeviceAssignToUserModel() {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <NavBarForAll />
      <div
        className=""
        style={{
          position: "relative",
          top: "6rem",
          marginLeft: "2%",
          width: "90%",
        }}
      >
        <div style={{ display: "flex", gap: "2vw", alignItems: "center" }}>
          <Link onClick={goBack}>
            <img src={back} style={{ width: "4rem" }} />
          </Link>
          <button onClick={() => handleTabClick(0)}>
            <div
              style={
                activeTab === 0
                  ? {
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 50px",
                      backgroundColor: "rgb(152, 0, 76)",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "10vw",
                      height: "5vw",
                      textAlign: "center",
                      borderRadius: "15px",
                    }
                  : {
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 50px",
                      backgroundColor: "white",
                      color: "black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "10vw",
                      height: "5vw",
                      textAlign: "center",
                      borderRadius: "15px",
                    }
              }
            >
              <h5 style={{ fontSize: "15px" }}>Assigned Assistant</h5>
            </div>
          </button>
          <button onClick={() => handleTabClick(1)}>
            <div
              style={
                activeTab === 1
                  ? {
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 50px",
                      backgroundColor: "rgb(152, 0, 76)",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "10vw",
                      height: "5vw",
                      textAlign: "center",
                      borderRadius: "15px",
                    }
                  : {
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 0px 50px",
                      backgroundColor: "white",
                      color: "black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "10vw",
                      height: "5vw",
                      textAlign: "center",
                      borderRadius: "15px",
                    }
              }
            >
              <h5 style={{ fontSize: "15px" }}>Add Assistant</h5>
            </div>
          </button>
        </div>
        <div style={{ marginTop: "3vw" }}>
          {activeTab === 0 && <AssignedUsers />}
          {activeTab === 1 && <AddUser />}
        </div>
      </div>
    </>
  );
}

export default DeviceAssignToUserModel;
