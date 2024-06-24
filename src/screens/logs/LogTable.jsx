/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faDatabase,
  faFilter,
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import Style from '../../css/LogTable.module.css';
import CrashFreeStatics from './components/CrashFreeStatics';
import TrandData from './components/TrandData';
import CustomeDropDown from '../../container/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import PieChartSection from './components/PieChartSection';
import { getProjectByCode } from '../../store/action/ProjectAction';
import {
  getLogTypeCounts,
  getLogByDate,
  getDeviceModelCode,
  getCrashFreeUsers,
} from '../../store/action/LogsAction';
import { useNavigate } from 'react-router-dom';
import DateIcons from '../../assets/icons/date.png';
import LogICon from '../../assets/icons/log.png';
import TypeDropDown from './components/table/TypeDropDown';
import SideBar from '../../utils/Sidebar';
import { Navbar } from '../../utils/NavBar';
import AlarmIcon from '../../assets/images/AlarmIcon.png';
import TableDataNew from './components/table/TableDataNew';

const cookies = new Cookies();

export default function LogTable() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const projectName = urlParams.get('name');
  const projectTypeCode = urlParams.get('projectType');


  console.log("projectTypeCode",projectTypeCode);
  console.log("code",code);
  console.log("projectName",projectName);


  // @@ All stats here -----------------start

  const [dateDropDown, setDateDropDown] = useState(false);
  const [diffDate, setDiffDate] = useState(
    localStorage.getItem('diffDate') || 90
  );

  const [tableDataState, setTableDataState] = useState({});
  // filter data fields with table
  const [showTableField, setShowTableField] = useState(false);

  // @@ All stats here -----------------end

  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { data: projectType } = getModelCodeReducer;
  const navigate = useNavigate();
 console.log("getModelCodeReducer",getModelCodeReducer);
 console.log("projectType",projectType)
  var projectCode = {
    code: localStorage.getItem('project_type')
      ? JSON.parse(localStorage.getItem('project_type')).typeCode
      : projectTypeCode,
    name: localStorage.getItem('project_type')
      ? JSON.parse(localStorage.getItem('project_type')).typeName
      : projectType &&
        projectType.modelList &&
        projectType.modelList[0].typeName,
  };
