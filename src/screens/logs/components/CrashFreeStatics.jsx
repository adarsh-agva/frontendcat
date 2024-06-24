import React from "react";
import Style from "../../../css/CrashFreeStatic.module.css";
import { Row, Col } from "react-bootstrap";
import CarshFreeStaticsGraph from "../charts/CarshFreeStaticsGraph";
import CustomCard from "../../../container/CustomCard";
import { useSelector } from "react-redux";
export default function CrashFreeStatics() {
  const getCrashFreeUsersReducer = useSelector(
    (state) => state.getCrashFreeUsersReducer
  );
  const { data } = getCrashFreeUsersReducer;

  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { data: deviceData } = getModelCodeReducer;

  return (
    <>
      <CustomCard height="300px">
        <Row className="p-3">
          <Col xl={12} className={`${Style.Statics} mb-2`}>
            <h5
              className="cpactiveText mb-2"
              style={{
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              Crash free Users Statistics
            </h5>
            <section className="d-flex">
              <section>
                <p className="darkModeColor mb-2">Crash free users</p>
                <h4 style={{ fontWeight: 700 }}>{data && data.count}</h4>
              </section>
              <section className="ps-4">
                <p className="darkModeColor mb-2">Total Users</p>
                <h4 style={{ fontWeight: 700 }}>
                  {deviceData && deviceData.deviceCount}
                  {/* {userCode && userCode.data && userCode && userCode.data.count} */}
                </h4>
              </section>
            </section>
          </Col>
          <Col xl={12}>
            <CarshFreeStaticsGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
