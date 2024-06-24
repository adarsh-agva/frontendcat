import React from "react";
import agvaVenti from "../../assets/images/AgVaCrop.png";
import dvt from "../../assets/images/DVT.png"
import Suction from "../../assets/images/Suction.png"
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <>
      {/* Top Cart */}
      
        <div className="PageContent" style={{display:"flex",flexDirection:"column",gap:"5rem",justifyContent:"center",alignItems:"center",marginLeft:"5rem",marginTop:"5rem"}}>
          {/* Project Cart */}
          <div
            className="d-flex m-2"
            style={{ gap: "1rem", flexDirection: "column" }}
          >
            <h4 style={{ lineHeight: "40px", color: "#707070" }}>Products</h4>
            <div className="d-flex">
            {/* Ventilator */}
            <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "25rem",
                height: "15rem",
                boxShadow: "0px 0px 30px #00000029"
              }}
            >
              <Link to="/create_project" style={{ textDecoration: "none" }}>
                <div className="d-flex" style={{ gap: "5rem" }}>
                  <img
                    src={agvaVenti}
                    style={{ height: "12rem" }}
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
                      Ventilator
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/* DVT */}
            <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                padding: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "25rem",
                height: "15rem",
                boxShadow: "0px 0px 30px #00000029"
              }}
            >
              <Link to="/create_project" style={{ textDecoration: "none" }}>
                <div className="d-flex" style={{ gap: "2rem" }}>
                  <img
                    src={dvt}
                    style={{ height: "12rem" }}
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
                      Ventilator
                      </h6>
                    </div>
                    {/* icon */}
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      color="#0099A4"
                      class="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg> */}
                  </div>
                </div>
              </Link>
            </div>
            {/* Suction Pump */}
            <div
              className="project-cart"
              style={{
                backgroundColor: "white",
                padding: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                marginLeft: "2rem",
                width: "25rem",
                height: "15rem",
                boxShadow: "0px 0px 30px #00000029"
              }}
            >
              <Link to="/create_project" style={{ textDecoration: "none" }}>
                <div className="d-flex" style={{ gap: "2rem" }}>
                  <img
                    src={Suction}
                    style={{ height: "12rem" }}
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
                      Ventilator
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          </div>
          </div>
    </>
  );
}
export default Dashboard;
