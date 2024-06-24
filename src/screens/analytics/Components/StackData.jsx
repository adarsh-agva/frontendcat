/* eslint-disable */

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Style from "../../../css/StackData.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faTasks,
  faTextHeight,
} from "@fortawesome/free-solid-svg-icons";
import Text from "./stackCrashlitics/Text";

export default function StackData() {
  const [innerParaShowDetails, setInnerParaShowDetails] = useState({});
  const [stackErrorFilter, setStackErrorFilter] = useState(false);
  const [stackErrorFilterTextFormate, setStackErrorFilterTextFormate] =
    useState(true);

  // ACTIVE CLASS FOR TOGGLE TEXT AND STACK BUTTON
  const [activeClassToggle, setActiveClassToggle] = useState({
    text: false,
    stack: true,
  });

  // GETTING DATA FROM URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const colData = urlParams.get("col");

  // HEADING DATA ANALYTIC
  const DataINRow = colData.split("at ") && colData.split(")").slice(0, -1);

  var grouped = DataINRow.reduce((result, word) => {
    var letter;
    if (word.split(".").length > 2) {
      letter = `${word.split(".")[0]}.${word.split(".")[1]}.${word.split(".")[2]
        }`;
    } else letter = word.split(".")[0];
    result[letter] = result[letter] || [];
    result[letter].push(word);
    return result;
  }, {});

  const keys = Object.keys(grouped);

  // FILTER FUNCTION FOR TOGGLE BUTTON
  const stackErrorFilterFun = () => {
    setStackErrorFilter(true);
    setStackErrorFilterTextFormate(false);
    setActiveClassToggle({ text: true, stack: false });
  };

  const stackErrorFilterTextFormateFun = () => {
    setStackErrorFilterTextFormate(true);
    setStackErrorFilter(false);
    setActiveClassToggle({ text: false, stack: true });
  };

  // INNER PARA DETAIL SECTION FUNCTION
  const innerParaShowDetailsFun = (index) => {
    let idx = index;

    if (innerParaShowDetails.hasOwnProperty(idx)) {
      setInnerParaShowDetails({
        ...innerParaShowDetails,
        [idx]: !innerParaShowDetails[idx],
      });
    } else {
      setInnerParaShowDetails({ ...innerParaShowDetails, [idx]: true });
    }
  };

  return (
    <>
      <Row className="p-4">
        <Col xl={12}>
          {/* TEXT AND COE TOGGLE SECTION */}
          <section className={Style.filterToggle}>
            <section
              className={
                activeClassToggle.stack
                  ? `${Style.filterGraphFirstSectionActive}  `
                  : `${Style.filterGraphFirstSection} `
              }
              onClick={stackErrorFilterTextFormateFun}
            >
              <FontAwesomeIcon icon={faTasks} />
            </section>
            <section
              className={
                activeClassToggle.text
                  ? `${Style.filterGraphFirstSectionActive} `
                  : `${Style.filterGraphFirstSection} `
              }
              onClick={stackErrorFilterFun}
            >
              <FontAwesomeIcon icon={faTextHeight} />
            </section>
          </section>
        </Col>

        {/* TEXT ERROR  WITH  FILTER BUTTON CLICK */}
        {stackErrorFilter ? (
          <Col xl={12} className={`${Style.outerDiv} darkModebgColormt-4 mt-4`}>
            <Text />
          </Col>
        ) : null}

        {/* STACK FILTER STACK ERROR FIELD HERE */}
        {stackErrorFilterTextFormate ? (
          <>
            {!keys.length < 1 ? (
              <Col xl={12} className={`${Style.outerDiv} mt-4`}>
                {!keys == [] &&
                  keys.map((key, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        <section className={Style.outerDivinner}>
                          <section
                            className={
                              innerParaShowDetails[idx]
                                ? `${Style.StackInfoDiveWithToggle} darkModebgColor`
                                : `${Style.StackInfoDive} darkModebgColor`
                            }
                            onClick={() => innerParaShowDetailsFun(idx)}
                          >
                            {idx == 0 ? (
                              <p>{`${key.slice(key.indexOf("/") + 1)}`} </p>
                            ) : (
                              <p className={`${Style.index0}`}>
                                {`${key.slice(key.indexOf("/") + 1)}`}
                              </p>
                            )}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </section>
                          {innerParaShowDetails[idx] && (
                            <section
                              className={`${Style.detailSection}  darkModebgColor`}
                            >
                              {grouped[key].map((items, index) => {
                                return (
                                  <>
                                    {idx == 0 ? (
                                      <p
                                        className={grouped[key].map(
                                          (items, index) => {
                                            return items.includes("Activity")
                                              ? Style.normalPara
                                              : Style.dynamicPara;
                                          }
                                        )}
                                      >
                                        {DataINRow.includes("Caused by:")
                                          ? items
                                          : items.concat(")")}
                                      </p>
                                    ) : (
                                      <p
                                        className={grouped[key].map(
                                          (items, index) => {
                                            return items.includes("Activity")
                                              ? Style.normalPara
                                              : Style.dynamicPara;
                                          }
                                        )}
                                      >
                                        {items.includes("at") ? null : "at"}
                                        {DataINRow.includes("Caused by:")
                                          ? items
                                          : items.concat(")")}
                                      </p>
                                    )}
                                  </>
                                );
                              })}
                            </section>
                          )}
                        </section>
                      </React.Fragment>
                    );
                  })}
              </Col>
            ) : (
              <Col xl={12} className={`${Style.outerDiv} mt-4`}>
                <section className={`${Style.StackInfoDive}`}>
                  <p>{colData}</p>
                </section>
              </Col>
            )}
          </>
        ) : null}
      </Row>
    </>
  );
}

