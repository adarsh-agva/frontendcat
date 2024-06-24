import React, { useEffect, useState } from "react";
import AddRegisterUser from "../AddRegisterUser";
import NavBarForAll from "../../../utils/NavBarForAll";
import ManageAdminModule from "../ManageUserModule/ManageAdminModule";
import ManageUsers from "../ManageUsers";
import AddEmploye from "../ManageUserModule/AddEmploye";
import AwatingShipmentModule from "./AwatingShipmentModule";
import ReadyToDispatch from "./ReadyToDispatch";
import DispatchDataModule from "./DispatchDataModule";
function DispatchDashboardModule() {
  const [activeTab, setActiveTab] = useState(0);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hello = urlParams.get("activeTab");
  let newHello = parseInt(hello);
  useEffect(()=>{
    if (!!newHello) {
        setActiveTab(newHello);
      }
  },[])
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    
    localStorage.setItem("activeTab", tabIndex);
  };
  return (
    <div>
      <NavBarForAll />
      <div
        style={{
          position: "relative",
          top: "6rem",
          marginLeft: "1%",
          width: "98%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "52rem" }}>
            <div style={{ display: "flex", gap: "2vw" }}>
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
                  <h5 style={{ fontSize: "15px" }}>Awaiting shipment</h5>
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
                  <h5 style={{ fontSize: "15px" }}>Ready for dispatch</h5>
                </div>
              </button>
              <button onClick={() => handleTabClick(2)}>
                <div
                  style={
                    activeTab === 2
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
                  <h5 style={{ fontSize: "15px" }}>Dispatched data</h5>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "3vw" }}>
          {activeTab === 0 && <AwatingShipmentModule />}
          {activeTab === 1 && <ReadyToDispatch />}
          {activeTab === 2 && <DispatchDataModule />}
        </div>
      </div>
    </div>
  );
}

export default DispatchDashboardModule;
