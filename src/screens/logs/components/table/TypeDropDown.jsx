import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faTasks } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import CustomeDropDown from "../../../../container/DropDown";
import Style from "../../../../css/TypeDropDown.module.css";
import { getProjectByCode } from "../../../../store/action/ProjectAction";
import { getCrashFreeUsers } from "../../../../store/action/LogsAction";
import {
  getLogTypeCounts,
  getLogByDate,
} from "../../../../store/action/LogsAction";
import { alarmAction } from "../../../../store/action/AlarmAction";
import { eventAction } from "../../../../store/action/EventsAction";

const TypeDropDown = (props) => {
  const [projectCodeDropDown, setProjectCodeDropDown] = useState(false);

  // dark-mode state
  const ref = useRef();
  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { loading, data } = getModelCodeReducer;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");

  var url_string = window.location.href;
  var url = new URL(url_string);

  const dispatch = useDispatch();

  const ProjectTypeFilter = () => {
    setProjectCodeDropDown(true);
    if (projectCodeDropDown) {
      setProjectCodeDropDown(false);
    }
  };

  const onSubmitFun = (type) => {
    ProjectTypeFilter();

    localStorage.setItem("project_type", JSON.stringify(type));
    let projectDetails = JSON.parse(localStorage.getItem("project_type"));
    // alarm action dispatch
    if (url.href.includes("alarm")) {
      dispatch(alarmAction(code, projectDetails.typeCode, props.diffDate));
      // props.projectCode(type.typeCode);
    }
    if(url.href.includes("events")){
      dispatch(eventAction(code, projectDetails.typeCode, props.diffDate))
    }

    if (url.href.includes("log_table")) {
      dispatch(
        getCrashFreeUsers({
          code,
          diffDate: props.diffDate,
          code1: type.typeCode,
        })
      );

      dispatch(
        getLogTypeCounts({
          code,
          diffDate: props.diffDate,
          code1: type.typeCode,
        })
      );
      dispatch(
        getLogByDate({ code, diffDate: props.diffDate, code1: type.typeCode })
      );
    }

    dispatch(
      getProjectByCode(
        props.tableDataState.code,
        props.tableDataState.date,
        props.tableDataState.logtype,
        props.tableDataState.pageNo,
        props.tableDataState.records,
        type.typeCode
      )
    );
  };

  return (
    <>
      {loading ? (
        <p className="darkModeColor">loading..</p>
      ) : (
        <section ref={ref}>
          <section onClick={ProjectTypeFilter} className={Style.OuterDiv}>
            <FontAwesomeIcon
              icon={faTasks}
              color="#2A9AA4"
              style={{ width: "22px", height: "25px" }}
            />
            <p className="m-2 darkModeColor" style={{ fontSize: ".9rem" }}>
              {localStorage.getItem("project_type")
                ? JSON.parse(localStorage.getItem("project_type")).typeName
                : data && data.modelList && data.modelList[0].typeName}
            </p>
            <FontAwesomeIcon
              icon={faCaretDown}
              color="#2A9AA4"
              style={{ width: "10px", height: "20px", marginBottom: "2px" }}
            />
          </section>

          <section>
            {projectCodeDropDown ? (
              <CustomeDropDown
                width="15%"
                position="absolute"
                alignItems="flex-start"
                zIndex="8"
              >
                {data &&
                  data.modelList.map((type, i) => {
                    return (
                      <React.Fragment key={i}>
                        <p
                          style={{ fontSize: ".9rem" }}
                          className={`${Style.productVersion} darkModeColor`}
                          onClick={() => onSubmitFun(type)}
                        >
                          {type.typeName}
                        </p>
                      </React.Fragment>
                    );
                  })}
              </CustomeDropDown>
            ) : null}
          </section>
        </section>
      )}
    </>
  );
};

export default TypeDropDown;
