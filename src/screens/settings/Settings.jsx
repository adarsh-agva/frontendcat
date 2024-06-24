/* eslint-disable */

import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Style from "../../css/Settings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCrashEmail } from "../../store/action/ProjectAction";
import Spinner from "../../container/Spinner";
import { validateEmailHelper } from "../../helper/Emails";
import SideBar from "../../utils/Sidebar";
import { Navbar } from "../../utils/NavBar";

export default function Settings() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);//URLSearchParams used for iterating the queryString
  // console.log('queryString',queryString)
  const code = urlParams.get("code"); //project code 
  // console.log('code',code)
  const projectName = urlParams.get("name");
  // console.log('projectName',projectName)

  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );
  // console.log('getAllProjectReducer',getAllProjectReducer)//gets all the state of the projects available and processes into an array

  const getProjectByCodeSettingReducer = useSelector(
    (state) => state.getProjectByCodeSettingReducer
  );
  const { loading: ld, data: dt } = getProjectByCodeSettingReducer;

  const { allProjectData } = getAllProjectReducer;
  // console.log('allProjectData',allProjectData)

  let dataObj;
  allProjectData &&
    allProjectData.data &&
    allProjectData.data.data.map((dt) => {
      if (dt.code == code) {
        dataObj = dt;
      }
    });
