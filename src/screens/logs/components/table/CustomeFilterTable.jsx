import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import CustomCard from "../../../../Container/CustomCard";
import Style from "../../../../css/CustomeFilterTable.module.css";

export default function CustomeFilterTable(props) {
  const [dateSectionSelect, setDateSectionSelect] = useState(true);
  const [StatusSectionSeclect, setStatusSectionSeclect] = useState(false);
  const [countPerPageSection, setCountPerPageSection] = useState(false);

  const [record, setRecords] = useState(25);

  const [date, setdate] = useState({
    start: localStorage.getItem("selected_date")
      ? JSON.parse(localStorage.getItem("selected_date")).start
      : "",
    end: localStorage.getItem("selected_date")
      ? JSON.parse(localStorage.getItem("selected_date")).end
      : "",
  });

  // SHOW DATE SECTION FUNCTION
  const handleShowDate = () => {
    setDateSectionSelect(true);
    setStatusSectionSeclect(false);
    setCountPerPageSection(false);
  };
  // SHOW STATUS CODE SECTION FUNCTION
  const handleShowStatus = () => {
    setDateSectionSelect(false);
    setStatusSectionSeclect(true);
    setCountPerPageSection(false);
  };

  // SHOW PAGE PER COUNT SECTION FUNCTION
  const handleShowPerPage = () => {
    setDateSectionSelect(false);
    setStatusSectionSeclect(false);
    setCountPerPageSection(true);
  };

  return (
    <>
      <CustomCard
        position="absolute"
        height="auto"
        width="450px"
        right="2%"
        padding="10px"
        boxShadow="0px 0px 4px -2px rgba(0,0,0,0.75)"
      >
        <section className={Style.TopButton}>
          <Button className="m-2">Reset Filter</Button>
          <Button className="m-2">Save Filter</Button>
          <Button className="m-2">Apply Filter</Button>
        </section>
        <section>
          <Row>
            <Col xl={6}>
              <section className="m-2">
                <p
                  className={
                    dateSectionSelect
                      ? `${Style.ActiveOption} mt-2`
                      : `${Style.DefaultOption} mt-2`
                  }
                  onClick={handleShowDate}
                >
                  Date
                </p>
                <p
                  className={
                    StatusSectionSeclect
                      ? `${Style.ActiveOption} mt-2`
                      : `${Style.DefaultOption} mt-2`
                  }
                  onClick={handleShowStatus}
                >
                  Select an option
                </p>
                <p
                  className={
                    countPerPageSection
                      ? `${Style.ActiveOption} mt-2`
                      : `${Style.DefaultOption} mt-2`
                  }
                  onClick={handleShowPerPage}
                >
                  Record per page
                </p>
              </section>
            </Col>

            {/* DATA CHANGE SECTION START FROM HERE */}
            {dateSectionSelect ? (
              <Col xl={6}>
                <section className={Style.DateSection}>
                  <input
                    type="date"
                    value={date.start}
                    onChange={(e) =>
                      setdate({ ...date, start: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    value={date.start}
                    onChange={(e) => setdate({ ...date, end: e.target.value })}
                  />
                </section>
              </Col>
            ) : null}

            {/* STATUS CODE SECTION START HERE */}
            {StatusSectionSeclect ? (
              <Col xl={6}>
                <section className={Style.StatusSection}>
                  <section className={Style.StatusInnerSecion}>
                    <label for="exampleFormControlFile1">Info</label>
                    <input type="checkbox" />
                  </section>
                  <section className={Style.StatusInnerSecion}>
                    <label for="exampleFormControlFile1">Worm</label>
                    <input type="checkbox" />
                  </section>
                  <section className={Style.StatusInnerSecion}>
                    <label for="exampleFormControlFile1">Error</label>
                    <input type="checkbox" />
                  </section>
                  <section className={Style.StatusInnerSecion}>
                    <label for="exampleFormControlFile1">Debug</label>
                    <input type="checkbox" />
                  </section>
                </section>
              </Col>
            ) : null}

            {/* COUNT PER PAGE SECTION START FOM HERE   */}
            {countPerPageSection ? (
              <Col xl={6}>
                <section className={Style.perPageOuter}>
                  <p
                    className={Style.perPagesectionInner}
                    onClick={() => setRecords(10)}
                  >
                    10
                  </p>
                  <p
                    className={Style.perPagesectionInner}
                    onClick={() => setRecords(25)}
                  >
                    25
                  </p>
                  <p
                    className={Style.perPagesectionInner}
                    onClick={() => setRecords(45)}
                  >
                    45
                  </p>
                  <p
                    className={Style.perPagesectionInner}
                    onClick={() => setRecords(50)}
                  >
                    50
                  </p>
                </section>
              </Col>
            ) : null}
          </Row>
        </section>
      </CustomCard>
    </>
  );
}