// console.log(projectTypeCode)
console.log("helllo",projectCode.name)
  const ref = useRef();

  // navigation
  const navigation_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: 'Logs',
    },
    link2: {
      iconName: faDatabase,
      linkName: 'Settings',
    },
    link3: {
      iconName: faDatabase,
      linkName: 'Alarms',
    },
    link4:{
      iconName:faDatabase,
      linkName:'events'
    }
  };

  const sidebar_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: LogICon,
      linkName: 'Logs',
      link: `/log_table?code=${code}&name=${projectName}`,
    },
    link2: {
      iconName: `/assets/icons/settings.png`,
      linkName: 'Settings',
      link: `/settings?code=${code}&name=${projectName}`,
    },
    link3: {
      iconName: AlarmIcon,
      linkName: 'Alarm',
      link: `/alarm?code=${code}&name=${projectName}`,
    },
    link4:{
      iconName:faDatabase,
      linkName:'events',
      link:`/events?code=${code}&name=${projectName}`,
    }
  };

  // Filter crash free STATICS & Trend wrt to date
  const DateFilter = () => {
    setDateDropDown(true);
    if (dateDropDown) {
      setDateDropDown(false);
    }
  };

  const dispatch = useDispatch();

  const multipleDispatchGraph = () => {
    dispatch(getDeviceModelCode(code));
    // dispatch(getProjectByCodeSetting(code));
    dispatch(
      getLogTypeCounts({
        code,
        diffDate,
        code1: projectCode.code,
      })
    );
    dispatch(
      getLogByDate({
        code,
        diffDate,
        code1: projectCode.code,
      })
    );
    dispatch(
      getCrashFreeUsers({
        code,
        diffDate,
        code1: projectCode.code,
      })
    );
  };

  let filedate = new Date();
  const endDate = filedate.toISOString().slice(0, 10);
  filedate.setDate(filedate.getDate() - diffDate);
  const startDate = filedate.toISOString().slice(0, 10);

  localStorage.setItem(
    'selected_date',
    JSON.stringify({ start: startDate, end: endDate })
  );

  useEffect(() => {
    multipleDispatchGraph();
  }, [dispatch, diffDate]);

  // CHECKING IF USER IS LOGIN OR NOT
  useEffect(() => {
    if (!cookies.get('ddAdminToken')) {
      navigate('/');
    }
    // return () => {
    //   <Spinner />;
    // };
  }, [navigate]);

  // REFRESH ONLY TABLE
  const RefreshTableOnlyFun = () => {
    let logType = JSON.parse(localStorage.getItem('selected_log'));
    let record = localStorage.getItem('selected_record')
      ? JSON.parse(localStorage.getItem('selected_record'))
      : 25;
    let start = JSON.parse(localStorage.getItem('selected_date')).start;
    let end = JSON.parse(localStorage.getItem('selected_date')).end;
    let pgNo = JSON.parse(localStorage.getItem('page_no'));

    dispatch(
      getProjectByCode(
        code,
        { start, end },
        logType,
        pgNo,
        record,
        projectCode.code
      )
    );
  };

  const tableDataStateFun = (
    code,
    date,
    logtype,
    pageNo,
    records,
    projectType
  ) => {
    setTableDataState({
      code,
      date,
      logtype,
      pageNo,
      records,
      projectType,
    });
  };

  const showTableFieldFunc = () => {
    setShowTableField(!showTableField);
    // console.log("setShowTableField", showTableField);
  };

  return (
    <>
      <div>
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
              <Row>
                <Col xl={10} md={9} sm={9}>
                  <TypeDropDown
                    tableDataState={tableDataState}
                    diffDate={diffDate}
                    codeReducer={getModelCodeReducer}
                  />
                </Col>

                <Col xl={2} md={3} sm={3} className={Style.filterWithDate}>
                  <section className={Style.filterwithDate} ref={ref}>
                    <section className={Style.datafilter} onClick={DateFilter}>
                      <Image
                        src={DateIcons}
                        width="20px"
                        style={{
                          filter:
                            'invert(45%) sepia(99%) saturate(341%) hue-rotate(135deg) brightness(91%) contrast(91%)',
                        }}
                      />
                      <p
                        style={{
                          fontSize: '.9rem',
                        }}
                        className="m-2 darkModeColor"
                      >
                        {diffDate == 10
                          ? `last 10 days`
                          : diffDate == 7
                          ? `last 7 days`
                          : diffDate == 1
                          ? `last 24 Hours`
                          : diffDate == 15
                          ? `last 15 days`
                          : diffDate == 30
                          ? `last 30 days`
                          : diffDate == 45
                          ? `last 45 days`
                          : diffDate == 60
                          ? `last 60 days`
                          : diffDate == 90
                          ? `last 90 days`
                          : null}
                      </p>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        color="#2A9AA4"
                        style={{
                          width: '10px',
                          height: '20px',
                          marginBottom: '2px',
                        }}
                      />
                    </section>

                    <section>
                      {dateDropDown ? (
                        <CustomeDropDown width="100%" zIndex="8">
                           <p
                            style={{ fontSize: '.9rem' }}
                            className={`${Style.productVersion} mt-1 darkModeColor `}
                            onClick={() => {
                              setDiffDate(1);
                              localStorage.setItem('diffDate', 1);
                              setDateDropDown(false);
                            }}
                          >
                            24 Hours
                          </p>    
                          <p
                            style={{ fontSize: '.9rem' }}
                            className={`${Style.productVersion} mt-1 darkModeColor `}
                            onClick={() => {
                              setDiffDate(7);
                              localStorage.setItem('diffDate', 7);
                              setDateDropDown(false);
                            }}
                          >
                            7 days
                          </p>
                          <p
                            style={{ fontSize: '.9rem' }}
                            className={`${Style.productVersion} mt-1 darkModeColor`}
                            onClick={() => {
                              setDiffDate(15);
                              localStorage.setItem('diffDate', 15);
                              setDateDropDown(false);
                            }}
                          >
                            15 days
                          </p>

                          <p
                            style={{ fontSize: '.9rem' }}
                            className={`${Style.productVersion} mt-1 darkModeColor`}
                            onClick={() => {
                              setDiffDate(30);
                              localStorage.setItem('diffDate', 30);
                              setDateDropDown(false);
                            }}
                          >
                            30 days
                          </p>
                          <p
                            style={{ fontSize: '.9rem' }}
                            className={`${Style.productVersion} mt-1 darkModeColor`}
                            onClick={() => {
                              setDiffDate(45);
                              localStorage.setItem('diffDate', 45);
                              setDateDropDown(false);
                            }}
                          >
                            45 days
                          </p>
                          <p
                            style={{ fontSize: '.9rem' }}
                            className={`${Style.productVersion} mt-1 darkModeColor`}
                            onClick={() => {
                              setDiffDate(60);
                              localStorage.setItem('diffDate', 60);
                              setDateDropDown(false);
                            }}
                          >
                            60 days
                          </p>
                          <p
                            style={{ fontSize: '.9rem' }}
                            className={`faSync${Style.productVersion} mt-1 darkModeColor`}
                            onClick={() => {
                              setDiffDate(90);
                              localStorage.setItem('diffDate', 90);
                              setDateDropDown(false);
                            }}
                          >
                            90 days
                          </p>
                        </CustomeDropDown>
                      ) : null}
                    </section>
                  </section>
                </Col>
              </Row>
              {/* Data chart */}
              <Row>
                {/*toggle menus  */}
                <Col xl={4} md={6} sm={12} className=" mt-4">
                  <CrashFreeStatics />
                </Col>

                <Col xl={4} md={6} sm={12} className=" mt-4">
                  <PieChartSection />
                </Col>
                <Col className="mt-4" xl={4} md={12} sm={12}>
                  <TrandData />
                </Col>
              </Row>
              {/* Events  */}
              <Row className="mt-5">
                <Col xl={6} md={6} sm={6} className={Style.issuesTable}>
                  <p
                    className="darkModeColor"
                    style={{
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      lineHeight: '2.2rem',
                      letterSpacing: '0.5px',
                      color: '#000',
                    }}
                  >
                    Issues
                  </p>
                </Col>
                <Col
                  xl={6}
                  md={6}
                  sm={6}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  {/* section lifed from table data */}
                  <section
                    className={Style.filterGraphFirstSctionTop}
                    onClick={showTableFieldFunc}
                  >
                    <FontAwesomeIcon icon={faFilter} />
                  </section>

                  <section
                    className={Style.filterGraphFirstSection}
                    onClick={RefreshTableOnlyFun}
                  >
                    <FontAwesomeIcon icon={faSync} />
                  </section>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  {/* Table with toolkit provider */}
                  {/* <TableData
                    code={code}
                    projectName={projectName}
                    diffDate={diffDate}
                    tableDataStateFun={tableDataStateFun}
                    showTableField={showTableField}
                    setShowTableField={setShowTableField}
                  /> */}

                  <TableDataNew
                    code={code}
                    projectName={projectName}
                    diffDate={diffDate}
                    tableDataStateFun={tableDataStateFun}
                    showTableField={showTableField}
                    setShowTableField={setShowTableField}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </>
  );
}