// console.log('dataObj',dataObj)
  const dispatch = useDispatch();

  const [emailstate, setEmail] = useState({
    email: "",
    error: null,
  });
  // console.log('emailstate',emailstate)
  const [emailList, setEmailList] = useState([...dataObj.reportEmail]);

  let deviceTypeArray = dataObj.device_types.map((type) => type.typeName);

  // Email error state
  const [emailError, setEmailError] = useState();

  // CHIP CREATING STATE PROJECT
  const [chipStateProject, setChipStateProject] = useState({
    items: [...deviceTypeArray],
    value: "",
    error: null,
  });
  // console.log('deviceTypeArray',deviceTypeArray) //device types

  // Project name and description state
  const [nameAndDesc, setNameAndDesc] = useState({
    name: dt && dt.data.name,
    desc: dt && dt.data.description,
  });

  // NAVIGATION MENU HERE
  const navigation_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: "Logs",
    },
    link2: {
      iconName: faDatabase,
      linkName: "Settings",
    },
    link3:{
      iconName:faDatabase,
      linkName:"Alarms"
    },
    link4:{
      iconName:faDatabase,
      linkName:"Events"
    }
  };
  // console.log('projectName',projectName)

  const sidebar_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: `/assets/icons/log.png`,
      linkName: `Logs`,
      link: `/log_table?code=${code}&name=${projectName}`,
    },
    link2: {
      iconName: `/assets/icons/settings.png`,
      linkName: "Settings",
      link: `/settings?code=${code}&name=${projectName}`,
    },
    link3: {
      iconName: `/assets/images/AlarmIcon.png`,
      linkName: "Alarms",
      link: `/alarm?code=${code}&name=${projectName}`,  
    },
    link4:{
      iconName:faDatabase,
      linkName:'events',
      link:`/events?code=${code}&name=${projectName}`,
    },
  };
  //EMAIL CHIPS
  const validateEmail = (email) => {
  
    const isEmailValid = validateEmailHelper(email);
    if (isEmailValid.isSuccess) {
      return isEmailValid.isSuccess;
    }
    console.log('isEmailValid',isEmailValid)
    if (!isEmailValid.isSuccess && !isEmailValid.isEmail) {
      setEmailError(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    if (!isEmailValid.isSuccess && isEmailValid.isEmail) {
      setEmailError(isEmailValid.message);
      return isEmailValid.isSuccess;
    }
    setEmailError(null);
    return true;
  };

  //   HANDLE KEYDOWN FUNCTION
  const handleKeyDownEmail = (evt) => {
    if (["Enter", "Tab", ",", " "].includes(evt.key)) {
      evt.preventDefault();
      setEmail({ ...emailstate, error: null });
      let inputChips = emailstate.email.trim();
      const emailValid = validateEmail(inputChips);
      if (emailValid) {
        setEmailList([...emailList, inputChips]);
        setEmail({ email: "" });
        setEmailError(null);
      } else {
        setEmailError("Check Email");
      }
    }
  };
  // console.log('emailList',emailList)
  const handleOndeleteEmail = (item) => {
    setEmailList(
      emailList.filter((it) => {
        return it !== item;
      })
    );
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    // setEmailList({email:""})
    setEmailError(null);
    if (emailList.email !== null) {
      dispatch(addCrashEmail(code, emailList));
    }
    if (!emailList.email.length) {
      setEmailError("Email is required");
    }
  };


  //PROJECT TYPE CHIPS

  //ADD CHIPS ON CLICK
  const handleKeyDownProject = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      var value = chipStateProject.value.trim();
      if (value) {
        setChipStateProject({
          ...chipStateProject,
          items: [...chipStateProject.items, chipStateProject.value],
          value: "",
        });
      }
    }
  };
  // console.log('chipStateProject',chipStateProject)

  //UPDATE STATE ON CHANGE
  const handleChangeProject = (evt) => {
    setChipStateProject({
      ...chipStateProject,
      value: evt.target.value,
      error: null,
    });
  };

  // DELETE PROJECT
  const handleOndeleteProject = (item) => {
    setChipStateProject({
      items: chipStateProject.items.filter((i) => i !== item),
    });
  };

  return (
    <>
      <Row className="rowSection">
        <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
          <SideBar
            sidebar_details={sidebar_details}
            className={Style.SideBarColume}
          />
        </Col>
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
          <Navbar navigation_details={navigation_details} />
          <Container className={Style.mainContainer}>
            {/* SETTINGS COMPONENTS */}
            {ld ? (
              <Spinner />
            ) : (
              <>
                <Row>
                  <Col xl={6} md={6} sm={12} className="mt-4">
                    <h5 className={`${Style.headingText} cpactiveText`}>
                      Update project
                    </h5>
                    <div className={`${Style.imputFields} mt-4`}>
                      <input
                        type="text"
                        className="form-control LoginForminput "
                        placeholder="Project Name"
                        value={nameAndDesc.name}
                        onChange={(e) =>
                          setNameAndDesc({
                            ...nameAndDesc,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={`${Style.imputFields} mt-4`}>
                      <textarea
                        placeholder="Project Description"
                        rows="4"
                        cols="50"
                        value={nameAndDesc.desc}
                        disabled="disabled"
                        onChange={(e) =>
                          setNameAndDesc({
                            ...nameAndDesc,
                            desc: e.target.value,
                          }) 
                        }
                      />
                    </div>
                    <Button type="submit" className="mt-4" onClick={handleKeyDownEmail}>
                      Save Changes
                    </Button>
                  </Col>
                  
                  <Col xl={6} md={6} sm={12} className="mt-4">
                    <h4 className={Style.headingText}>Add project type</h4>
                    <div className={`${Style.imputFields} mt-4`}>
                      <input
                        type="text"
                        className="form-control LoginForminput "
                        id="exampleInputEmail1"
                        placeholder="Project Type"
                        aria-describedby="emailHelp"
                        value={chipStateProject.value}
                        onKeyDown={handleKeyDownProject}
                        onChange={handleChangeProject}
                      />
                    </div>

                    {/* CHIP SECTION */}
                    <section className={Style.chipouter}>
                      {chipStateProject.items &&
                        chipStateProject.items.map((items, i) => {
                          return (
                            <React.Fragment key={i}>
                              <section className={Style.chip}>
                                <p style={{ color: "#fff" }} className="m-2">
                                  {items}
                                </p>
                                <FontAwesomeIcon
                                  icon={faWindowClose}
                                  onClick={() => handleOndeleteProject(items)}
                                />
                              </section>
                            </React.Fragment>

                          );
                        })}
                    </section>

                    <Button type="submit" className="mt-4">
                      Save Changes
                    </Button>
                  </Col>
                </Row>
                <div className={`${Style.hrLine} mt-4`}></div>

                {/* CRASH FORWARDING */}

                <Row className="mt-4">
                  <Col xl={6} md={6} sm={12}>
                    <h4 className={Style.headingText}>Crash forwarding</h4>
                    <div className={`${Style.imputFields} mt-4`}>
                      <input
                        type="email"
                        className="form-control LoginForminput "
                        id="exampleInputEmail1"
                        placeholder="Enter Email"
                        value={emailstate.email}
                        aria-describedby="emailHelp"
                        onKeyDown={(e) => {
                          handleKeyDownEmail(e);
                        }}
                        onChange={(e) => setEmail({ email: e.target.value })}
                      />
                    </div>
                    {emailError ? (
                      <small style={{ color: "red" }}>{emailError}</small>
                    ) : (
                      ""
                    )}
                    {/* CHIP SECTION */}
                    <section className={Style.chipouter}>
                      {emailList.length > 0 &&
                        emailList.map((items, i) => {
                          return (
                            <React.Fragment key={i}>
                              <section className={Style.chip}>
                                <p style={{ color: "#fff" }} className="m-2">
                                  {items}
                                </p>
                                <FontAwesomeIcon
                                  icon={faWindowClose}
                                  onClick={() => handleOndeleteEmail(items)}
                                />
                              </section>
                            </React.Fragment>
                          );
                        })}
                    </section>

                    <Button
                      className="mt-4"
                      onClick={(e) => {
                        handleSaveEmail(e);
                      }}
                    >
                      Save Emails
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
}
