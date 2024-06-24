import React from "react";
import PieChartDataGraph from "../charts/PieChartDataGraph";
import CustomCard from "../../../container/CustomCard";
import Style from "../../../css/PieChartSection.module.css";
import { Col, Row } from "react-bootstrap";

export default function PieChartSection(props) {
  return (
    <>
      <CustomCard height="300px">
        <Row className="p-3">
          <Col xl={12} md={12} className={Style.PieChartData}>
            <h5
              className="cpactiveText mb-2"
              style={{
                fontWeight: 700,
              }}
            >
              Chart Data
            </h5>
          </Col>
          <Col xl={12} md={12}>
            <PieChartDataGraph />
          </Col>
        </Row>
      </CustomCard>
    </>
  );
}
